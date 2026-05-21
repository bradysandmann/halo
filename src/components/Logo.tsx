import { cn } from '@/lib/utils';

export function Logo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      className={cn('shrink-0', className)}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lg-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#D97706" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#lg-halo)" />
      <circle cx="32" cy="32" r="22" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.35" />
      <circle cx="32" cy="32" r="16" stroke="#D97706" strokeWidth="1.75" fill="none" opacity="0.6" />
      <circle cx="32" cy="32" r="10" stroke="#D97706" strokeWidth="2" fill="none" />
      <circle cx="32" cy="32" r="3.5" fill="#D97706" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Logo size={28} />
      <span className="font-serif-display text-[22px] font-semibold tracking-tight text-ink">Halo</span>
    </div>
  );
}
