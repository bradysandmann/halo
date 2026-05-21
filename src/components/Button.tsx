import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantCls: Record<Variant, string> = {
  primary:
    'bg-amber text-white shadow-warm hover:bg-amber-dark focus-visible:ring-amber/40 active:translate-y-px',
  secondary:
    'border border-hair bg-white text-ink shadow-warm hover:border-ink/15 hover:bg-cream-2/60 focus-visible:ring-ink/15',
  ghost:
    'text-ink-soft hover:bg-cream-2/70 hover:text-ink focus-visible:ring-ink/10',
  danger:
    'bg-rose text-white shadow-warm hover:opacity-90 focus-visible:ring-rose/30',
};

const sizeCls: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-[15px] rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantCls[variant],
          sizeCls[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
