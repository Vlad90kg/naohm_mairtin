import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Ticket, Trophy, Calendar, ExternalLink, ChevronRight, Star } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';
import { fetchLottoPageContent, type ApiLottoPageContent } from '../data/lotto-api';

const DEFAULT_LOTTO_PAGE: ApiLottoPageContent = {
  hero_eyebrow: 'Weekly Club Lotto',
  hero_title: 'Club',
  hero_highlight: 'Lotto',
  hero_description:
    'Play the Naomh Mairtin CPG weekly lotto and support your club. Every ticket helps fund our teams, facilities, and community.',
  jackpot_label: 'Current Jackpot',
  jackpot_amount: 'EUR8,500',
  next_draw_label: 'Draw',
  next_draw_date: 'Every Monday Night',
  buy_tickets_url: 'https://member.clubspot.app/club/naomh-mairtin-gaa/fundraisers',
  buy_tickets_text: 'Buy Lotto Tickets Online',
  app_download_url: 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
  app_download_text: 'Download ClubSpot App',
  helper_text: 'Online purchase is the quickest option. App download remains available below as a secondary action.',
  latest_results_title: 'Latest Draw Results',
  latest_draw_date: 'Monday 24th March 2025',
  winning_numbers: [7, 14, 21, 28],
  jackpot_won: false,
  latest_jackpot_amount: 'EUR8,500',
  winners_section_title: 'Prize Winners',
  winners: [],
  how_it_works_title: 'How the Lotto Works',
  bottom_cta_title: 'Support Your Club - Play the Lotto',
  bottom_cta_description:
    'Every ticket purchased goes directly back into Naomh Mairtin CPG. Your support keeps our club, pitches, and community programmes running.',
};

export function LottoPage() {
  const [pageContent, setPageContent] = useState<ApiLottoPageContent>(DEFAULT_LOTTO_PAGE);

  useEffect(() => {
    fetchLottoPageContent()
      .then(setPageContent)
      .catch((error) => {
        console.error('Failed to load lotto page content:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <section className="club-hero-surface relative overflow-hidden px-4 py-20 text-center sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.15),_transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-amber-400/30"
          >
            <Ticket size={14} />
            {pageContent.hero_eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none"
          >
            {pageContent.hero_title} <span className="text-amber-400">{pageContent.hero_highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100/80 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10"
          >
            {pageContent.hero_description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-10 py-6 mb-10"
          >
            <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1">{pageContent.jackpot_label}</p>
            <p className="text-5xl md:text-7xl font-black text-amber-400 tracking-tighter">{pageContent.jackpot_amount}</p>
            <p className="text-blue-300 text-xs font-bold mt-2 uppercase tracking-wider flex items-center justify-center gap-1">
              <Calendar size={12} /> {pageContent.next_draw_label}: {pageContent.next_draw_date}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="mx-auto max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-3 backdrop-blur-md shadow-2xl shadow-slate-950/20">
              <div className="flex flex-col gap-3">
                <a
                  href={pageContent.buy_tickets_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-amber-400 text-[#1E3A8A] font-black rounded-2xl hover:bg-amber-300 transition-all shadow-xl shadow-amber-900/20 uppercase tracking-wider text-base hover:-translate-y-0.5"
                >
                  <Ticket size={20} />
                  {pageContent.buy_tickets_text}
                  <ChevronRight size={18} />
                </a>
                <a
                  href={pageContent.app_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-white/30 bg-transparent text-white font-black uppercase tracking-wider text-sm hover:bg-white/8 transition-colors"
                >
                  <ExternalLink size={18} />
                  {pageContent.app_download_text}
                </a>
              </div>
            </div>
            <p className="text-blue-200/80 text-sm mt-5 font-medium">{pageContent.helper_text}</p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 6C120 12 240 24 360 28C480 32 600 28 720 26C840 24 960 24 1080 28C1200 32 1320 40 1380 44L1440 48V60H0V0Z" fill="rgb(249,250,251)" />
          </svg>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-14 space-y-14">
        <section className="max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">{pageContent.latest_results_title}</h2>
              <p className="text-gray-500 text-sm font-medium">{pageContent.latest_draw_date}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
            <div className="mb-8">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Numbers Drawn</p>
              <div className="flex flex-wrap gap-4">
                {pageContent.winning_numbers.map((num) => (
                  <div key={num} className="w-14 h-14 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shadow-lg">
                    <span className="text-xl font-black">{num}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider mb-8 ${
              pageContent.jackpot_won ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <Star size={14} />
              {pageContent.jackpot_won
                ? `Jackpot Won! - ${pageContent.latest_jackpot_amount}`
                : `Jackpot Not Won - Rolls to ${pageContent.latest_jackpot_amount}`}
            </div>

            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{pageContent.winners_section_title}</p>
              <div className="space-y-3">
                {pageContent.winners.map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <p className="font-black text-[#1E3A8A] text-sm">{w.prize}</p>
                      <p className="text-gray-500 text-xs font-medium mt-0.5">{w.winner}</p>
                    </div>
                    <span className="font-black text-amber-500 text-lg">{w.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight mb-8">{pageContent.how_it_works_title}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Buy Your Ticket', desc: 'Purchase tickets online via the ClubSpot app or from a club member. Each ticket costs just EUR2.' },
              { num: '2', title: 'Pick 4 Numbers', desc: 'Choose 4 numbers from 1-34 or take a lucky dip. Draws take place every Monday night.' },
              { num: '3', title: 'Win Prizes', desc: 'Match all 4 numbers to win the jackpot. Prizes also for 3 matching numbers and lucky dips.' },
            ].map((s) => (
              <div key={s.num} className="flex gap-4">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1E3A8A] font-black text-lg">{s.num}</span>
                </div>
                <div>
                  <h3 className="font-black text-[#1E3A8A] mb-1 uppercase tracking-tight">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="bg-[#1E3A8A] py-16 px-4 mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">{pageContent.bottom_cta_title}</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">{pageContent.bottom_cta_description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={pageContent.buy_tickets_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-amber-400 text-[#1E3A8A] font-black rounded-2xl hover:bg-amber-300 transition-all shadow-xl uppercase tracking-wider"
            >
              <Ticket size={18} />
              {pageContent.buy_tickets_text}
              <ExternalLink size={16} />
            </a>
            <a
              href={pageContent.app_download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-blue-200/40 text-white font-black uppercase tracking-wider hover:bg-white/8 transition-colors"
            >
              <ExternalLink size={16} />
              {pageContent.app_download_text}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
