import { motion } from 'motion/react';
import { Archive, Search, Filter, ChevronLeft, Calendar } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';
import { Link } from 'react-router';
import { results } from '../data/fixtures-results';
import { cn } from '../components/ui/utils';

export function FixturesArchivePage() {
  const years = ['2026', '2025', '2024', '2023', '2022'];
  const competitions = ['All Competitions', 'Senior League', 'Senior Championship', 'Junior League', 'Underage'];

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
              Back to Live Fixtures
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Historical <span className="text-amber-400">Archive</span>
            </h1>
            <p className="text-blue-100/70 max-w-xl mx-auto">
              Access every result and fixture from previous seasons. Filter by year, team, or competition.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 -mt-12">
          {/* Filters Bar */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-4 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <select className="bg-gray-50 border-none rounded-xl px-6 py-3 text-xs font-black text-[#1E3A8A] uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-100">
                {years.map(y => <option key={y} value={y}>{y} Season</option>)}
              </select>
              <select className="bg-gray-50 border-none rounded-xl px-6 py-3 text-xs font-black text-[#1E3A8A] uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-100">
                {competitions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search teams or dates..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Archive List Placeholder */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-grow bg-gray-200" />
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Season 2026</span>
              <div className="h-px flex-grow bg-gray-200" />
            </div>

            <div className="grid gap-4">
              {results.map((result, idx) => (
                <div 
                  key={result.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#1E3A8A]/20 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-[#1E3A8A]">
                      <span className="text-[10px] font-black uppercase tracking-tighter">Apr</span>
                      <span className="text-lg font-black leading-none">{12 - idx}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-[#1E3A8A] uppercase tracking-tight">{result.team} vs {result.opponent}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{result.competition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-xl font-black text-[#1E3A8A]">
                      {result.scoreFor} - {result.scoreAgainst}
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      result.isWin ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {result.isWin ? 'Win' : 'Loss/Draw'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Archive className="w-8 h-8 text-[#1E3A8A]" />
              </div>
              <h3 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight mb-2">Access Older Records</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
                Data prior to 2022 is stored in our legacy system. Please contact the club PRO for specific historical queries.
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
