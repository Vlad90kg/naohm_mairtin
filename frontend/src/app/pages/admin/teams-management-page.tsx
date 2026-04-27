import { useEffect, useMemo, useState } from 'react';
import {
  Clock3,
  Edit2,
  Phone,
  Plus,
  Save,
  Trash2,
  User,
  Users,
  X,
  Loader2,
} from 'lucide-react';
import { MediaUploadButton } from '../../components/admin/media-upload-button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  type ApiTeam,
} from '../../data/fixtures-results-api';

type EditorState =
  | { mode: 'edit' | 'add'; team: Partial<ApiTeam> }
  | null;

export function TeamsManagementPage() {
  const [teams, setTeams] = useState<ApiTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editor, setEditor] = useState<EditorState>(null);

  useEffect(() => {
    void loadTeams();
  }, []);

  const loadTeams = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTeams({ internal: 'true' });
      setTeams(data);
    } catch (error) {
      console.error('Failed to load teams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const adultTeams = useMemo(
    () => teams.filter(t => t.category === 'adult' || t.category === 'ladies'),
    [teams]
  );

  const juvenileTeams = useMemo(
    () => teams.filter(t => t.category === 'juvenile').sort((a, b) => a.name.localeCompare(b.name)),
    [teams]
  );

  const handleSave = async (team: Partial<ApiTeam>) => {
    try {
      if (team.id) {
        await updateTeam(team.id, team);
      } else {
        await createTeam(team);
      }
      await loadTeams();
      setEditor(null);
    } catch (error) {
      console.error('Failed to save team:', error);
      alert('Failed to save team. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team?')) return;
    try {
      await deleteTeam(id);
      await loadTeams();
    } catch (error) {
      console.error('Failed to delete team:', error);
      alert('Failed to delete team.');
    }
  };

  if (isLoading && teams.length === 0) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 text-[#1E3A8A] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Manage Teams</h2>
            <p className="text-gray-400 font-medium text-sm mt-1">
              Separate editing flows for adult and juvenile teams with room to grow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setEditor({ mode: 'add', team: { category: 'adult', is_internal: true, managers: [], training_times: [] } })}
              className="px-6 py-3.5 bg-white text-[#1E3A8A] rounded-2xl font-black uppercase tracking-widest text-[10px] border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Plus size={16} /> Add Adult Team
            </button>
            <button
              onClick={() => setEditor({ mode: 'add', team: { category: 'juvenile', is_internal: true, managers: [], training_times: [] } })}
              className="px-6 py-3.5 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
            >
              <Plus size={16} /> Add Juvenile Team
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1E3A8A]">
            <Users size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Adult Teams</h3>
            <p className="text-sm text-gray-500 font-medium">Hero content, description, and gallery assets for senior teams.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {adultTeams.map((team) => (
            <article key={team.id} className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <div className="aspect-[16/8] bg-gray-100">
                <ImageWithFallback src={team.image} alt={team.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                    {team.category_display} Team
                  </p>
                  <h4 className="mt-3 text-2xl font-black text-[#1E3A8A] tracking-tight">{team.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 truncate-2-lines">
                    {team.training_times.join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditor({ mode: 'edit', team })}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-50 text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#1E3A8A] hover:text-white transition-all"
                  >
                    <Edit2 size={14} /> Edit Team
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <User size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Juvenile Teams</h3>
            <p className="text-sm text-gray-500 font-medium">Compact list for coaching, contact, and training schedule management.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
          <div className="grid grid-cols-[1.5fr_1.2fr_1.2fr_1.2fr_auto] gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <span>Team</span>
            <span>Coach</span>
            <span>Contact</span>
            <span>Training Time</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-gray-100">
            {juvenileTeams.map((team) => (
              <div key={team.id} className="grid grid-cols-[1.5fr_1.2fr_1.2fr_1.2fr_auto] gap-4 px-6 py-5 items-center">
                <span className="font-black text-[#1E3A8A] tracking-tight">{team.name}</span>
                <span className="text-sm text-gray-600">{team.managers[0]?.name || '-'}</span>
                <span className="text-sm text-gray-600">{team.contact_email || team.managers[0]?.phone || '-'}</span>
                <span className="text-sm text-gray-600">{team.training_times[0] || '-'}</span>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setEditor({ mode: 'edit', team })}
                    className="px-4 py-2 bg-blue-50 text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#1E3A8A] hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="p-2.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {editor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="bg-[#1E3A8A] p-8 text-white relative">
              <button
                onClick={() => setEditor(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {editor.mode === 'add' ? 'Add Team' : `Edit ${editor.team.name}`}
              </h3>
              <p className="text-blue-300 font-bold uppercase tracking-widest text-[10px] mt-1">Team editor</p>
            </div>

            <TeamForm
              team={editor.team}
              onCancel={() => setEditor(null)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TeamForm({
  team,
  onCancel,
  onSave,
}: {
  team: Partial<ApiTeam>;
  onCancel: () => void;
  onSave: (team: Partial<ApiTeam>) => void;
}) {
  const [draft, setDraft] = useState(team);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name || !draft.slug) {
      alert('Name and Slug are required');
      return;
    }
    onSave(draft);
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Name</label>
          <input
            type="text"
            required
            value={draft.name || ''}
            onChange={(e) => {
              const name = e.target.value;
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              setDraft({ ...draft, name, slug: draft.slug || slug });
            }}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug</label>
          <input
            type="text"
            required
            value={draft.slug || ''}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value as any })}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          >
            <option value="adult">Adult</option>
            <option value="juvenile">Juvenile</option>
            <option value="ladies">Ladies</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Email</label>
          <input
            type="email"
            value={draft.contact_email || ''}
            onChange={(e) => setDraft({ ...draft, contact_email: e.target.value })}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hero/Profile Image</label>
        <div className="flex gap-4">
          <input
            type="text"
            value={draft.image || ''}
            onChange={(e) => setDraft({ ...draft, image: e.target.value })}
            className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
          <MediaUploadButton onSelect={(url) => setDraft({ ...draft, image: url })} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Managers/Coaches</label>
          <button
            type="button"
            onClick={() => setDraft({ ...draft, managers: [...(draft.managers || []), { role: 'Coach', name: '' }] })}
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            + Add Person
          </button>
        </div>
        {draft.managers?.map((m, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-2 items-center">
            <input
              placeholder="Role"
              value={m.role}
              onChange={(e) => {
                const updated = [...(draft.managers || [])];
                updated[i] = { ...m, role: e.target.value };
                setDraft({ ...draft, managers: updated });
              }}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            />
            <input
              placeholder="Name"
              value={m.name}
              onChange={(e) => {
                const updated = [...(draft.managers || [])];
                updated[i] = { ...m, name: e.target.value };
                setDraft({ ...draft, managers: updated });
              }}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            />
            <input
              placeholder="Phone"
              value={m.phone || ''}
              onChange={(e) => {
                const updated = [...(draft.managers || [])];
                updated[i] = { ...m, phone: e.target.value };
                setDraft({ ...draft, managers: updated });
              }}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            />
            <button
              type="button"
              onClick={() => setDraft({ ...draft, managers: draft.managers?.filter((_, idx) => idx !== i) })}
              className="p-2 text-red-300 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Training Times</label>
          <button
            type="button"
            onClick={() => setDraft({ ...draft, training_times: [...(draft.training_times || []), ''] })}
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            + Add Time
          </button>
        </div>
        {draft.training_times?.map((t, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              placeholder="e.g. Tuesdays 7:30 PM"
              value={t}
              onChange={(e) => {
                const updated = [...(draft.training_times || [])];
                updated[i] = e.target.value;
                setDraft({ ...draft, training_times: updated });
              }}
              className="flex-grow px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm"
            />
            <button
              type="button"
              onClick={() => setDraft({ ...draft, training_times: draft.training_times?.filter((_, idx) => idx !== i) })}
              className="p-2 text-red-300 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-grow py-4 bg-gray-100 text-[#1E3A8A] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] py-4 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
        >
          <Save size={16} /> Save Team
        </button>
      </div>
    </form>
  );
}
