import { motion } from 'motion/react';
import { Calendar, Trophy, MapPin, Clock, Archive, ArrowRight, Filter } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';
import { Link } from 'react-router';
import { fixtures, results } from '../data/fixtures-results';
import { cn } from '../components/ui/utils';

export function FixturesResultsPage() {
  // Today's date is Monday, April 20, 2026
  const today = new Date('2026-04-20');
  const nextWeek = new Date('2026-04-27');

  const upcomingWeekFixtures = fixtures.filter(fixture => {
    const fixtureDate = new Date(fixture.date);
    return fixtureDate >= today && fixtureDate <= nextWeek;
  });

  const sortedResults = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        {/* Hero Header */}
        <section className="club-hero-surface px-4 py-20 text-center sm:py-28">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Fixtures & <span className="text-amber-400">Results</span>
            </h1>
            <p className="text-blue-100/90 font-bold uppercase tracking-[0.2em] text-sm">
              Keep up with the Jocks
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 -mt-12 space-y-16">
          
          {/* Upcoming Fixtures (1 Week) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Calendar className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">This Week's Fixtures</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next 7 Days</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWeekFixtures.length > 0 ? (
                upcomingWeekFixtures.map((fixture, idx) => (
                  <motion.div
                    key={fixture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
                  >
                    <div className="p-1 bg-[#1E3A8A]" />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-[#1E3A8A] text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {fixture.competition}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-black">{fixture.time}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div className="text-center">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{fixture.team}</p>
                          <div className="flex items-center justify-center gap-4">
                            <span className="text-lg font-black text-[#1E3A8A] uppercase">Naomh Máirtín</span>
                            <span className="text-xs font-black text-amber-500 uppercase">VS</span>
                            <span className="text-lg font-black text-gray-800 uppercase">{fixture.opponent}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {fixture.venue}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(fixture.date).toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold italic">No fixtures scheduled for the next 7 days.</p>
                </div>
              )}
            </div>
          </section>

          {/* Recent Results (Continuously Growing List) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
                  <Trophy className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Recent Results</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Latest from the Field</p>
                </div>
              </div>
              <Link 
                to="/fixtures-archive" 
                className="flex items-center gap-2 text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest hover:text-amber-500 transition-colors group"
              >
                <Archive className="w-4 h-4 group-hover:scale-110 transition-transform" />
                View Archive
              </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {sortedResults.map((result, idx) => (
                  <motion.div 
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-3">
                        <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1">
                          {new Date(result.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-xs font-bold text-gray-400 truncate">{result.competition}</div>
                      </div>
                      
                      <div className="md:col-span-6">
                        <div className="flex items-center justify-between md:justify-center gap-4 md:gap-12">
                          <div className="flex-1 text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{result.team}</p>
                            <span className="text-lg font-black text-[#1E3A8A] uppercase truncate">Naomh Máirtín</span>
                          </div>
                          
                          <div className="flex flex-col items-center shrink-0">
                            <div className={cn(
                              "text-xl font-black px-4 py-2 rounded-xl border-2 flex items-center gap-2",
                              result.isWin ? "bg-blue-50 border-blue-100 text-[#1E3A8A]" : "bg-gray-50 border-gray-100 text-gray-400"
                            )}>
                              <span>{result.scoreFor}</span>
                              <span className="text-xs text-gray-300">-</span>
                              <span>{result.scoreAgainst}</span>
                            </div>
                          </div>

                          <div className="flex-1 text-left">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Opponent</p>
                            <span className="text-lg font-black text-gray-800 uppercase truncate">{result.opponent}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-3 flex justify-end">
                        <div className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                          result.isWin ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        )}>
                          {result.isWin ? 'Victory' : 'Full Time'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-8 bg-gray-50/50 border-t border-gray-100 text-center">
                <button className="inline-flex items-center gap-2 text-xs font-black text-[#1E3A8A] uppercase tracking-widest hover:text-amber-500 transition-colors">
                  <Filter className="w-4 h-4" />
                  Load More Results
                </button>
              </div>
            </div>
          </section>

          {/* Archive CTA */}
          <section className="bg-[#1E3A8A] rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-900/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 -translate-y-32" />
            <div className="p-10 md:p-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">Looking for past seasons?</h2>
                <p className="text-blue-100/70 max-w-xl">
                  Our comprehensive archive contains every fixture and result dating back to 2010. View league tables, historical scores, and championship progress.
                </p>
              </div>
              <Link 
                to="/fixtures-archive" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-amber-400 text-[#1E3A8A] font-black rounded-2xl hover:bg-amber-300 transition-all uppercase tracking-widest text-xs shrink-0"
              >
                Go to Archive
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
