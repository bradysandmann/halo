import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Stars, SourceChip, SentimentBadge } from '@/components/Stars';
import { Logo } from '@/components/Logo';
import { Check, MoveRight, Sparkles, Zap, ShieldCheck, MessageSquareText, Building2, BarChart3 } from 'lucide-react';

export function Landing() {
  return (
    <div className="grain">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-[-12%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-amber/15 via-amber/5 to-transparent blur-3xl" />
          <div className="absolute left-[-8%] top-40 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-amber-light/10 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1200px] px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/60 px-3 py-1 text-[12px] font-medium text-ink-muted backdrop-blur">
                <Sparkles size={13} className="text-amber" />
                Sentiment-aware drafts. You stay in the driver's seat.
              </span>

              <h1 className="mt-6 font-serif-display text-[48px] font-semibold leading-[1.02] tracking-tight text-balance text-ink sm:text-[72px] lg:text-[88px]">
                Reply to every review<br />
                in your brand voice.
              </h1>

              <p className="mt-6 max-w-[560px] text-balance text-[17px] leading-[1.6] text-ink-soft sm:text-[19px]">
                Halo pulls every new Google, Yelp, and G2 review into one inbox, drafts a reply that sounds like you, and posts back when you approve. No more 4am 1-star surprises.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/app">
                  <Button size="lg">
                    Start the inbox
                    <MoveRight size={16} />
                  </Button>
                </Link>
                <a href="#how-it-works" className="text-[14px] font-medium text-ink-soft hover:text-ink">
                  How it works
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-muted">
                <li className="inline-flex items-center gap-1.5"><Check size={14} className="text-amber" /> Magic-link sign-in</li>
                <li className="inline-flex items-center gap-1.5"><Check size={14} className="text-amber" /> Brand-voice tuning</li>
                <li className="inline-flex items-center gap-1.5"><Check size={14} className="text-amber" /> 4 platforms, one queue</li>
              </ul>
            </div>

            <div className="lg:col-span-5">
              <HeroPreview />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="border-y border-hair bg-cream-2/40">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { stat: '18,432', label: 'replies drafted last week' },
              { stat: '< 9 min', label: 'median response time' },
              { stat: '94%', label: 'replies approved as-drafted' },
              { stat: '4.7★', label: 'average rating lift after 90 days' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif-display text-[28px] font-semibold text-ink">{s.stat}</div>
                <div className="mt-1 text-[12px] uppercase tracking-wider text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <div className="max-w-[720px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">How it works</span>
            <h2 className="mt-3 font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[48px]">
              From a 1-star at 4am to a posted reply by 9.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
              Halo runs a quiet loop in the background. You see only the thing that matters: the draft, ready to send.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Connect your platforms',
                body: 'Google Business Profile, Yelp, G2, Trustpilot. OAuth, no scraping.',
                icon: Building2,
              },
              {
                step: '02',
                title: 'Tune the brand voice',
                body: 'A few sentences about how you talk. Halo learns your sign-off, your tells.',
                icon: MessageSquareText,
              },
              {
                step: '03',
                title: 'Draft, edit, approve',
                body: 'Claude reads each review, drafts in your voice. You scan, edit, hit Approve.',
                icon: Sparkles,
              },
              {
                step: '04',
                title: 'Posted back, logged',
                body: 'The reply ships to the source platform. Every approval is auditable.',
                icon: ShieldCheck,
              },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-hair bg-white p-6 shadow-warm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber">
                    <s.icon size={18} />
                  </div>
                  <span className="font-mono text-[11px] text-ink-muted">{s.step}</span>
                </div>
                <h3 className="mt-5 text-[16px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-ink-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INBOX PREVIEW */}
      <section className="bg-cream-2/40 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-hair bg-white shadow-warm-lg">
                <div className="flex items-center gap-2 border-b border-hair bg-cream-2/50 px-4 py-3">
                  <div className="h-2 w-2 rounded-full bg-rose/70" />
                  <div className="h-2 w-2 rounded-full bg-amber/70" />
                  <div className="h-2 w-2 rounded-full bg-ink/20" />
                  <span className="ml-3 font-mono text-[11px] text-ink-muted">halo.app/inbox</span>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-5 border-r border-hair bg-white">
                    {[
                      { name: 'Maya P.', source: 'google', rating: 5, snippet: 'Anya\'s 6am vinyasa is the highlight…', ago: '2d', active: true },
                      { name: 'Anonymous', source: 'yelp', rating: 1, snippet: 'Doors were locked. No notice…', ago: '14d' },
                      { name: 'Marcus D.', source: 'google', rating: 5, snippet: 'Best cortado in South Tampa…', ago: '1d' },
                      { name: 'Karen H.', source: 'google', rating: 5, snippet: 'Replaced our roof in 2 days…', ago: '2d' },
                    ].map((r, i) => (
                      <div key={i} className={`border-b border-hair p-3 last:border-b-0 ${r.active ? 'bg-amber/[0.05]' : ''}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate text-[13px] font-medium text-ink">{r.name}</span>
                          <span className="font-mono text-[10px] text-ink-muted">{r.ago}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Stars value={r.rating} size={11} />
                          <SourceChip source={r.source} />
                        </div>
                        <p className="mt-2 line-clamp-1 text-[12px] text-ink-muted">{r.snippet}</p>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-7 p-5">
                    <div className="flex items-center gap-2">
                      <Stars value={5} size={13} />
                      <SourceChip source="google" />
                      <SentimentBadge rating={5} />
                    </div>
                    <p className="mt-3 text-[13px] leading-[1.55] text-ink-soft">
                      "Anya's 6am vinyasa is the highlight of my week. The candlelit savasana actually made me cry. Worth every cent of the unlimited plan."
                    </p>
                    <div className="mt-4 rounded-xl border border-amber/30 bg-amber/[0.04] p-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-amber-dark">
                        <Sparkles size={12} /> Claude draft
                      </div>
                      <p className="mt-2 text-[13px] leading-[1.55] text-ink">
                        Maya, what a thing to read first thing this morning. Anya will be so glad. Thank you for showing up at 6am with us. With gratitude, the Sunrise team.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-8 rounded-lg bg-amber px-3 inline-flex items-center text-[12px] font-medium text-white"><Check size={12} className="mr-1" /> Approve & post</div>
                      <div className="h-8 rounded-lg border border-hair bg-white px-3 inline-flex items-center text-[12px] font-medium text-ink-soft">Edit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">The inbox</span>
              <h2 className="mt-3 font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px]">
                Every review, every platform, one screen.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
                Sorted by what needs you most. 1-stars float to the top with a flag. Five-stars get a thank-you draft that sounds like you, not a chatbot.
              </p>
              <ul className="mt-6 space-y-3 text-[14px] text-ink-soft">
                <li className="flex items-start gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-amber" />Sentiment auto-detected. Negative replies require explicit approval.</li>
                <li className="flex items-start gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-amber" />Edit any draft inline. Halo learns from your edits.</li>
                <li className="flex items-start gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-amber" />Audit log keeps every approval, every revision.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Brand voice that holds', body: 'Your sign-off, your cadence. No "Thanks for the great feedback!" energy.', icon: MessageSquareText },
              { title: 'Negative-review playbook', body: 'For 1- and 2-stars, Halo drafts an own-it response with a private channel offer.', icon: ShieldCheck },
              { title: 'Multi-location ready', body: 'Manage 1 location or 200. Each business gets its own voice profile.', icon: Building2 },
              { title: 'Response analytics', body: 'Average reply time, sentiment trend, approval rate, all in one chart.', icon: BarChart3 },
              { title: 'Approval-gated by default', body: 'Nothing posts without you hitting Approve. Turn on auto-post per business.', icon: Check },
              { title: 'Claude under the hood', body: 'Frontier model, your guardrails. Brand voice never drifts.', icon: Sparkles },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-hair bg-white p-6 shadow-warm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber">
                  <f.icon size={18} />
                </div>
                <h3 className="mt-5 text-[16px] font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-ink-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-hair bg-gradient-to-br from-white via-cream to-cream-2 p-10 shadow-warm-lg sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-amber/10 blur-3xl" />
            <div className="relative grid items-center gap-8 sm:grid-cols-12">
              <div className="sm:col-span-8">
                <h2 className="font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px]">
                  Stop watching your reviews. Start replying to them.
                </h2>
                <p className="mt-4 max-w-[520px] text-[15px] leading-[1.6] text-ink-soft">
                  Sign in with a magic link. No credit card. We'll seed your inbox with three sample businesses so you can see Halo working in 30 seconds.
                </p>
              </div>
              <div className="flex sm:col-span-4 sm:justify-end">
                <Link to="/app">
                  <Button size="lg">
                    Open the inbox <MoveRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hair bg-cream-2/30">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 text-[13px] text-ink-muted sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span>Halo · Built by Brady Sandmann</span>
          </div>
          <div className="flex items-center gap-5">
            <a className="hover:text-ink" href="https://github.com/bradysandmann/halo" target="_blank" rel="noreferrer">GitHub</a>
            <span>Cream, amber, and a little patience.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-amber/5 blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl border border-hair bg-white shadow-warm-lg">
        <div className="flex items-center justify-between border-b border-hair bg-cream-2/40 px-4 py-3">
          <div className="flex items-center gap-2 text-[12px] font-medium text-ink-muted">
            <Logo size={16} />
            <span>Carriage Lane Coffee · Inbox</span>
          </div>
          <span className="font-mono text-[10px] text-ink-muted">14 unread</span>
        </div>
        <div className="space-y-3 p-4">
          <div className="rounded-xl border border-hair bg-cream/60 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stars value={1} size={13} />
                <SentimentBadge rating={1} />
              </div>
              <span className="font-mono text-[10px] text-ink-muted">12d ago</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-ink-soft">
              "Barista was rude when I asked to substitute syrups. Won't be back."
              <span className="ml-1 font-mono text-[10px] text-ink-muted">— Patrick V.</span>
            </p>
            <div className="mt-3 rounded-lg border border-amber/30 bg-amber/[0.04] p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-amber-dark">
                <Sparkles size={11} /> Draft ready
              </div>
              <p className="mt-1.5 text-[12.5px] leading-[1.5] text-ink">
                Patrick, that's not how we want anyone leaving Carriage Lane. I'd like to make it right. Email me at owner@carriagelane.coffee. — Mateo, owner
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-hair bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stars value={5} size={13} />
                <SentimentBadge rating={5} />
              </div>
              <span className="font-mono text-[10px] text-ink-muted">1d ago</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-ink-soft">
              "Best cortado in South Tampa. Period."
              <span className="ml-1 font-mono text-[10px] text-ink-muted">— Marcus D.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
