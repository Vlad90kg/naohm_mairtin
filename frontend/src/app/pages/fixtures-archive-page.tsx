import { useEffect, useState } from 'react';
import { Archive, ChevronLeft, Search } from 'lucide-react';
import { Link } from 'react-router';
import { Footer } from '../components/footer';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { cn } from '../components/ui/utils';
import { fetchResults, type ApiResult } from '../data/fixtures-results-api';

function formatMatchDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString(
    'en-IE',
    options ?? { day: 'numeric', month: 'short', year: 'numeric' },
  );
}

export function FixturesArchivePage() {
  const [results, setResults] = useState<ApiResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
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

    const loadResults = async () => {
      try {
        const data = await fetchResults();
        if (!ignore) {
          setResults(data);
        }
      } catch (error) {
        console.error('Failed to load results archive:', error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadResults();

    return () => {
      ignore = true;
    };
  }, []);

  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const filteredResults = results
    .filter((result) => {
      // Only show results older than 30 days
      const isOlderThan30Days = new Date(result.date).getTime() < thirtyDaysAgo.getTime();
      if (!isOlderThan30Days) return false;

      const matchesCategory =
        categoryFilter === 'all' ||
        result.home_team.category === categoryFilter ||
        result.away_team.category === categoryFilter;

      const haystack = [
        result.home_team.name,
        result.away_team.name,
        result.competition,
        formatMatchDate(result.date),
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && haystack.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface px-4 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/fixtures-results"
              className="inline-flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase tracking-widest mb-8 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Fixtures & Results
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Results <span className="text-amber-400">Archive</span>
            </h1>
            <p className="text-blue-100/70 max-w-xl mx-auto">
              Browse recorded results, sorted by date, and narrow the list by team category or search term.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 -mt-12">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-4 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-gray-50 border-none rounded-xl px-6 py-3 text-xs font-black text-[#1E3A8A] uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Categories</option>
                <option value="adult">Adult</option>
                <option value="juvenile">Juvenile</option>
              </select>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search teams or competition..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-grow bg-gray-200" />
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Results</span>
              <div className="h-px flex-grow bg-gray-200" />
            </div>

            <div className="grid gap-4">
              {!isLoading && filteredResults.length > 0 ? (
                filteredResults.map((result) => {
                  const isExpanded = expandedResults.has(result.id);
                  return (
                    <div
                      key={result.id}
                      onClick={() => toggleExpand(result.id)}
                      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#1E3A8A]/20 transition-all cursor-pointer group/row"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-[#1E3A8A]">
                          <span className="text-[10px] font-black uppercase tracking-tighter">
                            {new Date(result.date).toLocaleDateString('en-IE', { month: 'short' })}
                          </span>
                          <span className="text-lg font-black leading-none">
                            {new Date(result.date).toLocaleDateString('en-IE', { day: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <h4 className={cn(
                            "font-black text-[#1E3A8A] uppercase tracking-tight transition-all duration-300",
                            isExpanded ? "whitespace-normal" : "truncate max-w-[200px] md:max-w-[400px]"
                          )}>
                            {result.home_team.name} vs {result.away_team.name}
                          </h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {result.competition} | {result.home_team.category_display}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{formatMatchDate(result.date)} | {result.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-xl font-black text-[#1E3A8A] tabular-nums">
                          {result.home_score} - {result.away_score}
                        </div>
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
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 font-bold italic">
                  {isLoading ? 'Loading results archive...' : 'No results matched the selected filters.'}
                </div>
              )}
            </div>

            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Archive className="w-8 h-8 text-[#1E3A8A]" />
              </div>
              <h3 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight mb-2">Need Older Records?</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
                The archive grows automatically as results are entered in Django admin, so staff no longer need to edit this page manually.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1E3A8A] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors"
              >
                Contact PRO
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
