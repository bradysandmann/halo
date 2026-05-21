import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { sendMagicLink } from '@/lib/auth';
import { Mail, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const res = await sendMagicLink(email.trim());
    if (!res.ok) {
      setStatus('error');
      setError(res.error ?? 'Something went wrong');
      return;
    }
    setStatus('sent');
  }

  return (
    <div className="grain min-h-[calc(100vh-3.5rem)]">
      <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-[1100px] grid-cols-1 items-center gap-12 px-4 py-12 lg:grid-cols-2 lg:px-6">
        <div className="hidden lg:block">
          <div className="rounded-3xl border border-hair bg-gradient-to-br from-white via-cream to-cream-2 p-10 shadow-warm-lg">
            <Logo size={48} />
            <h2 className="mt-8 font-serif-display text-[40px] font-semibold leading-[1.1] tracking-tight text-ink">
              The inbox that<br />replies for you.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
              Sign in with a magic link. We'll seed your inbox with three sample businesses so you can see Halo working in 30 seconds.
            </p>
            <ul className="mt-8 space-y-3 text-[13.5px] text-ink-muted">
              {[
                'No credit card. No setup wizard.',
                '18 sample reviews across 3 sample businesses.',
                'Claude drafts every reply in the right voice.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-amber" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink">
            <ArrowLeft size={14} /> Back to home
          </Link>

          <div className="mt-6 rounded-3xl border border-hair bg-white p-8 shadow-warm-lg sm:p-10">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
              <Sparkles size={12} /> Sign in
            </div>
            <h1 className="mt-3 font-serif-display text-[32px] font-semibold leading-[1.1] tracking-tight text-ink">
              Open your inbox.
            </h1>
            <p className="mt-2 text-[14px] text-ink-soft">
              Enter your email and we'll send a one-time magic link. No password.
            </p>

            {status === 'sent' ? (
              <div className="mt-8 rounded-2xl border border-amber/30 bg-amber/[0.06] p-6">
                <div className="flex items-center gap-2 text-amber-dark">
                  <CheckCircle2 size={18} />
                  <span className="text-[15px] font-semibold">Link sent.</span>
                </div>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">
                  We sent a magic link to <b>{email}</b>. Open it from this browser and you'll land in the inbox. The link expires in 60 minutes.
                </p>
                <button
                  className="mt-4 text-[12.5px] font-medium text-amber-dark hover:underline"
                  onClick={() => setStatus('idle')}
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <label className="block">
                  <span className="text-[12px] font-medium text-ink-soft">Email</span>
                  <div className="relative mt-1.5">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourbusiness.com"
                      className="w-full rounded-xl border border-hair bg-cream/40 py-3 pl-9 pr-3 text-[14px] text-ink placeholder:text-ink-muted/60 focus:border-amber focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber/15"
                    />
                  </div>
                </label>

                {status === 'error' && error && (
                  <p className="rounded-lg border border-rose/30 bg-rose/5 p-3 text-[13px] text-rose">{error}</p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send magic link'}
                </Button>

                <p className="pt-2 text-[12px] text-ink-muted">
                  By signing in you agree this is a portfolio demo. Use a real email. Links expire in 60 minutes.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
