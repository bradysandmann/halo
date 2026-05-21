import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Stars({ value, size = 14, className }: { value: number; size?: number; className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= value;
        return (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={cn(filled ? 'fill-amber text-amber' : 'fill-transparent text-ink-muted/40')}
          />
        );
      })}
    </div>
  );
}

export function SourceChip({ source }: { source: string }) {
  const label = { google: 'Google', yelp: 'Yelp', g2: 'G2', trustpilot: 'Trustpilot' }[source] ?? source;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-hair bg-cream-2/60 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          source === 'google' && 'bg-[#4285F4]',
          source === 'yelp' && 'bg-[#D32323]',
          source === 'g2' && 'bg-[#FF492C]',
          source === 'trustpilot' && 'bg-[#00B67A]'
        )}
      />
      {label}
    </span>
  );
}

export function SentimentBadge({ rating }: { rating: number }) {
  if (rating >= 4) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber/10 px-2 py-0.5 text-[11px] font-medium text-amber-dark">
        Positive
      </span>
    );
  }
  if (rating === 3) {
    return (
      <span className="inline-flex items-center rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
        Neutral
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-rose/10 px-2 py-0.5 text-[11px] font-medium text-rose">
      Negative
    </span>
  );
}
