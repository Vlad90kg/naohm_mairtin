import { motion } from 'motion/react';
import { Clock, MapPin, ChevronRight, History } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Senior Football Championship: Round 3",
    date: "Saturday, April 12, 2026",
    time: "7:30 PM",
    location: "Pairc Naomh Mairtin",
    category: "Matches",
    description: "Naomh Mairtin vs St. Mary's. Come out and support the lads!",
    image: "https://images.unsplash.com/photo-1529900948638-21f99c10d16a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Annual Club Lotto Draw & Social",
    date: "Friday, April 18, 2026",
    time: "8:00 PM",
    location: "Clubhouse Bar",
    category: "Club Events",
    description: "Join us for the big monthly draw. Live music and refreshments provided.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "U14 Juvenile Training Camp",
    date: "Mon-Wed, April 20-22, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Main Pitch & Astro",
    category: "Training",
    description: "Easter skills camp for all U14 boys and girls. Registration required.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Table Quiz Fundraiser",
    date: "Saturday, May 2, 2026",
    time: "8:30 PM",
    location: "Monasterboice Inn",
    category: "Club Events",
    description: "Support our new clubhouse development fund. Teams of 4 - €40 per table.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  }
];

const PAST_EVENTS = [
  {
    id: 101,
    title: "St. Patrick's Day Parade",
    date: "March 17, 2026",
    location: "Drogheda Town Centre",
    category: "Club Events"
  },
  {
    id: 102,
    title: "Junior B League vs O'Connells",
    date: "March 15, 2026",
    location: "Castlebellingham",
    category: "Matches"
  },
  {
    id: 103,
    title: "Club Clean-up Day",
    date: "March 8, 2026",
    location: "Sillogue Lane Grounds",
    category: "Club Events"
  }
];

export function EventsPage() {
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All' 
    ? UPCOMING_EVENTS 
    : UPCOMING_EVENTS.filter(e => e.category === filter);

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
            Club Events
          </motion.h1>
          <p className="mt-4 text-blue-100 font-medium text-lg max-w-2xl mx-auto">Fixtures, meetings, and social gatherings.</p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12">
        
        {/* Simplified Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12">
          {['All', 'Matches', 'Club Events', 'Training'].map((cat) => (
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#1E3A8A] transition-colors group flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                    {event.category}
                  </span>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">{event.date.split(',')[0]}</p>
                    <p className="text-sm font-black text-[#1E3A8A]">{event.date.split(',')[1] || event.date}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-[#1E3A8A] transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                    <Clock size={14} className="text-amber-500" />
                    {event.time}
                  </div>
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
            {PAST_EVENTS.map((event) => (
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
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{event.date} • {event.location}</p>
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
