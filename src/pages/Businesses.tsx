import { useEffect, useState } from 'react';
import { supabase, type Business } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Plus, Building2, Edit3, Save, X, Trash2, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editVoice, setEditVoice] = useState('');
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newVoice, setNewVoice] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('businesses').select('*').order('created_at', { ascending: true });
    setBusinesses((data as Business[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function startEdit(b: Business) {
    setEditingId(b.id);
    setEditName(b.name);
    setEditVoice(b.brand_voice ?? '');
  }

  async function saveEdit(id: string) {
    const { error } = await supabase
      .from('businesses')
      .update({ name: editName.trim(), brand_voice: editVoice.trim() })
      .eq('id', id);
    if (error) {
      showToast('Save failed: ' + error.message);
      return;
    }
    setEditingId(null);
    await load();
    showToast('Voice updated.');
  }

  async function deleteBusiness(id: string) {
    if (!confirm('Delete this business and every review under it? This cannot be undone.')) return;
    const { error } = await supabase.from('businesses').delete().eq('id', id);
    if (error) {
      showToast('Delete failed: ' + error.message);
      return;
    }
    await load();
    showToast('Business removed.');
  }

  async function addBusiness() {
    if (!newName.trim()) {
      showToast('Name is required.');
      return;
    }
    const { data: u } = await supabase.auth.getUser();
    const user_id = u?.user?.id;
    if (!user_id) {
      showToast('Not signed in.');
      return;
    }
    const { error } = await supabase
      .from('businesses')
      .insert({ user_id, name: newName.trim(), brand_voice: newVoice.trim() });
    if (error) {
      showToast('Add failed: ' + error.message);
      return;
    }
    setAdding(false);
    setNewName('');
    setNewVoice('');
    await load();
    showToast('Business added.');
  }

  return (
    <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-amber">Configure</span>
          <h1 className="mt-2 font-serif-display text-[36px] font-semibold tracking-tight text-ink sm:text-[44px]">
            Businesses &amp; brand voice
          </h1>
          <p className="mt-2 max-w-[560px] text-[14px] leading-[1.6] text-ink-soft">
            Halo learns one voice per business. The voice profile here is what Claude reads before drafting every reply.
          </p>
        </div>
        <Button onClick={() => setAdding(true)} disabled={adding}>
          <Plus size={14} /> Add business
        </Button>
      </div>

      {loading ? (
        <div className="mt-10 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-cream-2/60" />
          ))}
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {adding && (
            <div className="rounded-2xl border border-amber/40 bg-amber/[0.04] p-6 shadow-warm">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-dark">
                <Plus size={12} /> New business
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-[12px] font-medium text-ink-soft">Business name</label>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Sunrise Yoga Studio"
                    className="mt-1.5 w-full rounded-xl border border-hair bg-white p-3 text-[14px] focus:border-amber focus:outline-none focus:ring-4 focus:ring-amber/15"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-ink-soft">Brand voice</label>
                  <textarea
                    value={newVoice}
                    onChange={(e) => setNewVoice(e.target.value)}
                    rows={4}
                    placeholder="A few sentences. Tone, vocabulary, sign-off. Halo will follow it exactly."
                    className="mt-1.5 w-full resize-none rounded-xl border border-hair bg-white p-3 text-[14px] leading-[1.55] focus:border-amber focus:outline-none focus:ring-4 focus:ring-amber/15"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button size="sm" onClick={addBusiness}>
                  <Check size={13} /> Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setAdding(false);
                    setNewName('');
                    setNewVoice('');
                  }}
                >
                  <X size={13} /> Cancel
                </Button>
              </div>
            </div>
          )}

          {businesses.length === 0 && !adding && (
            <div className="rounded-2xl border border-dashed border-hair p-10 text-center">
              <Building2 className="mx-auto text-ink-muted" size={28} />
              <p className="mt-3 text-[14px] font-medium text-ink">No businesses yet.</p>
              <p className="mt-1 text-[12.5px] text-ink-muted">
                Add a business to start drafting replies.
              </p>
            </div>
          )}

          {businesses.map((b) => {
            const editing = editingId === b.id;
            return (
              <div
                key={b.id}
                className={cn(
                  'rounded-2xl border bg-white p-6 shadow-warm',
                  editing ? 'border-amber/40' : 'border-hair'
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {editing ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 rounded-xl border border-hair bg-cream/40 p-2 text-[18px] font-semibold text-ink focus:border-amber focus:outline-none"
                    />
                  ) : (
                    <div>
                      <h2 className="font-serif-display text-[22px] font-semibold tracking-tight text-ink">
                        {b.name}
                      </h2>
                      {b.category && (
                        <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
                          {b.category}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    {editing ? (
                      <>
                        <Button size="sm" onClick={() => saveEdit(b.id)}>
                          <Save size={13} /> Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          <X size={13} /> Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => startEdit(b)}>
                          <Edit3 size={13} /> Edit voice
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-rose hover:bg-rose/5 hover:text-rose"
                          onClick={() => deleteBusiness(b.id)}
                          aria-label="Delete business"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    Brand voice
                  </div>
                  {editing ? (
                    <textarea
                      value={editVoice}
                      onChange={(e) => setEditVoice(e.target.value)}
                      rows={5}
                      className="mt-2 w-full resize-none rounded-xl border border-hair bg-cream/30 p-3 text-[14px] leading-[1.6] focus:border-amber focus:outline-none focus:ring-4 focus:ring-amber/15"
                    />
                  ) : (
                    <p className="mt-2 whitespace-pre-line text-[14px] leading-[1.65] text-ink-soft">
                      {b.brand_voice || (
                        <span className="italic text-ink-muted">
                          No brand voice set. Halo will use a generic warm-and-direct tone until you add one.
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-hair bg-white px-4 py-3 text-[13px] text-ink shadow-warm-lg fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
