import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'none';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  threshold?: number;
  once?: boolean;
};

const directionCls: Record<Direction, string> = {
  up: 'translate-y-4',
  left: '-translate-x-4',
  right: 'translate-x-4',
  none: '',
};

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionCls[direction]}`,
        className
      )}
    >
      {children}
    </div>
  );
}
