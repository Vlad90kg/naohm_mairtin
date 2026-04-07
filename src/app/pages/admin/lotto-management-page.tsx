import React, { useState } from 'react';
import { 
  Ticket, 
  Save, 
  Plus, 
  Trash2, 
  Calendar, 
  Coins, 
  ExternalLink,
  Image as ImageIcon,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useCMS } from '../../data/cms-context';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { MediaUploadButton } from '../../components/admin/media-upload-button';
import { toast } from 'sonner';

export function LottoManagementPage() {
  const { lotto, updateLotto } = useCMS();
  const [formData, setFormData] = useState(lotto);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updateLotto(formData);
      setIsSaving(false);
      toast.success('Lotto results updated successfully!');
    }, 800);
  };

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...formData.winningNumbers];
    newNumbers[index] = value.padStart(2, '0').slice(-2);
    setFormData({ ...formData, winningNumbers: newNumbers });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Weekly Lotto Update</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Post winning numbers, update the jackpot, and change the poster.</p>
        </div>
        <div className="flex items-center gap-3 bg-green-50 px-5 py-3 rounded-2xl border border-green-100 text-green-700">
          <CheckCircle2 size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Active System</span>
        </div>
      </section>

      <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Winning Numbers */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3 mb-8">
              <Ticket size={22} className="text-amber-500" /> Winning Numbers
            </h3>
            
            <div className="flex flex-wrap gap-4 items-center">
              {formData.winningNumbers.map((num, idx) => (
                <div key={idx} className="relative group">
                  <input 
                    type="text" 
                    maxLength={2}
                    value={num}
                    onChange={(e) => updateNumber(idx, e.target.value)}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 border-2 border-blue-100 rounded-2xl text-center text-2xl font-black text-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/10 focus:border-[#1E3A8A] outline-none transition-all"
                  />
                  <div className="absolute -top-2 -right-2 bg-[#1E3A8A] text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {idx + 1}
                  </div>
                </div>
              ))}
              <div className="h-20 w-px bg-gray-100 mx-4 hidden sm:block" />
              <button 
                type="button"
                className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 hover:text-[#1E3A8A] transition-all border border-dashed border-gray-200"
                onClick={() => setFormData({...formData, winningNumbers: [...formData.winningNumbers, '00']})}
              >
                <Plus size={24} />
              </button>
            </div>
          </section>

          {/* Draw Details */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3 mb-4">
              <Coins size={22} className="text-amber-500" /> Draw Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Jackpot</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-[#1E3A8A]">€</span>
                  <input 
                    type="text" 
                    value={formData.jackpot.replace('€', '')}
                    onChange={(e) => setFormData({...formData, jackpot: `€${e.target.value}`})}
                    className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-[#1E3A8A] text-lg outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Draw Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1E3A8A]" />
                  <input 
                    type="date" 
                    value={formData.nextDrawDate}
                    onChange={(e) => setFormData({...formData, nextDrawDate: e.target.value})}
                    className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Draw Summary / Results Text</label>
              <textarea 
                value={formData.recentResults}
                onChange={(e) => setFormData({...formData, recentResults: e.target.value})}
                rows={3}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none focus:ring-2 focus:ring-[#1E3A8A]/10 resize-none"
                placeholder="E.g. No winner this week. Two members matched 3 numbers..."
              />
            </div>
          </section>
        </div>

        {/* Media & Sidebar */}
        <div className="space-y-10">
          {/* Poster Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3">
              <ImageIcon size={20} className="text-amber-500" /> Weekly Poster
            </h3>
            
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 relative group">
              <ImageWithFallback 
                src={formData.poster} 
                alt="Lotto Poster" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                <p className="text-white text-xs font-black uppercase tracking-widest leading-relaxed">
                  Update image to display new results poster
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

          {/* App Link */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3">
              <ExternalLink size={16} className="text-amber-500" /> Lotto App Link
            </h3>
            <input 
              type="text" 
              value={formData.appLink}
              onChange={(e) => setFormData({...formData, appLink: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-medium text-xs text-gray-400 outline-none truncate"
            />
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
            {isSaving ? 'Updating...' : 'Save & Publish Lotto'}
          </button>
        </div>
      </form>
    </div>
  );
}
