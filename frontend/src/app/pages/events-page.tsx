import { motion } from 'motion/react';
import { Clock, MapPin, ChevronRight, History } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { useCMS } from '../data/cms-context';

export function EventsPage() {
  const { events, pages } = useCMS();
  const content = pages.events;
  const [filter, setFilter] = useState('All');
  const excludedEventCategories = new Set(['matches', 'match', 'training']);

  const isExcludedCategory = (category?: string) =>
    excludedEventCategories.has((category ?? '').trim().toLowerCase());

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getDayName = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IE', { weekday: 'long' }).format(date);
    } catch (e) {
      return '';
    }
  };

  const getDateDetail = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IE', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const now = new Date();
  // Set time to start of day for comparison
  now.setHours(0, 0, 0, 0);

  const communityEvents = events.filter((event) => !isExcludedCategory(event.category));
  const upcomingEvents = communityEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = communityEvents.filter(e => new Date(e.date) < now);
  const eventFilters = ['All', ...Array.from(new Set(upcomingEvents.map((event) => event.category).filter(Boolean)))];

  const filteredEvents = filter === 'All' 
    ? upcomingEvents 
    : upcomingEvents.filter(e => e.category === filter);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      {/* Hero Section - Simplified with Club Colors */}
      <section className="club-hero-surface border-b-4 border-amber-400 px-4 py-20 text-center sm:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight"
          >
            {content.hero.title}
          </motion.h1>
          <p className="mt-4 text-blue-100 font-medium text-lg max-w-2xl mx-auto">{content.hero.subtitle}</p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12">
        
        {/* Simplified Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12">
          {eventFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-black uppercase tracking-wider transition-all ${
                filter === cat 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upcoming Events - Simplified Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                id={event.slug ?? String(event.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#1E3A8A] transition-colors group flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                    {event.category || 'Club Event'}
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">{getDayName(event.date)}</p>
                    <p className="text-sm font-black text-[#1E3A8A]">{getDateDetail(event.date)}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-[#1E3A8A] transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-1.5 mb-6">
                  {event.time && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                      <Clock size={14} className="text-amber-500" />
                      {event.time}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                    <MapPin size={14} className="text-amber-500" />
                    {event.location}
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 flex-grow">
                  {event.description}
                </p>

                <div className="pt-4 border-t border-gray-50">
                  <span className="text-xs font-black text-[#1E3A8A] flex items-center gap-1 group-hover:gap-2 transition-all">
                    MORE INFO <ChevronRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest">No events scheduled</p>
            </div>
          )}
        </section>

        {/* Past Events - Minimalist List */}
        <section className="pt-12 border-t border-gray-100">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">
            Recent Past Events
          </h2>
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <div 
                key={event.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#1E3A8A]">
                    <History size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm">{event.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{formatDate(event.date)} • {event.location}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase group-hover:text-gray-400 transition-colors">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
