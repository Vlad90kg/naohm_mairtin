import React, { useState } from 'react';
import { 
  Save, 
  Home, 
  Mail, 
  ShieldCheck, 
  Image as ImageIcon,
  RefreshCw,
  ExternalLink,
  MapPin,
  ChevronRight,
  User,
  Files,
  Plus,
  Trash2,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Video,
  ListOrdered
} from 'lucide-react';
import { useCMS, type PageContent } from '../../data/cms-context';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { MediaUploadButton } from '../../components/admin/media-upload-button';

export function PagesManagementPage() {
  const { pages, updatePageContent } = useCMS();
  const [formData, setFormData] = useState<PageContent>(pages);
  const [activeTab, setActiveTab] = useState<'Home' | 'Contact' | 'Child Safety' | 'Facilities'>('Home');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      // Logic for saving based on activeTab
      if (activeTab === 'Home') updatePageContent('home', formData.home);
      if (activeTab === 'Contact') updatePageContent('contact', formData.contact);
      if (activeTab === 'Child Safety') updatePageContent('childSafety', formData.childSafety);
      if (activeTab === 'Facilities') updatePageContent('facilities', formData.facilities);
      setIsSaving(false);
      toast.success(`${activeTab} page content updated!`);
    }, 800);
  };

  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Contact', icon: Mail },
    { name: 'Child Safety', icon: ShieldCheck },
    { name: 'Facilities', icon: ImageIcon },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Static Content Management</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Easily edit hero text, contact details, and safety officer info.</p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Tab Selection */}
        <aside className="lg:w-72 flex-shrink-0 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name as any)}
              className={`w-full flex items-center justify-between p-5 rounded-[1.5rem] border transition-all duration-300 group ${
                activeTab === tab.name 
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xl shadow-blue-900/10' 
                  : 'bg-white text-[#1E3A8A] border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${activeTab === tab.name ? 'bg-white/10' : 'bg-blue-50'}`}>
                  <tab.icon size={18} className={activeTab === tab.name ? 'text-amber-400' : 'text-[#1E3A8A]'} />
                </div>
                <span className="font-black uppercase tracking-widest text-[10px]">{tab.name}</span>
              </div>
              <ChevronRight size={16} className={activeTab === tab.name ? 'text-white/50' : 'text-gray-200 group-hover:text-[#1E3A8A]'} />
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-grow">
          <form onSubmit={handleSave} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
              <h3 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3">
                {tabs.find(t => t.name === activeTab)?.icon && React.createElement(tabs.find(t => t.name === activeTab)!.icon, { size: 24, className: 'text-amber-500' })}
                Edit {activeTab} Page
              </h3>
              <button 
                type="submit"
                disabled={isSaving}
                className="px-8 py-3.5 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center gap-2 group disabled:opacity-70"
              >
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} className="group-hover:scale-110 transition-transform" />}
                {isSaving ? 'Updating...' : 'Publish Changes'}
              </button>
            </div>

            <div className="space-y-10 animate-in fade-in slide-in-from-right-2 duration-300">
              {activeTab === 'Home' && (
                <div className="space-y-10">
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <Home size={18} className="text-amber-500" /> Hero Section
                    </h4>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                        <input
                          type="text"
                          value={formData.home.hero.title}
                          onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, title: e.target.value}}})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-[#1E3A8A] text-xl outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle</label>
                        <textarea
                          value={formData.home.hero.subtitle}
                          onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, subtitle: e.target.value}}})}
                          rows={3}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Button Text</label>
                          <input
                            type="text"
                            value={formData.home.hero.primaryButtonText}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, primaryButtonText: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Button Link</label>
                          <input
                            type="text"
                            value={formData.home.hero.primaryButtonLink}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, primaryButtonLink: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secondary Button Text</label>
                          <input
                            type="text"
                            value={formData.home.hero.secondaryButtonText}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, secondaryButtonText: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secondary Button Link</label>
                          <input
                            type="text"
                            value={formData.home.hero.secondaryButtonLink}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, secondaryButtonLink: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Background Image</label>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={formData.home.hero.backgroundImage}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, hero: {...formData.home.hero, backgroundImage: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 outline-none"
                          />
                          <MediaUploadButton
                            onSelect={(url) => setFormData({
                              ...formData,
                              home: {
                                ...formData.home,
                                hero: {
                                  ...formData.home.hero,
                                  backgroundImage: url,
                                },
                              },
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <Files size={18} className="text-amber-500" /> Featured Announcement
                    </h4>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                        <input
                          type="text"
                          value={formData.home.featuredAnnouncement.title}
                          onChange={(e) => setFormData({...formData, home: {...formData.home, featuredAnnouncement: {...formData.home.featuredAnnouncement, title: e.target.value}}})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                        <textarea
                          value={formData.home.featuredAnnouncement.description}
                          onChange={(e) => setFormData({...formData, home: {...formData.home, featuredAnnouncement: {...formData.home.featuredAnnouncement, description: e.target.value}}})}
                          rows={3}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Text</label>
                          <input
                            type="text"
                            value={formData.home.featuredAnnouncement.buttonText}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, featuredAnnouncement: {...formData.home.featuredAnnouncement, buttonText: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Link</label>
                          <input
                            type="text"
                            value={formData.home.featuredAnnouncement.buttonLink}
                            onChange={(e) => setFormData({...formData, home: {...formData.home, featuredAnnouncement: {...formData.home.featuredAnnouncement, buttonLink: e.target.value}}})}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <ListOrdered size={18} className="text-amber-500" /> Page Sections
                    </h4>
                    {(['sponsors', 'shops', 'events', 'teams'] as const).map((sectionKey) => (
                      <div key={sectionKey} className="grid lg:grid-cols-[0.9fr_1.4fr_0.7fr] gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 items-end">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enabled</label>
                          <label className="flex items-center gap-3 px-4 py-4 bg-white rounded-2xl border border-gray-100">
                            <input
                              type="checkbox"
                              checked={formData.home.sections[sectionKey].enabled}
                              onChange={(e) => setFormData({
                                ...formData,
                                home: {
                                  ...formData.home,
                                  sections: {
                                    ...formData.home.sections,
                                    [sectionKey]: {
                                      ...formData.home.sections[sectionKey],
                                      enabled: e.target.checked,
                                    },
                                  },
                                },
                              })}
                            />
                            <span className="font-bold text-gray-700 capitalize">{sectionKey}</span>
                          </label>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section Title</label>
                          <input
                            type="text"
                            value={formData.home.sections[sectionKey].sectionTitle}
                            onChange={(e) => setFormData({
                              ...formData,
                              home: {
                                ...formData.home,
                                sections: {
                                  ...formData.home.sections,
                                  [sectionKey]: {
                                    ...formData.home.sections[sectionKey],
                                    sectionTitle: e.target.value,
                                  },
                                },
                              },
                            })}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Items Limit</label>
                          <input
                            type="number"
                            min={1}
                            value={formData.home.sections[sectionKey].itemsLimit}
                            onChange={(e) => setFormData({
                              ...formData,
                              home: {
                                ...formData.home,
                                sections: {
                                  ...formData.home.sections,
                                  [sectionKey]: {
                                    ...formData.home.sections[sectionKey],
                                    itemsLimit: Number(e.target.value),
                                  },
                                },
                              },
                            })}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Contact' && (
                <div className="grid gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Club Secretary Email</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" />
                        <input 
                          type="email" 
                          value={formData.contact.email}
                          onChange={(e) => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Physical Address</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" />
                        <input 
                          type="text" 
                          value={formData.contact.address}
                          onChange={(e) => setFormData({...formData, contact: {...formData.contact, address: e.target.value}})}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Google Maps Embed/Share Link</label>
                    <input 
                      type="url" 
                      value={formData.contact.mapLink}
                      onChange={(e) => setFormData({...formData, contact: {...formData.contact, mapLink: e.target.value}})}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-blue-600 text-xs outline-none focus:ring-2 focus:ring-[#1E3A8A]/10"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'Child Safety' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-2 duration-300">
                  {/* Hero Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={18} className="text-amber-500" /> 1. Hero Section
                    </h4>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Title</label>
                        <input 
                          type="text" 
                          value={formData.childSafety.hero.title}
                          onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, hero: {...formData.childSafety.hero, title: e.target.value}}})}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-black text-[#1E3A8A] outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle</label>
                        <textarea 
                          value={formData.childSafety.hero.subtitle}
                          onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, hero: {...formData.childSafety.hero, subtitle: e.target.value}}})}
                          rows={2}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Commitment Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={18} className="text-amber-500" /> 2. Safeguarding Commitment
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Commitment Text</label>
                      <textarea 
                        value={formData.childSafety.commitment}
                        onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, commitment: e.target.value}})}
                        rows={4}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Contacts Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                        <User size={18} className="text-amber-500" /> 3. Safeguarding Contacts
                      </h4>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...formData.childSafety.contacts, { id: Date.now().toString(), name: '', role: '', description: '', email: '', phone: '' }];
                          setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                        }}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2"
                      >
                        <Plus size={14} /> Add Contact
                      </button>
                    </div>
                    <div className="space-y-6">
                      {formData.childSafety.contacts.map((contact, idx) => (
                        <div key={contact.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-6 relative group/item">
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = formData.childSafety.contacts.filter((_, i) => i !== idx);
                              setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                            }}
                            className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Name</label>
                              <input 
                                type="text" 
                                value={contact.name}
                                onChange={(e) => {
                                  const updated = [...formData.childSafety.contacts];
                                  updated[idx] = { ...contact, name: e.target.value };
                                  setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                                }}
                                className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-sm outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Role</label>
                              <input 
                                type="text" 
                                value={contact.role}
                                onChange={(e) => {
                                  const updated = [...formData.childSafety.contacts];
                                  updated[idx] = { ...contact, role: e.target.value };
                                  setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                                }}
                                className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-sm outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Short Description</label>
                            <input 
                              type="text" 
                              value={contact.description}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.contacts];
                                updated[idx] = { ...contact, description: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-medium text-gray-600 text-sm outline-none"
                            />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                              <input 
                                type="email" 
                                value={contact.email}
                                onChange={(e) => {
                                  const updated = [...formData.childSafety.contacts];
                                  updated[idx] = { ...contact, email: e.target.value };
                                  setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                                }}
                                className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-medium text-blue-600 text-xs outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                              <input 
                                type="text" 
                                value={contact.phone}
                                onChange={(e) => {
                                  const updated = [...formData.childSafety.contacts];
                                  updated[idx] = { ...contact, phone: e.target.value };
                                  setFormData({...formData, childSafety: {...formData.childSafety, contacts: updated}});
                                }}
                                className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-[#1E3A8A] text-sm outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Policies Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                        <FileCheck size={18} className="text-amber-500" /> 4. Policies & Documents
                      </h4>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...formData.childSafety.documents, { id: Date.now().toString(), title: '', fileUrl: '', date: new Date().toISOString().split('T')[0] }];
                          setFormData({...formData, childSafety: {...formData.childSafety, documents: updated}});
                        }}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2"
                      >
                        <Plus size={14} /> Add Document
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.childSafety.documents.map((doc, idx) => (
                        <div key={doc.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-end gap-6 relative">
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = formData.childSafety.documents.filter((_, i) => i !== idx);
                              setFormData({...formData, childSafety: {...formData.childSafety, documents: updated}});
                            }}
                            className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="flex-grow space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Document Title</label>
                            <input 
                              type="text" 
                              value={doc.title}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.documents];
                                updated[idx] = { ...doc, title: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, documents: updated}});
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-sm outline-none"
                              placeholder="e.g. Safeguarding Statement"
                            />
                          </div>
                          <div className="sm:w-48 space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">URL / PDF Link</label>
                            <input 
                              type="text" 
                              value={doc.fileUrl}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.documents];
                                updated[idx] = { ...doc, fileUrl: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, documents: updated}});
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-medium text-blue-600 text-xs outline-none"
                            />
                          </div>
                          <div className="sm:w-32 space-y-2">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Issue Date</label>
                            <input 
                              type="date" 
                              value={doc.date}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.documents];
                                updated[idx] = { ...doc, date: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, documents: updated}});
                              }}
                              className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-xs outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-8">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <ChevronRight size={18} className="text-amber-500" /> 5. Process Steps
                    </h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      {formData.childSafety.steps.map((step, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-[#1E3A8A] text-white rounded-lg flex items-center justify-center font-black text-sm">{idx + 1}</div>
                            <div className="flex-grow space-y-1">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Step Title</label>
                              <input 
                                type="text" 
                                value={step.title}
                                onChange={(e) => {
                                  const updated = [...formData.childSafety.steps];
                                  updated[idx] = { ...step, title: e.target.value };
                                  setFormData({...formData, childSafety: {...formData.childSafety, steps: updated}});
                                }}
                                className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-sm outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Brief Description</label>
                            <textarea 
                              value={step.description}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.steps];
                                updated[idx] = { ...step, description: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, steps: updated}});
                              }}
                              rows={2}
                              className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-medium text-gray-600 text-sm outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Helplines */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                        <HelpCircle size={18} className="text-amber-500" /> 6. External Helplines
                      </h4>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...formData.childSafety.helplines, { name: '', phone: '' }];
                          setFormData({...formData, childSafety: {...formData.childSafety, helplines: updated}});
                        }}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2"
                      >
                        <Plus size={14} /> Add Helpline
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {formData.childSafety.helplines.map((line, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = formData.childSafety.helplines.filter((_, i) => i !== idx);
                              setFormData({...formData, childSafety: {...formData.childSafety, helplines: updated}});
                            }}
                            className="absolute top-2 right-2 text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={12} />
                          </button>
                          <div className="space-y-3">
                            <input 
                              type="text" 
                              value={line.name}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.helplines];
                                updated[idx] = { ...line, name: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, helplines: updated}});
                              }}
                              className="w-full bg-transparent font-black text-[#1E3A8A] uppercase tracking-tight text-xs outline-none border-b border-gray-200 focus:border-[#1E3A8A] pb-1"
                              placeholder="Entity Name"
                            />
                            <input 
                              type="text" 
                              value={line.phone}
                              onChange={(e) => {
                                const updated = [...formData.childSafety.helplines];
                                updated[idx] = { ...line, phone: e.target.value };
                                setFormData({...formData, childSafety: {...formData.childSafety, helplines: updated}});
                              }}
                              className="w-full bg-transparent font-bold text-gray-500 text-xs outline-none"
                              placeholder="Contact Number"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-8 bg-blue-50/50">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <ExternalLink size={18} className="text-amber-500" /> 7. CTA Section
                    </h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CTA Title</label>
                          <input 
                            type="text" 
                            value={formData.childSafety.cta.title}
                            onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, cta: {...formData.childSafety.cta, title: e.target.value}}})}
                            className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-black text-[#1E3A8A] outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CTA Description</label>
                          <textarea 
                            value={formData.childSafety.cta.description}
                            onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, cta: {...formData.childSafety.cta, description: e.target.value}}})}
                            rows={3}
                            className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Text</label>
                          <input 
                            type="text" 
                            value={formData.childSafety.cta.buttonText}
                            onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, cta: {...formData.childSafety.cta, buttonText: e.target.value}}})}
                            className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-amber-600 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Link</label>
                          <input 
                            type="text" 
                            value={formData.childSafety.cta.buttonLink}
                            onChange={(e) => setFormData({...formData, childSafety: {...formData.childSafety, cta: {...formData.childSafety.cta, buttonLink: e.target.value}}})}
                            className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-medium text-blue-600 text-xs outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Facilities' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-2 duration-300">
                  {/* Hero Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={18} className="text-amber-500" /> 1. Hero Section
                    </h4>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Page Description</label>
                        <textarea 
                          value={formData.facilities.hero.description}
                          onChange={(e) => setFormData({...formData, facilities: {...formData.facilities, hero: {...formData.facilities.hero, description: e.target.value}}})}
                          rows={3}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none leading-relaxed"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location Label</label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" />
                          <input 
                            type="text" 
                            value={formData.facilities.hero.locationLabel}
                            onChange={(e) => setFormData({...formData, facilities: {...formData.facilities, hero: {...formData.facilities.hero, locationLabel: e.target.value}}})}
                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Media Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-8 bg-blue-50/30">
                    <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                      <Video size={18} className="text-amber-500" /> 2. Hero Media
                    </h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Media Type</label>
                          <div className="flex gap-4">
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, facilities: {...formData.facilities, media: {...formData.facilities.media, type: 'video'}}})}
                              className={`flex-1 py-3 px-4 rounded-xl font-black uppercase tracking-widest text-[10px] border-2 transition-all ${formData.facilities.media.type === 'video' ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-white text-gray-400 border-gray-100'}`}
                            >
                              Video
                            </button>
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, facilities: {...formData.facilities, media: {...formData.facilities.media, type: 'image'}}})}
                              className={`flex-1 py-3 px-4 rounded-xl font-black uppercase tracking-widest text-[10px] border-2 transition-all ${formData.facilities.media.type === 'image' ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-white text-gray-400 border-gray-100'}`}
                            >
                              Image
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{formData.facilities.media.type === 'video' ? 'Video URL' : 'Image URL'}</label>
                          <div className="flex gap-4">
                            <input 
                              type="text" 
                              value={formData.facilities.media.url}
                              onChange={(e) => setFormData({...formData, facilities: {...formData.facilities, media: {...formData.facilities.media, url: e.target.value}}})}
                              className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-medium text-blue-600 text-xs outline-none"
                              placeholder={formData.facilities.media.type === 'video' ? 'https://example.com/video.mp4' : 'https://images.unsplash.com/...'}
                            />
                            <MediaUploadButton
                              accept={formData.facilities.media.type === 'video' ? 'video/*' : 'image/*'}
                              onSelect={(url) => setFormData({
                                ...formData,
                                facilities: {
                                  ...formData.facilities,
                                  media: {
                                    ...formData.facilities.media,
                                    url,
                                  },
                                },
                              })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Media Title</label>
                          <input 
                            type="text" 
                            value={formData.facilities.media.title}
                            onChange={(e) => setFormData({...formData, facilities: {...formData.facilities, media: {...formData.facilities.media, title: e.target.value}}})}
                            className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-black text-[#1E3A8A] outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Media Description</label>
                          <textarea 
                            value={formData.facilities.media.description}
                            onChange={(e) => setFormData({...formData, facilities: {...formData.facilities, media: {...formData.facilities.media, description: e.target.value}}})}
                            rows={3}
                            className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl font-medium text-gray-600 outline-none resize-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Facilities List Section */}
                  <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest flex items-center gap-2">
                        <ListOrdered size={18} className="text-amber-500" /> 3. Facilities List
                      </h4>
                      <button 
                        type="button"
                        onClick={() => {
                          const updated = [...formData.facilities.list, { id: Date.now().toString(), title: '', description: '', image: '', icon: 'building', order: formData.facilities.list.length + 1 }];
                          setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                        }}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2"
                      >
                        <Plus size={14} /> Add Facility
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                      {formData.facilities.list.sort((a,b) => (a.order||0) - (b.order||0)).map((facility) => (
                        <div key={facility.id} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6 relative group/item">
                          <button 
                            type="button"
                            onClick={() => {
                              const updated = formData.facilities.list.filter(f => f.id !== facility.id);
                              setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                            }}
                            className="absolute top-6 right-6 text-red-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                          
                          <div className="grid md:grid-cols-12 gap-8">
                            {/* Preview/Image Side */}
                            <div className="md:col-span-4 space-y-4">
                              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-sm bg-gray-200">
                                <ImageWithFallback 
                                  src={facility.image} 
                                  alt={facility.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Image URL</label>
                                <div className="flex gap-3">
                                  <input 
                                    type="text" 
                                    value={facility.image}
                                    onChange={(e) => {
                                      const updated = [...formData.facilities.list];
                                      const index = updated.findIndex(f => f.id === facility.id);
                                      updated[index] = { ...facility, image: e.target.value };
                                      setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                                    }}
                                    className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl font-medium text-blue-600 text-[10px] outline-none"
                                  />
                                  <MediaUploadButton
                                    className="px-3 py-2 text-[9px]"
                                    onSelect={(url) => {
                                      const updated = [...formData.facilities.list];
                                      const index = updated.findIndex(f => f.id === facility.id);
                                      updated[index] = { ...facility, image: url };
                                      setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Content Side */}
                            <div className="md:col-span-8 space-y-6">
                              <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Facility Title</label>
                                  <input 
                                    type="text" 
                                    value={facility.title}
                                    onChange={(e) => {
                                      const updated = [...formData.facilities.list];
                                      const index = updated.findIndex(f => f.id === facility.id);
                                      updated[index] = { ...facility, title: e.target.value };
                                      setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                                    }}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-sm outline-none"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Icon</label>
                                  <select 
                                    value={facility.icon}
                                    onChange={(e) => {
                                      const updated = [...formData.facilities.list];
                                      const index = updated.findIndex(f => f.id === facility.id);
                                      updated[index] = { ...facility, icon: e.target.value };
                                      setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                                    }}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-gray-800 text-sm outline-none appearance-none"
                                  >
                                    <option value="trophy">Trophy</option>
                                    <option value="dumbbell">Dumbbell</option>
                                    <option value="coffee">Coffee</option>
                                    <option value="building">Building</option>
                                    <option value="trees">Trees</option>
                                    <option value="activity">Activity</option>
                                  </select>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                <textarea 
                                  value={facility.description}
                                  onChange={(e) => {
                                    const updated = [...formData.facilities.list];
                                    const index = updated.findIndex(f => f.id === facility.id);
                                    updated[index] = { ...facility, description: e.target.value };
                                    setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                                  }}
                                  rows={3}
                                  className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl font-medium text-gray-600 text-sm outline-none resize-none leading-relaxed"
                                />
                              </div>
                              
                              <div className="space-y-2 sm:w-24">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Display Order</label>
                                <input 
                                  type="number" 
                                  value={facility.order}
                                  onChange={(e) => {
                                    const updated = [...formData.facilities.list];
                                    const index = updated.findIndex(f => f.id === facility.id);
                                    updated[index] = { ...facility, order: parseInt(e.target.value) || 0 };
                                    setFormData({...formData, facilities: {...formData.facilities, list: updated}});
                                  }}
                                  className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl font-black text-[#1E3A8A] text-center outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
