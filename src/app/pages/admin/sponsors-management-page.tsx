import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Link as LinkIcon
} from 'lucide-react';
import { useCMS } from '../../data/cms-context';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { MediaUploadButton } from '../../components/admin/media-upload-button';

export function SponsorsManagementPage() {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = useCMS();
  const [isEditing, setIsEditing] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTier, setActiveTier] = useState<0 | 1 | 2 | 3>(0);

  const filteredSponsors = sponsors.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = activeTier === 0 || s.tier === activeTier;
    return matchesSearch && matchesTier;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateSponsor(isEditing.id, isEditing);
      setIsEditing(null);
    } else if (isAdding) {
      addSponsor(isAdding);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Controls */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Manage Sponsors</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Add new partners and manage visibility across the site.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search sponsors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#1E3A8A]/20 focus:outline-none w-full sm:w-64 transition-all"
            />
          </div>
          <button 
            onClick={() => setIsAdding({ name: '', logo: '', url: '', tier: 2 })}
            className="px-6 py-3.5 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
          >
            <Plus size={16} /> Add Sponsor
          </button>
        </div>
      </section>

      {/* Tier Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-2xl w-fit border border-gray-100 shadow-sm">
        {[0, 1, 2, 3].map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier as any)}
            className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
              activeTier === tier 
                ? 'bg-[#1E3A8A] text-white shadow-lg' 
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {tier === 0 ? 'All Partners' : `Tier ${tier}`}
          </button>
        ))}
      </div>

      {/* Sponsors Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col p-8">
            <div className="h-24 w-full flex items-center justify-center mb-6">
              <ImageWithFallback 
                src={sponsor.logo} 
                alt={sponsor.name} 
                className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            <div className="flex-grow space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight truncate leading-tight">{sponsor.name}</h3>
                <span className={`flex-shrink-0 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  sponsor.tier === 1 ? 'bg-amber-100 text-amber-700' : 
                  sponsor.tier === 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  Tier {sponsor.tier}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 overflow-hidden">
                <LinkIcon size={14} className="text-blue-500" />
                <span className="truncate">{sponsor.url}</span>
              </div>
              
              <div className="pt-4 flex items-center gap-3 mt-auto">
                <button 
                  onClick={() => setIsEditing(sponsor)}
                  className="flex-grow flex items-center justify-center gap-2 py-3 bg-blue-50 text-[#1E3A8A] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#1E3A8A] hover:text-white transition-all"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button 
                  onClick={() => deleteSponsor(sponsor.id)}
                  className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Add / Edit */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="bg-[#1E3A8A] p-8 text-white relative">
              <button 
                onClick={() => { setIsEditing(null); setIsAdding(false); }}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {isEditing ? 'Edit Sponsor' : 'Add New Sponsor'}
              </h3>
              <p className="text-blue-300 font-bold uppercase tracking-widest text-[10px] mt-1">Partner information & branding</p>
            </div>
            
            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sponsor Name</label>
                <input 
                  type="text" 
                  value={isEditing?.name || isAdding?.name || ''}
                  onChange={(e) => {
                    if (isEditing) setIsEditing({...isEditing, name: e.target.value});
                    if (isAdding) setIsAdding({...isAdding, name: e.target.value});
                  }}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                  placeholder="Business Name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tier Level</label>
                  <select 
                    value={isEditing?.tier || isAdding?.tier || 2}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (isEditing) setIsEditing({...isEditing, tier: val});
                      if (isAdding) setIsAdding({...isAdding, tier: val});
                    }}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none appearance-none"
                  >
                    <option value={1}>Tier 1 (Main Partner)</option>
                    <option value={2}>Tier 2 (Sponsor)</option>
                    <option value={3}>Tier 3 (Supporter)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Website Link</label>
                  <input 
                    type="url" 
                    value={isEditing?.url || isAdding?.url || ''}
                    onChange={(e) => {
                      if (isEditing) setIsEditing({...isEditing, url: e.target.value});
                      if (isAdding) setIsAdding({...isAdding, url: e.target.value});
                    }}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logo URL / Figma Asset</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={isEditing?.logo || isAdding?.logo || ''}
                    onChange={(e) => {
                      if (isEditing) setIsEditing({...isEditing, logo: e.target.value});
                      if (isAdding) setIsAdding({...isAdding, logo: e.target.value});
                      }}
                      className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                      placeholder="figma:asset/..."
                    />
                  <MediaUploadButton
                    onSelect={(url) => {
                      if (isEditing) setIsEditing({ ...isEditing, logo: url });
                      if (isAdding) setIsAdding({ ...isAdding, logo: url });
                    }}
                  />
                </div>
              </div>

              {/* Logo Preview */}
              {(isEditing?.logo || isAdding?.logo) && (
                <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center">
                  <div className="h-16 flex items-center justify-center">
                    <ImageWithFallback 
                      src={isEditing?.logo || isAdding?.logo} 
                      alt="Logo Preview" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="mt-12 flex gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => { setIsEditing(null); setIsAdding(false); }}
                  className="flex-grow py-4 bg-gray-100 text-[#1E3A8A] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                >
                  <Save size={16} /> {isEditing ? 'Save Changes' : 'Create Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
