import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { Stars, SourceChip, SentimentBadge } from './Stars';
import { Check, Sparkles, RefreshCw, Edit3, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type LifecycleState = 'new' | 'drafting' | 'drafted' | 'approved' | 'posted';

type ReviewItem = {
  id: string;
  name: string;
  source: string;
  rating: number;
  snippet: string;
  body: string;
  ago: string;
  draft: string;
  signoff: string;
};

const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Maya P.',
    source: 'google',
    rating: 5,
    ago: '2h',
    snippet: "Anya's 6am vinyasa is the highlight of my week.",
    body: "Anya's 6am vinyasa is the highlight of my week. The candlelit savasana actually made me cry. Worth every cent of the unlimited plan.",
    draft:
      "Maya, what a thing to read first thing this morning. Anya will be so glad. Thank you for showing up at 6am with us. With gratitude, the Sunrise team.",
    signoff: 'Sunrise Yoga · Tampa',
  },
  {
    id: 'r2',
    name: 'Patrick V.',
    source: 'yelp',
    rating: 1,
    ago: '12d',
    snippet: 'Barista was rude when I asked to substitute syrups.',
    body: "Barista was rude when I asked to substitute syrups. Won't be back.",
    draft:
      "Patrick, that's not how we want anyone leaving Carriage Lane. I'd like to make it right. Email me at owner@carriagelane.coffee. - Mateo, owner",
    signoff: 'Carriage Lane Coffee',
  },
  {
    id: 'r3',
    name: 'Karen H.',
    source: 'google',
    rating: 5,
    ago: '1d',
    snippet: 'Replaced our roof in 2 days. Crew was respectful.',
    body: "Replaced our roof in 2 days, on time and on quote. Crew was respectful with our yard. Worth every penny.",
    draft:
      "Karen, thank you. The crew will be glad to hear it. We aim to leave the yard the way we found it. Reach out anytime you need us. - Beacon Roofing",
    signoff: 'Beacon Roofing',
  },
  {
    id: 'r4',
    name: 'Marcus D.',
    source: 'google',
    rating: 5,
    ago: '3d',
    snippet: 'Best cortado in South Tampa. Period.',
    body: "Best cortado in South Tampa. Period.",
    draft:
      "Marcus, you just made our morning. Come back soon and we'll keep one warm. - The Carriage Lane crew",
    signoff: 'Carriage Lane Coffee',
  },
];

function useLifecycle(activeId: string) {
  const [state, setState] = useState<LifecycleState>('new');
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
    setState('new');
    const t1 = window.setTimeout(() => setState('drafting'), 350);
    const t2 = window.setTimeout(() => setState('drafted'), 1500);
    timeouts.current.push(t1, t2);
    return () => {
      timeouts.current.forEach((t) => window.clearTimeout(t));
    };
  }, [activeId]);

  function advance() {
    if (state === 'drafted') {
      setState('approved');
      const t = window.setTimeout(() => setState('posted'), 900);
      timeouts.current.push(t);
    } else if (state === 'posted') {
      // restart cycle
      setState('new');
      const t1 = window.setTimeout(() => setState('drafting'), 400);
      const t2 = window.setTimeout(() => setState('drafted'), 1600);
      timeouts.current.push(t1, t2);
    }
  }

  return { state, advance };
}

const LIFECYCLE_LABELS: Record<LifecycleState, string> = {
  new: 'New review',
  drafting: 'Drafting in your voice',
  drafted: 'Ready for approval',
  approved: 'Approved',
  posted: 'Posted to Google',
};

