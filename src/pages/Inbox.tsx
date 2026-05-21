import { useEffect, useMemo, useState } from 'react';
import { supabase, type Business, type Review, type Draft } from '@/lib/supabase';
import { Stars, SourceChip, SentimentBadge } from '@/components/Stars';
import { Button } from '@/components/Button';
import { cn, timeAgo, sentimentForRating } from '@/lib/utils';
import { draftReply } from '@/lib/anthropic';
import {
  Check,
  Sparkles,
  Send,
  X,
  ChevronDown,
  RotateCw,
  AlertCircle,
  Inbox as InboxIcon,
  Filter,
  Loader2,
} from 'lucide-react';

type ReviewWithDraft = Review & { draft?: Draft | null; business?: Business };
type Filt = 'all' | 'new' | 'replied' | 'negative';

export function Inbox() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [reviews, setReviews] = useState<ReviewWithDraft[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filt>('all');
  const [businessFilter, setBusinessFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [editorText, setEditorText] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  async function loadAll() {
    setLoading(true);
    const [{ data: b }, { data: r }, { data: d }] = await Promise.all([
      supabase.from('businesses').select('*').order('created_at', { ascending: true }),
      supabase.from('reviews').select('*').order('posted_at', { ascending: false }),
      supabase.from('drafts').select('*'),
    ]);
    setBusinesses((b as Business[]) ?? []);
    setReviews((r as Review[]) ?? []);
    const dmap: Record<string, Draft> = {};
    (d as Draft[] | null)?.forEach((x) => (dmap[x.review_id] = x));
    setDrafts(dmap);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (businessFilter !== 'all' && r.business_id !== businessFilter) return false;
      if (filter === 'new') return r.status === 'new';
      if (filter === 'replied') return r.status === 'replied';
      if (filter === 'negative') return r.rating <= 2;
      return true;
    });
  }, [reviews, filter, businessFilter]);

  // Auto-select first when list changes
  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filtered.find((r) => r.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = reviews.find((r) => r.id === selectedId) ?? null;
  const selectedBusiness = selected ? businesses.find((b) => b.id === selected.business_id) ?? null : null;
  const selectedDraft = selected ? drafts[selected.id] : undefined;

  // Sync editor text to selected draft
  useEffect(() => {
    setEditorText(selectedDraft?.draft_text ?? '');
  }, [selectedDraft?.id, selectedDraft?.draft_text]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }

  async function persistDraft(reviewId: string, text: string) {
    const existing = drafts[reviewId];
    if (existing) {
      const { data, error } = await supabase
        .from('drafts')
        .update({ draft_text: text })
        .eq('id', existing.id)
        .select()
        .single();
      if (!error && data) setDrafts({ ...drafts, [reviewId]: data as Draft });
    } else {
      const { data, error } = await supabase
        .from('drafts')
        .insert({ review_id: reviewId, draft_text: text, status: 'pending' })
        .select()
        .single();
      if (!error && data) setDrafts({ ...drafts, [reviewId]: data as Draft });
    }
  }

  async function onGenerate() {
    if (!selected || !selectedBusiness) return;
    setGenerating(true);
    try {
      const text = await draftReply(selected, selectedBusiness);
      setEditorText(text);
      await persistDraft(selected.id, text);
      showToast('Draft regenerated.');
    } finally {
      setGenerating(false);
    }
  }

  async function onApprove() {
    if (!selected) return;
    await persistDraft(selected.id, editorText);
    const existing = drafts[selected.id];
    if (existing) {
      await supabase.from('drafts').update({ status: 'approved' }).eq('id', existing.id);
    }
    await supabase.from('reviews').update({ status: 'replied' }).eq('id', selected.id);
    setReviews((rs) => rs.map((r) => (r.id === selected.id ? { ...r, status: 'replied' as const } : r)));
    showToast('Sketch mode: In production, this posts back via Google/Yelp/G2 APIs.');
  }

  async function onSkip() {
    if (!selected) return;
    await supabase.from('reviews').update({ status: 'skipped' }).eq('id', selected.id);
    setReviews((rs) => rs.map((r) => (r.id === selected.id ? { ...r, status: 'skipped' as const } : r)));
    showToast('Skipped. You can revisit anytime.');
  }

  async function onSaveEdit() {
    if (!selected) return;
    await persistDraft(selected.id, editorText);
    showToast('Edit saved to draft.');
  }

  return (
    <div className="grid h-[calc(100vh-3.5rem)] grid-cols-1 lg:grid-cols-[400px_1fr]">
      {/* SIDEBAR */}
      <aside className="flex h-full flex-col border-r border-hair bg-white/60">
        <div className="border-b border-hair px-4 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold text-ink">
              <InboxIcon size={15} className="text-amber" /> Inbox
              <span className="rounded-full bg-cream-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
                {reviews.filter((r) => r.status === 'new').length}
              </span>
            </h2>
            <button
              onClick={loadAll}
              className="text-ink-muted hover:text-ink"
              aria-label="Refresh"
              title="Refresh"
            >
              <RotateCw size={14} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {(['all', 'new', 'replied', 'negative'] as Filt[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-[11.5px] font-medium capitalize transition-colors',
                  filter === f
                    ? 'bg-ink text-cream'
                    : 'bg-cream-2/70 text-ink-muted hover:bg-cream-2'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <Filter size={12} className="text-ink-muted" />
            <select
              value={businessFilter}
              onChange={(e) => setBusinessFilter(e.target.value)}
              className="w-full rounded-lg border border-hair bg-cream/40 px-2 py-1 text-[12px] text-ink focus:border-amber focus:outline-none"
            >
              <option value="all">All businesses</option>
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto">
          {loading ? (
            <div className="space-y-3 p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-cream-2/60" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((r) => {
              const b = businesses.find((x) => x.id === r.business_id);
              const active = r.id === selectedId;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={cn(
                    'w-full border-b border-hair p-3.5 text-left transition-colors',
                    active ? 'bg-amber/[0.06]' : 'hover:bg-cream-2/40',
                    r.status === 'skipped' && 'opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-semibold text-ink">
                      {r.author ?? 'Anonymous'}
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted">{timeAgo(r.posted_at)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Stars value={r.rating} size={11} />
                    <SourceChip source={r.source} />
                    {r.status === 'replied' && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                        <Check size={9} /> Replied
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-[1.45] text-ink-muted">
                    {r.body}
                  </p>
                  {b && (
                    <div className="mt-1.5 truncate text-[11px] text-ink-muted/80">{b.name}</div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* MAIN PANE */}
      <main className="flex h-full flex-col overflow-hidden">
        {selected && selectedBusiness ? (
          <>
            <div className="border-b border-hair px-6 pt-5 pb-4 sm:px-10">
              <div className="flex flex-wrap items-center gap-2">
                <Stars value={selected.rating} size={15} />
                <SourceChip source={selected.source} />
                <SentimentBadge rating={selected.rating} />
                <span className="ml-auto font-mono text-[11px] text-ink-muted">
                  {new Date(selected.posted_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h1 className="mt-3 font-serif-display text-[24px] font-semibold tracking-tight text-ink">
                {selected.author ?? 'Anonymous'}
              </h1>
              <p className="text-[13px] text-ink-muted">
                Review of <span className="font-medium text-ink-soft">{selectedBusiness.name}</span>
              </p>
            </div>

            <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-6 sm:px-10">
              <div className="mx-auto max-w-[680px]">
                <div className="rounded-2xl border border-hair bg-white p-6 shadow-warm fade-in">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    Customer wrote
                  </div>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.65] text-ink-soft">
                    "{selected.body}"
                  </p>
                </div>

                {sentimentForRating(selected.rating) === 'negative' && (
                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose/25 bg-rose/[0.04] p-3.5 text-[13px] text-rose">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold">Negative review.</span> Halo requires manual approval before this reply is posted.
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-2xl border border-amber/35 bg-gradient-to-br from-amber/[0.04] to-transparent p-6 shadow-warm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-dark">
                      <Sparkles size={13} /> Halo draft
                      {selectedDraft?.status === 'approved' && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700">
                          Approved
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onGenerate}
                      disabled={generating}
                      title="Regenerate with Claude"
                    >
                      {generating ? <Loader2 size={13} className="animate-spin" /> : <RotateCw size={13} />}
                      {generating ? 'Drafting' : 'Regenerate'}
                    </Button>
                  </div>

                  <textarea
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    rows={Math.max(5, Math.ceil(editorText.length / 60))}
                    className="mt-4 w-full resize-none rounded-xl border border-hair bg-white p-4 text-[14.5px] leading-[1.65] text-ink focus:border-amber focus:outline-none focus:ring-4 focus:ring-amber/15"
                    placeholder={generating ? 'Drafting in your voice…' : 'Write a reply'}
                  />

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-ink-muted">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono">{editorText.length}</span> chars ·{' '}
                      <span className="font-mono">{editorText.trim().split(/\s+/).filter(Boolean).length}</span> words
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>Voice:</span>
                      <span className="rounded-md bg-cream-2 px-1.5 py-0.5 font-medium text-ink-soft">
                        {selectedBusiness.name}
                      </span>
                    </div>
                  </div>
                </div>

                <details className="mt-4 rounded-xl border border-hair bg-cream/40 p-4">
                  <summary className="flex cursor-pointer items-center gap-1.5 text-[12px] font-medium text-ink-muted hover:text-ink">
                    <ChevronDown size={13} /> Brand voice for {selectedBusiness.name}
                  </summary>
                  <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-soft">
                    {selectedBusiness.brand_voice}
                  </p>
                </details>

                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-hair pt-6">
                  <Button onClick={onApprove} disabled={!editorText.trim()}>
                    <Send size={14} /> Approve &amp; post reply
                  </Button>
                  <Button variant="secondary" onClick={onSaveEdit}>
                    Save edit
                  </Button>
                  <Button variant="ghost" onClick={onSkip}>
                    <X size={14} /> Skip
                  </Button>
                </div>

                <p className="mt-3 text-[11.5px] text-ink-muted">
                  Sketch mode: approving doesn't post to Google. In production, Halo ships the reply via Google Business Profile, Yelp, G2, or Trustpilot APIs after this button.
                </p>
              </div>
            </div>
          </>
        ) : loading ? (
          <div className="flex flex-1 items-center justify-center text-ink-muted">
            <Loader2 className="mr-2 animate-spin" size={16} /> Loading inbox…
          </div>
        ) : (
          <EmptyMain />
        )}
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-hair bg-white px-4 py-3 text-[13px] text-ink shadow-warm-lg fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-2 text-ink-muted">
        <InboxIcon size={20} />
      </div>
      <p className="mt-4 text-[14px] font-medium text-ink">Inbox zero.</p>
      <p className="mt-1 text-[12.5px] text-ink-muted">
        Nothing matches the current filter. Try All or change businesses.
      </p>
    </div>
  );
}

function EmptyMain() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber/10 text-amber">
        <Sparkles size={22} />
      </div>
      <p className="mt-5 font-serif-display text-[22px] font-semibold tracking-tight text-ink">Pick a review.</p>
      <p className="mt-2 max-w-[360px] text-[13.5px] text-ink-muted">
        Choose a review on the left. Halo's draft will appear here.
      </p>
    </div>
  );
}
