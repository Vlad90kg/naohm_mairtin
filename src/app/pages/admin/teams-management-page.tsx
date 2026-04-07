import React, { useMemo, useState } from 'react';
import {
  Clock3,
  Edit2,
  Mail,
  Phone,
  Plus,
  Save,
  Trash2,
  User,
  Users,
  X,
} from 'lucide-react';
import { MediaUploadButton } from '../../components/admin/media-upload-button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

type AdultTeam = {
  id: string;
  name: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
};

type JuvenileTeam = {
  id: string;
  name: string;
  coach: string;
  contact: string;
  trainingTime: string;
};

const initialAdultTeams: AdultTeam[] = [
  {
    id: 'senior-men',
    name: 'Senior Men',
    description: 'Lead adult men’s team page content, hero messaging, and gallery assets.',
    heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1200&q=80',
      'https://images.unsplash.com/photo-1529900948638-21f99c10d16a?w=1200&q=80',
    ],
  },
  {
    id: 'senior-ladies',
    name: 'Senior Ladies',
    description: 'Lead adult ladies team page content, hero messaging, and gallery assets.',
    heroImage: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516244122345-381a171d1887?w=1200&q=80',
    ],
  },
];

const initialJuvenileTeams: JuvenileTeam[] = [
  { id: 'all-stars', name: 'All Stars', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'nursery', name: 'Nursery', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u7', name: 'U7 Boys & Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u8', name: 'U8 Boys & Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u9-boys', name: 'U9 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u9-girls', name: 'U9 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u10-boys', name: 'U10 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u10-girls', name: 'U10 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u11-boys', name: 'U11 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u11-girls', name: 'U11 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u12-boys', name: 'U12 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u12-girls', name: 'U12 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u13-boys', name: 'U13 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u13-girls', name: 'U13 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u14-boys', name: 'U14 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u14-girls', name: 'U14 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u15-boys', name: 'U15 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u15-girls', name: 'U15 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u16-boys', name: 'U16 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'u16-girls', name: 'U16 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'minor-men', name: 'Minor Men', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
  { id: 'minor-ladies', name: 'Minor Ladies', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
];

type EditorState =
  | { type: 'adult'; mode: 'edit' | 'add'; team: AdultTeam }
  | { type: 'juvenile'; mode: 'edit' | 'add'; team: JuvenileTeam }
  | null;

function createAdultTeam(): AdultTeam {
  return {
    id: `adult-${Date.now()}`,
    name: '',
    description: '',
    heroImage: '',
    galleryImages: [''],
  };
}

function createJuvenileTeam(): JuvenileTeam {
  return {
    id: `juvenile-${Date.now()}`,
    name: '',
    coach: '',
    contact: '',
    trainingTime: '',
  };
}

export function TeamsManagementPage() {
  const [adultTeams, setAdultTeams] = useState(initialAdultTeams);
  const [juvenileTeams, setJuvenileTeams] = useState(initialJuvenileTeams);
  const [editor, setEditor] = useState<EditorState>(null);

  const sortedJuvenileTeams = useMemo(
    () => [...juvenileTeams].sort((a, b) => a.name.localeCompare(b.name)),
    [juvenileTeams],
  );

  const saveAdultTeam = (team: AdultTeam) => {
    setAdultTeams((current) => {
      const exists = current.some((item) => item.id === team.id);
      return exists ? current.map((item) => (item.id === team.id ? team : item)) : [...current, team];
    });
    setEditor(null);
  };

  const saveJuvenileTeam = (team: JuvenileTeam) => {
    setJuvenileTeams((current) => {
      const exists = current.some((item) => item.id === team.id);
      return exists ? current.map((item) => (item.id === team.id ? team : item)) : [...current, team];
    });
    setEditor(null);
  };

  const deleteJuvenileTeam = (id: string) => {
    setJuvenileTeams((current) => current.filter((team) => team.id !== id));
  };

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
              onClick={() => setEditor({ type: 'adult', mode: 'add', team: createAdultTeam() })}
              className="px-6 py-3.5 bg-white text-[#1E3A8A] rounded-2xl font-black uppercase tracking-widest text-[10px] border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Plus size={16} /> Add Adult Team
            </button>
            <button
              onClick={() => setEditor({ type: 'juvenile', mode: 'add', team: createJuvenileTeam() })}
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
                <ImageWithFallback src={team.heroImage} alt={team.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Adult Team</p>
                  <h4 className="mt-3 text-2xl font-black text-[#1E3A8A] tracking-tight">{team.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{team.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {team.galleryImages.slice(0, 3).map((image, index) => (
                    <div key={`${team.id}-gallery-${index}`} className="aspect-[4/3] rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                      <ImageWithFallback src={image} alt={`${team.name} gallery ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setEditor({ type: 'adult', mode: 'edit', team })}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-50 text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#1E3A8A] hover:text-white transition-all"
                >
                  <Edit2 size={14} /> Edit Page
                </button>
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
            {sortedJuvenileTeams.map((team) => (
              <div key={team.id} className="grid grid-cols-[1.5fr_1.2fr_1.2fr_1.2fr_auto] gap-4 px-6 py-5 items-center">
                <span className="font-black text-[#1E3A8A] tracking-tight">{team.name}</span>
                <span className="text-sm text-gray-600">{team.coach}</span>
                <span className="text-sm text-gray-600">{team.contact}</span>
                <span className="text-sm text-gray-600">{team.trainingTime}</span>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setEditor({ type: 'juvenile', mode: 'edit', team })}
                    className="px-4 py-2 bg-blue-50 text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#1E3A8A] hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJuvenileTeam(team.id)}
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

      {editor?.type === 'adult' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="bg-[#1E3A8A] p-8 text-white relative">
              <button
                onClick={() => setEditor(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {editor.mode === 'add' ? 'Add Adult Team' : `Edit ${editor.team.name}`}
              </h3>
              <p className="text-blue-300 font-bold uppercase tracking-widest text-[10px] mt-1">Team page editor</p>
            </div>

            <AdultTeamForm
              team={editor.team}
              onCancel={() => setEditor(null)}
              onSave={saveAdultTeam}
            />
          </div>
        </div>
      )}

      {editor?.type === 'juvenile' && (
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
                {editor.mode === 'add' ? 'Add Juvenile Team' : `Edit ${editor.team.name}`}
              </h3>
              <p className="text-blue-300 font-bold uppercase tracking-widest text-[10px] mt-1">Juvenile team details</p>
            </div>

            <JuvenileTeamForm
              team={editor.team}
              onCancel={() => setEditor(null)}
              onSave={saveJuvenileTeam}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AdultTeamForm({
  team,
  onCancel,
  onSave,
}: {
  team: AdultTeam;
  onCancel: () => void;
  onSave: (team: AdultTeam) => void;
}) {
  const [draft, setDraft] = useState(team);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          ...draft,
          galleryImages: draft.galleryImages.filter((image) => image.trim() !== ''),
        });
      }}
      className="p-10 space-y-8"
    >
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Name</label>
        <input
          type="text"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
        <textarea
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          rows={4}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-800 outline-none resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hero Image</label>
        <div className="flex gap-4">
          <input
            type="text"
            value={draft.heroImage}
            onChange={(e) => setDraft({ ...draft, heroImage: e.target.value })}
            className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
          <MediaUploadButton onSelect={(url) => setDraft({ ...draft, heroImage: url })} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gallery Images</label>
          <button
            type="button"
            onClick={() => setDraft({ ...draft, galleryImages: [...draft.galleryImages, ''] })}
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            + Add Image
          </button>
        </div>

        {draft.galleryImages.map((image, index) => (
          <div key={`${draft.id}-gallery-input-${index}`} className="flex gap-4">
            <input
              type="text"
              value={image}
              onChange={(e) => {
                const updated = [...draft.galleryImages];
                updated[index] = e.target.value;
                setDraft({ ...draft, galleryImages: updated });
              }}
              className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
            />
            <MediaUploadButton
              className="px-3.5"
              label="Upload"
              onSelect={(url) => {
                const updated = [...draft.galleryImages];
                updated[index] = url;
                setDraft({ ...draft, galleryImages: updated });
              }}
            />
            <button
              type="button"
              onClick={() => setDraft({ ...draft, galleryImages: draft.galleryImages.filter((_, i) => i !== index) })}
              className="p-3 text-red-300 hover:text-red-500 rounded-xl"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
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

function JuvenileTeamForm({
  team,
  onCancel,
  onSave,
}: {
  team: JuvenileTeam;
  onCancel: () => void;
  onSave: (team: JuvenileTeam) => void;
}) {
  const [draft, setDraft] = useState(team);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
      className="p-10 space-y-6"
    >
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Team Name</label>
        <input
          type="text"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coach</label>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={draft.coach}
            onChange={(e) => setDraft({ ...draft, coach: e.target.value })}
            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</label>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={draft.contact}
            onChange={(e) => setDraft({ ...draft, contact: e.target.value })}
            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Training Time</label>
        <div className="relative">
          <Clock3 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={draft.trainingTime}
            onChange={(e) => setDraft({ ...draft, trainingTime: e.target.value })}
            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
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
