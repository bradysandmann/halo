import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Landing } from './pages/Landing';
import { SignIn } from './pages/SignIn';
import { Inbox } from './pages/Inbox';
import { Businesses } from './pages/Businesses';
import { Header } from './components/Header';
import { useSession, ensureSeeded } from './lib/auth';
import { Logo } from './components/Logo';

function Protected({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      ensureSeeded(session.user.id);
    }
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-ink-muted">
          <Logo size={36} />
          <span className="text-[13px]">Loading…</span>
        </div>
      </div>
    );
  }

  if (!session) return <SignIn />;
  return <>{children}</>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header authed={!!session} />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Shell>
              <Landing />
            </Shell>
          }
        />
        <Route
          path="/app"
          element={
            <Shell>
              <Protected>
                <Inbox />
              </Protected>
            </Shell>
          }
        />
        <Route
          path="/app/businesses"
          element={
            <Shell>
              <Protected>
                <Businesses />
              </Protected>
            </Shell>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