export function InboxDemo() {
  const [activeId, setActiveId] = useState<string>(REVIEWS[0].id);
  const active = REVIEWS.find((r) => r.id === activeId)!;
  const { state, advance } = useLifecycle(activeId);

  return (
    <div className="overflow-hidden rounded-2xl border border-hair bg-white shadow-warm-lg">
      <div className="flex items-center justify-between border-b border-hair bg-cream-2/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-rose/60" />
          <div className="h-2 w-2 rounded-full bg-amber/70" />
          <div className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="ml-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
            <Logo size={11} /> halo.app/inbox
          </span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <PipelineBadge state={state} />
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12 border-r border-hair bg-white sm:col-span-4">
          <div className="border-b border-hair bg-cream-2/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Inbox · {REVIEWS.length}
          </div>
          {REVIEWS.map((r) => {
            const isActive = r.id === activeId;
            return (
              <button
                key={r.id}
                onClick={() => setActiveId(r.id)}
                className={cn(
                  'group block w-full border-b border-hair px-3 py-3 text-left transition-all duration-200 last:border-b-0',
                  isActive
                    ? 'bg-amber/[0.06] ring-1 ring-inset ring-amber/40'
                    : 'hover:bg-cream-2/40 hover:scale-[1.005] hover:shadow-[inset_0_0_0_1px_rgba(217,119,6,0.18)]'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'truncate text-[13px] font-medium',
                      isActive ? 'text-ink' : 'text-ink-soft group-hover:text-ink'
                    )}
                  >
                    {r.name}
                  </span>
                  <span className="font-mono text-[10px] text-ink-muted">{r.ago}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <Stars value={r.rating} size={10} />
                  <SourceChip source={r.source} />
                </div>
                <p className="mt-1.5 line-clamp-1 text-[11.5px] leading-snug text-ink-muted">
                  {r.snippet}
                </p>
                {isActive && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber/15 px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-wider text-amber-dark">
                    {LIFECYCLE_LABELS[state]}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="col-span-12 p-4 sm:col-span-8 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Stars value={active.rating} size={13} />
              <SourceChip source={active.source} />
              <SentimentBadge rating={active.rating} />
            </div>
            <span className="font-mono text-[10px] text-ink-muted">{active.signoff}</span>
          </div>

          <p className="mt-3 text-[13.5px] leading-[1.6] text-ink-soft">
            "{active.body}"
            <span className="ml-1 font-mono text-[10.5px] text-ink-muted">- {active.name}</span>
          </p>

          <DraftPanel state={state} draft={active.draft} />

          <div className="mt-4 flex flex-wrap gap-2">
            {state === 'drafted' && (
              <>
                <button
                  onClick={advance}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-amber px-4 text-[12.5px] font-medium text-white shadow-warm transition-all duration-150 hover:bg-amber-dark hover:shadow-[0_4px_16px_rgba(217,119,6,0.32)] active:translate-y-px"
                >
                  <Check size={13} /> Approve & post
                </button>
                <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hair bg-white px-3 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-ink/15 hover:bg-cream-2/60">
                  <Edit3 size={12} /> Edit
                </button>
                <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hair bg-white px-3 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-ink/15 hover:bg-cream-2/60">
                  <RefreshCw size={12} /> Regenerate
                </button>
              </>
            )}
            {(state === 'new' || state === 'drafting') && (
              <div className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-cream-2/70 px-3 text-[12.5px] font-medium text-ink-muted">
                <Sparkles size={13} className="animate-pulse text-amber" />
                Halo is drafting in your voice
              </div>
            )}
            {state === 'approved' && (
              <div className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-amber/15 px-3 text-[12.5px] font-medium text-amber-dark">
                <Send size={12} className="animate-pulse" />
                Posting to {active.source === 'google' ? 'Google' : active.source === 'yelp' ? 'Yelp' : active.source}
              </div>
            )}
            {state === 'posted' && (
              <button
                onClick={advance}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-50 px-4 text-[12.5px] font-medium text-emerald-700 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
              >
                <Check size={13} /> Posted · click to replay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DraftPanel({ state, draft }: { state: LifecycleState; draft: string }) {
  if (state === 'new') {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-hair bg-cream-2/40 p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          New review · queued
        </div>
        <p className="mt-2 text-[12.5px] text-ink-muted">Halo will read this and start drafting in 1-2 seconds.</p>
      </div>
    );
  }

  if (state === 'drafting') {
    return (
      <div className="mt-4 rounded-xl border border-amber/30 bg-amber/[0.04] p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-amber-dark">
          <Sparkles size={12} className="animate-spin-slow" /> Drafting in your voice
        </div>
        <div className="mt-2 space-y-2">
          <div className="h-3 w-[90%] animate-pulse rounded bg-cream-2/80" />
          <div className="h-3 w-[80%] animate-pulse rounded bg-cream-2/80" />
          <div className="h-3 w-[60%] animate-pulse rounded bg-cream-2/80" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mt-4 rounded-xl border p-4 transition-all duration-500',
        state === 'approved' || state === 'posted'
          ? 'border-emerald-300/50 bg-emerald-50/40'
          : 'border-amber/30 bg-amber/[0.04]'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider',
          state === 'approved' || state === 'posted' ? 'text-emerald-700' : 'text-amber-dark'
        )}
      >
        {state === 'posted' ? (
          <>
            <Check size={12} /> Reply posted
          </>
        ) : state === 'approved' ? (
          <>
            <Check size={12} /> Approved
          </>
        ) : (
          <>
            <Sparkles size={12} /> Claude draft
          </>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-[1.55] text-ink">{draft}</p>
    </div>
  );
}

function PipelineBadge({ state }: { state: LifecycleState }) {
  const steps: LifecycleState[] = ['new', 'drafting', 'drafted', 'approved', 'posted'];
  const activeIndex = steps.indexOf(state);
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((s, i) => (
        <div
          key={s}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i <= activeIndex ? 'bg-amber' : 'bg-hair',
            i === activeIndex ? 'w-6' : 'w-2'
          )}
        />
      ))}
    </div>
  );
}
