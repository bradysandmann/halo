import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Reveal } from '@/components/Reveal';
import { InboxDemo } from '@/components/InboxDemo';
import {
  Check,
  MoveRight,
  Sparkles,
  Zap,
  ShieldCheck,
  MessageSquareText,
  Building2,
  BarChart3,
  Timer,
  AlarmClock,
} from 'lucide-react';

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
              <Reveal direction="up">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/[0.06] px-3 py-1 text-[12px] font-medium text-amber-dark backdrop-blur">
                  <AlarmClock size={13} />
                  Industry average: 2.7 days. On Halo: 14 minutes.
                </span>
              </Reveal>

              <Reveal direction="up" delay={80}>
                <h1 className="mt-6 font-serif-display text-[48px] font-semibold leading-[1.02] tracking-tight text-balance text-ink sm:text-[72px] lg:text-[84px]">
                  Every review answered<br />
                  before the next one lands.
                </h1>
              </Reveal>

              <Reveal direction="up" delay={160}>
                <p className="mt-6 max-w-[560px] text-balance text-[17px] leading-[1.6] text-ink-soft sm:text-[19px]">
                  Halo pulls every new Google, Yelp, and G2 review into one inbox, drafts a reply that sounds like you, and posts back when you approve. Median response time on Halo: 14 minutes. The 2026 benchmark is 2.7 days.
                </p>
              </Reveal>

              <Reveal direction="up" delay={220}>
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
              </Reveal>

              <Reveal direction="up" delay={280}>
                <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-muted">
                  <li className="inline-flex items-center gap-1.5"><Check size={14} className="text-amber" /> Month to month. Cancel anytime.</li>
                  <li className="inline-flex items-center gap-1.5"><Check size={14} className="text-amber" /> No setup fees.</li>
                  <li className="inline-flex items-center gap-1.5"><Check size={14} className="text-amber" /> 4 platforms, one queue.</li>
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="left" delay={120}>
                <ResponseTimeStatCard />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE-TIME GAP STRIP */}
      <section className="border-y border-hair bg-cream-2/40">
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">The response-time gap</span>
              <a
                href="https://www.replyonthefly.com/blog/2026-google-review-response-benchmark"
                target="_blank"
                rel="noreferrer"
                className="text-[12px] text-ink-muted hover:text-ink"
              >
                ReplyOnTheFly 2026 benchmark
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { stat: '2.7 days', label: 'industry average response time', muted: true },
              { stat: '32%', label: 'of customers expect a next-day reply', muted: true },
              { stat: '14 min', label: 'median response time on Halo', highlight: true },
              { stat: '94%', label: 'replies approved as-drafted', highlight: true },
            ].map((s, i) => (
              <Reveal key={s.label} direction="up" delay={i * 80}>
                <div
                  className={
                    s.highlight
                      ? 'rounded-xl border border-amber/30 bg-amber/[0.05] p-4'
                      : 'rounded-xl border border-hair bg-white/40 p-4'
                  }
                >
                  <div
                    className={
                      s.highlight
                        ? 'font-serif-display text-[28px] font-semibold text-amber-dark'
                        : 'font-serif-display text-[28px] font-semibold text-ink/50'
                    }
                  >
                    {s.stat}
                  </div>
                  <div className="mt-1 text-[12px] uppercase tracking-wider text-ink-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE INBOX DEMO */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">The inbox</span>
                <h2 className="mt-3 font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px]">
                  Click a review. Watch the whole loop.
                </h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
                  This is the screen you'll spend five minutes a day in. Pick any review on the left and Halo walks through the full lifecycle: new, drafted in your voice, approved, posted to the source platform.
                </p>
                <ul className="mt-6 space-y-3 text-[14px] text-ink-soft">
                  <li className="flex items-start gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-amber" />1-stars float to the top with a flag. Negative replies always require your approval.</li>
                  <li className="flex items-start gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-amber" />Edit any draft inline. Halo learns your sign-off, your cadence, your tells.</li>
                  <li className="flex items-start gap-2.5"><Zap size={16} className="mt-0.5 shrink-0 text-amber" />Every approval is logged. Audit trail by location, by reviewer.</li>
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal direction="up" delay={120}>
                <InboxDemo />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream-2/40 py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <div className="max-w-[720px]">
            <Reveal>
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">How it works</span>
              <h2 className="mt-3 font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[48px]">
                From a 1-star at 4am to a posted reply by 9.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-ink-soft">
                Halo runs a quiet loop in the background. You see only the thing that matters: the draft, ready to send.
              </p>
            </Reveal>
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
            ].map((s, i) => (
              <Reveal key={s.step} direction="up" delay={i * 80}>
                <div className="group h-full rounded-2xl border border-hair bg-white p-6 shadow-warm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-warm-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber transition-colors group-hover:bg-amber/20">
                      <s.icon size={18} />
                    </div>
                    <span className="font-mono text-[11px] text-ink-muted">{s.step}</span>
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + NO-CONTRACT WEDGE */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <NoContractBadge />
                <h2 className="mt-5 font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px]">
                  No annual contract. No 90-day cancellation window.
                </h2>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
                  The category leader has 109 BBB complaints in three years, most of them about auto-renewal traps and contracts you can't escape. Halo is month to month. Cancel from your dashboard. Your data exports as CSV on the way out.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal direction="up" delay={120}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <PriceCard
                    name="Single location"
                    price="$79"
                    cadence="/ month"
                    bullets={[
                      'Google + Yelp + Facebook inbox',
                      'Unlimited reviews & drafts',
                      'Brand-voice tuning',
                      'Approval-gated by default',
                    ]}
                  />
                  <PriceCard
                    name="Multi-location"
                    price="$59"
                    cadence="/ location / month"
                    bullets={[
                      'Up to 50 locations',
                      'Per-location voice profiles',
                      'Manager assignment & alerts',
                      'CSV export, anytime',
                    ]}
                    featured
                  />
                </div>
                <p className="mt-4 text-[12.5px] text-ink-muted">
                  Pricing is illustrative for the portfolio build. Real Halo would publish full pricing on the page itself, the way category-leader competitors don't.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-cream-2/40 py-20 sm:py-28">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">What's in the box</span>
              <h2 className="mt-3 font-serif-display text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px]">
                Built for the owner who reads reviews from the truck.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Brand voice that holds', body: "Your sign-off, your cadence. No 'Thanks for the great feedback!' energy.", icon: MessageSquareText },
              { title: 'Negative-review playbook', body: 'For 1- and 2-stars, Halo drafts an own-it response with a private channel offer.', icon: ShieldCheck },
              { title: 'Multi-location ready', body: 'Manage 1 location or 200. Each business gets its own voice profile.', icon: Building2 },
              { title: 'Response analytics', body: 'Average reply time, sentiment trend, approval rate, all in one chart.', icon: BarChart3 },
              { title: 'Response-time SLA alerts', body: 'Push notification if a review sits unanswered past your SLA. 32% of customers want a next-day reply.', icon: Timer },
              { title: 'Claude under the hood', body: 'Frontier model, your guardrails. Brand voice never drifts.', icon: Sparkles },
            ].map((f, i) => (
              <Reveal key={f.title} direction="up" delay={i * 60}>
                <div className="group h-full rounded-2xl border border-hair bg-white p-6 shadow-warm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-warm-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber transition-colors group-hover:bg-amber/20">
                    <f.icon size={18} />
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-ink-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-20">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <Reveal direction="up">
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
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] text-ink-muted">
                    <Check size={13} className="text-amber" /> Cancel anytime · CSV export anytime
                  </div>
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
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hair bg-cream-2/30">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-8 text-[13px] text-ink-muted sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span>Halo · A review reputation manager</span>
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

function NoContractBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/[0.08] px-3 py-1.5 text-[12px] font-semibold text-amber-dark shadow-warm">
      <ShieldCheck size={13} />
      Month to month. Cancel in one click.
    </span>
  );
}

function PriceCard({
  name,
  price,
  cadence,
  bullets,
  featured,
}: {
  name: string;
  price: string;
  cadence: string;
  bullets: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? 'group relative h-full overflow-hidden rounded-2xl border border-amber/40 bg-gradient-to-br from-white to-amber/[0.04] p-6 shadow-warm-lg transition-transform duration-200 hover:-translate-y-0.5'
          : 'group relative h-full overflow-hidden rounded-2xl border border-hair bg-white p-6 shadow-warm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber/40'
      }
    >
      {featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          Most popular
        </span>
      )}
      <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">{name}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-serif-display text-[42px] font-semibold text-ink">{price}</span>
        <span className="text-[13px] text-ink-muted">{cadence}</span>
      </div>
      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber/[0.08] px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wider text-amber-dark">
        No contract
      </div>
      <ul className="mt-5 space-y-2.5 text-[14px] text-ink-soft">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check size={15} className="mt-0.5 shrink-0 text-amber" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResponseTimeStatCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-amber/5 blur-2xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-2xl border border-hair bg-white shadow-warm-lg">
        <div className="flex items-center justify-between border-b border-hair bg-cream-2/40 px-4 py-3">
          <div className="flex items-center gap-2 text-[12px] font-medium text-ink-muted">
            <Logo size={16} /> Response time · last 30 days
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-dark">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" /> live
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-baseline gap-2">
            <span className="font-serif-display text-[64px] font-semibold leading-none text-ink count-tick">
              14
            </span>
            <span className="text-[18px] font-medium text-ink-soft">min median</span>
          </div>
          <div className="mt-1 text-[12.5px] text-ink-muted">
            That's <span className="font-semibold text-amber-dark">278×</span> faster than the 2026 industry average.
          </div>

          <div className="mt-5 space-y-3">
            <BarRow label="Halo (you)" valueLabel="14 min" widthPct={2} highlight />
            <BarRow label="Top performers" valueLabel="< 2 hr" widthPct={8} />
            <BarRow label="Industry average" valueLabel="2.7 days" widthPct={100} muted />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Mini stat="96%" label="< 24 hr" />
            <Mini stat="100%" label="answered" />
            <Mini stat="4.8★" label="post-90-day" />
          </div>
        </div>

        <div className="border-t border-hair bg-cream-2/40 px-5 py-3 text-[11.5px] text-ink-muted">
          Source: ReplyOnTheFly 2026 Google Review Response Benchmark.
        </div>
      </div>
    </div>
  );
}

function BarRow({
  label,
  valueLabel,
  widthPct,
  highlight,
  muted,
}: {
  label: string;
  valueLabel: string;
  widthPct: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11.5px]">
        <span className={highlight ? 'font-semibold text-ink' : 'text-ink-soft'}>{label}</span>
        <span className={highlight ? 'font-mono text-amber-dark' : 'font-mono text-ink-muted'}>{valueLabel}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-cream-2">
        <div
          className={
            highlight
              ? 'h-full rounded-full bg-amber shimmer'
              : muted
                ? 'h-full rounded-full bg-ink/15'
                : 'h-full rounded-full bg-amber/40'
          }
          style={{ width: `${widthPct}%`, transition: 'width 900ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}
        />
      </div>
    </div>
  );
}

function Mini({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-xl border border-hair bg-cream-2/30 px-3 py-2">
      <div className="font-serif-display text-[20px] font-semibold leading-none text-ink">{stat}</div>
      <div className="mt-1 text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</div>
    </div>
  );
}
