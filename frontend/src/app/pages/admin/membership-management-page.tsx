import { useState } from 'react';
import { 
  CreditCard, 
  Save, 
  Smartphone, 
  Image as ImageIcon,
  RefreshCw,
  CheckCircle2,
  Apple,
  Play
} from 'lucide-react';
import { useCMS } from '../../data/cms-context';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { MediaUploadButton } from '../../components/admin/media-upload-button';
import { toast } from 'sonner';

export function MembershipManagementPage() {
  const { membership, updateMembership } = useCMS();
  const [formData, setFormData] = useState(membership);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateMembership(formData);
      setIsSaving(false);
      toast.success('Membership content updated successfully!');
    }, 800);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Membership Management</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Update app links, description text, and annual registration posters.</p>
        </div>
        <div className="flex items-center gap-3 bg-amber-50 px-5 py-3 rounded-2xl border border-amber-100 text-amber-700">
          <Smartphone size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Powered by ClubSpot</span>
        </div>
      </section>

      <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Main Content */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3 mb-4">
              <CreditCard size={22} className="text-amber-500" /> Page Content
            </h3>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Description Text</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] font-medium text-gray-600 outline-none focus:ring-2 focus:ring-[#1E3A8A]/10 resize-none leading-relaxed"
                placeholder="Explain membership process to users..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Apple size={14} className="text-gray-900" /> App Store Link (iOS)
                </label>
                <input 
                  type="url" 
                  value={formData.appStoreLink}
                  onChange={(e) => setFormData({...formData, appStoreLink: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 text-xs outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Play size={14} className="text-green-600" /> Google Play Link (Android)
                </label>
                <input 
                  type="url" 
                  value={formData.googlePlayLink}
                  onChange={(e) => setFormData({...formData, googlePlayLink: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 text-xs outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                />
              </div>
            </div>
          </section>

          {/* Quick Help for non-technical users */}
          <div className="bg-[#1E3A8A] p-8 rounded-[2.5rem] text-white flex items-center gap-6 shadow-xl shadow-blue-900/10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={32} className="text-amber-400" />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-tight text-lg leading-tight mb-1">Update Poster Annually</h4>
              <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                Remember to replace the registration poster at the start of each season (January/February) 
                to show current membership rates for the year.
              </p>
            </div>
          </div>
        </div>

        {/* Media & Sidebar */}
        <div className="space-y-10">
          {/* Poster Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3">
              <ImageIcon size={20} className="text-amber-500" /> Membership Poster
            </h3>
            
            <div className="aspect-[1/1.41] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative group">
              <ImageWithFallback 
                src={formData.poster} 
                alt="Membership Poster" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <p className="text-white text-xs font-black uppercase tracking-widest leading-relaxed">
                  Replace image to show current season's rates
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Poster Image URL</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={formData.poster}
                  onChange={(e) => setFormData({...formData, poster: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-medium text-xs text-blue-600 outline-none truncate"
                />
                <MediaUploadButton onSelect={(url) => setFormData({ ...formData, poster: url })} />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <button 
            type="submit"
            disabled={isSaving}
            className="w-full py-5 bg-[#1E3A8A] text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 group disabled:opacity-70"
          >
            {isSaving ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <Save size={20} className="group-hover:scale-110 transition-transform" />
            )}
            {isSaving ? 'Updating...' : 'Save & Update Page'}
          </button>
        </div>
      </form>
    </div>
  );
}
