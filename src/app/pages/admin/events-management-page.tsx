import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  MapPin, 
  Clock, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useCMS, type Event } from '../../data/cms-context';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { MediaUploadButton } from '../../components/admin/media-upload-button';

export function EventsManagementPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useCMS();
  const [isEditing, setIsEditing] = useState<Event | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateEvent(isEditing.id, isEditing);
      setIsEditing(null);
    } else if (isAdding) {
      addEvent(isAdding as any);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Controls */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Manage Events</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">Announce club meetings, camps, and fundraisers.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#1E3A8A]/20 focus:outline-none w-full sm:w-64 transition-all"
            />
          </div>
          <button 
            onClick={() => setIsAdding({ title: '', date: '', location: '', description: '', image: '' } as any)}
            className="px-6 py-3.5 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
          >
            <Plus size={16} /> Add Event
          </button>
        </div>
      </section>

      {/* Events Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="group hover:bg-gray-50/80 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <ImageWithFallback 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#1E3A8A] uppercase tracking-tight text-sm leading-tight">{event.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium line-clamp-1 mt-1">{event.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <Calendar size={14} className="text-amber-500" />
                      {new Date(event.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <MapPin size={14} className="text-blue-500" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setIsEditing(event)}
                        className="p-3 bg-blue-50 text-[#1E3A8A] rounded-xl hover:bg-[#1E3A8A] hover:text-white transition-all shadow-sm"
                        title="Edit Event"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteEvent(event.id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Delete Event"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="p-8 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Showing {filteredEvents.length} of {events.length} events
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 border border-[#1E3A8A] bg-[#1E3A8A] rounded-lg text-white shadow-lg">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Add / Edit */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="bg-[#1E3A8A] p-8 text-white relative">
              <button 
                onClick={() => { setIsEditing(null); setIsAdding(false); }}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                {isEditing ? 'Edit Event' : 'New Event'}
              </h3>
              <p className="text-blue-300 font-bold uppercase tracking-widest text-[10px] mt-1">Announcement & Logistics</p>
            </div>
            
            <form onSubmit={handleSave} className="p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Title</label>
                  <input 
                    type="text" 
                    value={isEditing?.title || isAdding?.title || ''}
                    onChange={(e) => {
                      if (isEditing) setIsEditing({...isEditing, title: e.target.value});
                      if (isAdding) setIsAdding({...isAdding, title: e.target.value} as any);
                    }}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                    placeholder="E.g. Summer Festival"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Date</label>
                  <input 
                    type="date" 
                    value={isEditing?.date || isAdding?.date || ''}
                    onChange={(e) => {
                      if (isEditing) setIsEditing({...isEditing, date: e.target.value});
                      if (isAdding) setIsAdding({...isAdding, date: e.target.value} as any);
                    }}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</label>
                  <input 
                    type="text" 
                    value={isEditing?.location || isAdding?.location || ''}
                    onChange={(e) => {
                      if (isEditing) setIsEditing({...isEditing, location: e.target.value});
                      if (isAdding) setIsAdding({...isAdding, location: e.target.value} as any);
                    }}
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                    placeholder="Clubhouse, Main Pitch, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Poster / Header Image URL</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={isEditing?.image || isAdding?.image || ''}
                      onChange={(e) => {
                        if (isEditing) setIsEditing({...isEditing, image: e.target.value});
                        if (isAdding) setIsAdding({...isAdding, image: e.target.value} as any);
                      }}
                      className="flex-grow px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none"
                    />
                    <MediaUploadButton
                      onSelect={(url) => {
                        if (isEditing) setIsEditing({ ...isEditing, image: url });
                        if (isAdding) setIsAdding({ ...isAdding, image: url } as any);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Description</label>
                <textarea 
                  value={isEditing?.description || isAdding?.description || ''}
                  onChange={(e) => {
                    if (isEditing) setIsEditing({...isEditing, description: e.target.value});
                    if (isAdding) setIsAdding({...isAdding, description: e.target.value} as any);
                  }}
                  rows={4}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none resize-none"
                  placeholder="Tell members about the event..."
                />
              </div>

              <div className="mt-12 flex gap-4 pt-4">
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
                  <Save size={16} /> {isEditing ? 'Update Event' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
