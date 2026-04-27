import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Archive, ArrowRight, Calendar, Clock, MapPin, Trophy, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/footer';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { cn } from '../components/ui/utils';
import { fetchFixtures, fetchResults, fetchFixturesPageContent, type ApiFixture, type ApiResult, type ApiFixturesPageContent } from '../data/fixtures-results-api';

function formatMatchDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString(
    'en-IE',
    options ?? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' },
  );
}

function formatMatchTime(date: string) {
  return new Date(date).toLocaleTimeString('en-IE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function FixturesResultsPage() {
  const [fixtures, setFixtures] = useState<ApiFixture[]>([]);
  const [results, setResults] = useState<ApiResult[]>([]);
  const [content, setContent] = useState<ApiFixturesPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedResults((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const [fixturesResponse, resultsResponse, contentResponse] = await Promise.all([
          fetchFixtures(), 
          fetchResults(),
          fetchFixturesPageContent()
        ]);
        if (!ignore) {
          setFixtures(fixturesResponse);
          setResults(resultsResponse);
          setContent(contentResponse);
        }
      } catch (error) {
        console.error('Failed to load fixtures and results:', error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  // Fixtures are matches in the future that don't have a result yet
  const upcomingFixtures = fixtures
    .filter((fixture) => new Date(fixture.date).getTime() >= now.getTime() && !fixture.result)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Recent results are matches with results from the last 30 days
  const recentResults = results
    .filter((result) => new Date(result.date).getTime() >= thirtyDaysAgo.getTime())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#1E3A8A] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface px-4 py-20 text-center sm:py-28">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              {content?.hero_title.split('&')[0]} & <span className="text-amber-400">{content?.hero_title.split('&')[1] || 'Results'}</span>
            </h1>
            <p className="text-blue-100/90 font-bold uppercase tracking-[0.2em] text-sm">
              {content?.hero_subtitle}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 -mt-12 space-y-16">
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Calendar className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Upcoming Fixtures</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sorted By Date</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingFixtures.length > 0 ? (
                upcomingFixtures.map((fixture, idx) => (
                  <motion.div
                    key={fixture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
                  >
                    <div className="p-1 bg-[#1E3A8A]" />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <span className="px-3 py-1 bg-blue-50 text-[#1E3A8A] text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {fixture.competition}
                        </span>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {fixture.home_team.category_display}
                        </span>
                      </div>

                      <div className="space-y-4 mb-6 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <span className="text-lg font-black text-[#1E3A8A] uppercase text-center">{fixture.home_team.name}</span>
                          <span className="text-xs font-black text-amber-500 uppercase">VS</span>
                          <span className="text-lg font-black text-gray-800 uppercase text-center">{fixture.away_team.name}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-50 space-y-3 text-[11px] font-bold text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {formatMatchDate(fixture.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {formatMatchTime(fixture.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {fixture.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold italic">
                    No upcoming fixtures are currently available.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
                  <Trophy className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">Latest Results</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Most Recent Finals First</p>
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
                {recentResults.length > 0 ? (
                  recentResults.map((result, idx) => {
                    const isExpanded = expandedResults.has(result.id);
                    return (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => toggleExpand(result.id)}
                        className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors cursor-pointer group/row"
                      >
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-3">
                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1">
                              {formatMatchDate(result.date, { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-xs font-bold text-gray-400 truncate">{result.competition}</div>
                          </div>

                          <div className="md:col-span-6">
                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 lg:gap-12">
                              <div className="text-right min-w-0">
                                <span className={cn(
                                  "text-lg font-black text-[#1E3A8A] uppercase block transition-all duration-300",
                                  isExpanded ? "whitespace-normal" : "truncate"
                                )}>
                                  {result.home_team.name}
                                </span>
                              </div>

                              <div className="flex flex-col items-center shrink-0">
                                <div className="text-xl font-black px-4 py-2 rounded-xl border-2 bg-blue-50 border-blue-100 text-[#1E3A8A] flex items-center gap-2 tabular-nums">
                                  <span>{result.home_score}</span>
                                  <span className="text-xs text-gray-300">-</span>
                                  <span>{result.away_score}</span>
                                </div>
                              </div>

                              <div className="text-left min-w-0">
                                <span className={cn(
                                  "text-lg font-black text-gray-800 uppercase block transition-all duration-300",
                                  isExpanded ? "whitespace-normal" : "truncate"
                                )}>
                                  {result.away_team.name}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-3 flex justify-end">
                            <div
                              className={cn(
                                'px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest',
                                result.status === 'final' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500',
                              )}
                            >
                              {result.status_display}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center text-gray-400 font-bold italic">
                    No results are currently available.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-[#1E3A8A] rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-900/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 -translate-y-32" />
            <div className="p-10 md:p-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">Need the full results archive?</h2>
                <p className="text-blue-100/70 max-w-xl">
                  Browse all recorded match results and use the built-in filters to find a specific team or category quickly.
                </p>
              </div>
              <Link
                to="/fixtures-archive"
                className="inline-flex items-center gap-3 px-10 py-5 bg-amber-400 text-[#1E3A8A] font-black rounded-2xl hover:bg-amber-300 transition-all uppercase tracking-widest text-xs shrink-0"
              >
                View Results Archive
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
