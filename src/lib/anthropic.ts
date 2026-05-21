// Claude reply-drafting helper.
//
// In production, this would call Anthropic via a server-side route to avoid
// exposing the API key to the client. For the demo, we expose a deterministic
// local fallback that mirrors the brand voice. If VITE_ANTHROPIC_API_KEY is
// provided the client can call the API directly (CORS-enabled SDK), otherwise
// the fallback runs synchronously.

import Anthropic from '@anthropic-ai/sdk';
import type { Review, Business } from './supabase';
import { sentimentForRating } from './utils';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

const sys = `You are Halo, a review reply drafting assistant. You write short, warm, brand-aligned replies to customer reviews.

Hard rules:
- Stay under 80 words.
- Match the supplied brand voice EXACTLY, including sign-offs, cadence, vocabulary.
- Never use em dashes. Use a comma or period instead.
- For 1 to 2 star reviews: own it, name a concrete next step, offer a private channel (email or DM). Do not be defensive.
- For 3 star reviews: acknowledge the gap, state the fix in motion.
- For 4 to 5 star reviews: be specific. Mention something from the review verbatim. Never generic ("thanks for the great review!").
- Never invent facts about the business. If the reviewer mentions a name you don't know, refer to "the team" instead.

Return ONLY the reply body. No subject line, no preamble.`;

function fallback(review: Review, business: Business): string {
  const sentiment = sentimentForRating(review.rating);
  const voice = business.brand_voice ?? '';
  const author = review.author && review.author !== 'Anonymous' ? review.author : 'there';
  const signoffMatch = voice.match(/Sign[- ]off[:\s]+"?([^."]+)"?/i);
  const signoff = signoffMatch ? signoffMatch[1].trim().replace(/"$/, '') : 'the team';

  if (sentiment === 'positive') {
    return `${author}, thank you for taking the time to share this. We'll pass it to the crew today. Hope to see you back soon. - ${signoff}`;
  }
  if (sentiment === 'neutral') {
    return `${author}, fair feedback. We're already on the fix and it'll be tighter the next time you swing by. Appreciate you naming it clearly. - ${signoff}`;
  }
  return `${author}, this isn't the experience we want anyone leaving with. I'd like to make it right personally. Please email me directly and I'll handle it from there. - ${signoff}`;
}

export async function draftReply(review: Review, business: Business): Promise<string> {
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 350)); // perceived latency
    return fallback(review, business);
  }
  try {
    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 400,
      system: sys,
      messages: [
        {
          role: 'user',
          content: `Business: ${business.name}\nBrand voice: ${business.brand_voice ?? '(none specified)'}\n\nReview (${review.rating}★ on ${review.source}, from ${review.author ?? 'Anonymous'}):\n"${review.body}"\n\nDraft the reply now.`,
        },
      ],
    });
    const text = msg.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('\n')
      .trim();
    return text || fallback(review, business);
  } catch (err) {
    console.warn('[halo] Claude call failed, using fallback:', err);
    return fallback(review, business);
  }
}
