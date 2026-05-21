import { Link, useLocation } from 'react-router-dom';
import { Wordmark } from './Logo';
import { Button } from './Button';
import { signOut } from '@/lib/auth';
import { LogOut, Building2, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header({ authed }: { authed: boolean }) {
  const loc = useLocation();
  const isApp = loc.pathname.startsWith('/app');

  return (
    <header className="sticky top-0 z-30 border-b border-hair bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Link to={authed ? '/app' : '/'} className="flex items-center">
          <Wordmark />
        </Link>

        <div className="flex items-center gap-1">
          {authed && isApp && (
            <nav className="hidden items-center gap-1 sm:flex">
              <NavItem to="/app" icon={<Inbox size={15} />} label="Inbox" />
              <NavItem to="/app/businesses" icon={<Building2 size={15} />} label="Businesses" />
            </nav>
          )}
          <div className="mx-2 hidden h-5 w-px bg-hair sm:block" />
          {authed ? (
            <Button variant="ghost" size="sm" onClick={() => signOut()} aria-label="Sign out">
              <LogOut size={14} /> Sign out
            </Button>
          ) : (
            <>
              <Link to="/app" className="hidden sm:block">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link to="/app">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const loc = useLocation();
  const active = loc.pathname === to || (to === '/app' && loc.pathname === '/app/');
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors',
        active ? 'bg-cream-2 text-ink' : 'text-ink-muted hover:bg-cream-2/70 hover:text-ink'
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
