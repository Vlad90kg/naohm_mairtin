import { motion } from 'motion/react';
import { Trophy, Users, MapPin, ChevronRight, Star, Award, ShieldCheck } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Link } from 'react-router';

const TIMELINE_DATA = [
  {
    year: "1957",
    title: "Club Foundation",
    description: "Established in Monasterboice, based at Pairc Naomh Máirtín, Silloge. The beginning of 'The Jocks'.",
    icon: <Users className="w-5 h-5 text-blue-600" />
  },
  {
    year: "1980",
    title: "Junior Clean Sweep",
    description: "A landmark unbeaten year winning the Junior Shield, League, and Championship.",
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />
  },
  {
    year: "2018-19",
    title: "Senior Contenders",
    description: "Reached consecutive Senior Championship finals, establishing the club as a top-tier force.",
    icon: <Star className="w-5 h-5 text-blue-600" />
  },
  {
    year: "2020",
    title: "First Senior Title",
    description: "Won the first-ever Louth Senior Football Championship (Joe Ward Cup) defeating St Mary's.",
    icon: <Trophy className="w-5 h-5 text-[#1E3A8A]" />
  },
  {
    year: "2021",
    title: "Back-to-Back Champions",
    description: "Secured consecutive county titles with victory over St Mochta's.",
    icon: <Award className="w-5 h-5 text-amber-500" />
  },
  {
    year: "2025",
    title: "Third Joe Ward Cup",
    description: "Defeated Newtown Blues to claim a third Senior Title, cementing dominance in Louth.",
    icon: <Trophy className="w-5 h-5 text-[#1E3A8A]" />
  }
];

const NOTABLE_PLAYERS = [
  {
    name: "Sam Mulroy",
    role: "Louth Captain & All-Star Nominee",
    detail: "Captained Louth since 2021 and 2024 All-Star nominee. A prolific scorer for club and county."
  },
  {
    name: "Eoghan Callaghan",
    role: "2025 Championship Captain",
    detail: "Led the team to our third Senior Championship title in 2025."
  },
  {
    name: "Jim Mooney",
    role: "Club Legend",
    detail: "Prominent member of the 1966 Louth Leinster Junior Championship winning squad."
  }
];

export function HistoryPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        {/* Modern Header */}
        <section className="club-hero-surface pt-16 pb-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Club History
            </h1>
            <p className="text-blue-100/90 font-bold uppercase tracking-[0.2em] text-sm">
              Naomh Máirtín GAA — "The Jocks"
            </p>
          </div>
        </section>

        {/* Intro Overview */}
        <section className="px-4 -mt-12">
          <div className="max-w-3xl mx-auto bg-white border-2 border-gray-50 rounded-3xl p-8 shadow-xl">
            <p className="text-[#1E3A8A] text-lg font-bold leading-relaxed text-center">
              Founded in 1957 in Monasterboice, Co. Louth, Naomh Máirtín GFC has risen to become a dominant force in Louth football, achieving historic success with three Senior Championship titles in the 2020s.
            </p>
          </div>
        </section>

        {/* Key Milestones Timeline */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-12 text-center">
              Key Milestones
            </h2>
            <div className="space-y-4">
              {TIMELINE_DATA.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex items-start gap-6 hover:bg-white hover:border-amber-400/30 transition-all group"
                >
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-black text-amber-500 tracking-tight">{item.year}</span>
                      <div className="h-px w-6 bg-gray-200" />
                      <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Notable Players Section */}
        <section className="bg-[#1E3A8A] py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-black text-blue-300 uppercase tracking-[0.3em] mb-12 text-center">
              Notable Figures
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {NOTABLE_PLAYERS.map((player, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                    {player.name}
                  </h3>
                  <div className="text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
                    {player.role}
                  </div>
                  <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                    {player.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership CTA */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-[#1E3A8A] mb-8 uppercase tracking-tight">
              Be part of our future
            </h2>
            <a 
              href="https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#1E3A8A] text-white font-black rounded-2xl hover:bg-blue-800 transition-all uppercase tracking-wider text-sm shadow-xl shadow-blue-900/10"
            >
              Join the Club
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
