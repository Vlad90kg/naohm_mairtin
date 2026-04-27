import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, ChevronRight, ShieldCheck, Star, Trophy, Users } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  fetchHistoryPageContent,
  type ApiHistoryFigureItem,
  type ApiHistoryPageContent,
  type ApiHistoryTimelineItem,
} from '../data/fixtures-results-api';

const DEFAULT_HISTORY_PAGE: ApiHistoryPageContent = {
  hero_title: 'Club History',
  hero_subtitle: 'Naomh Mairtin GAA - "The Jocks"',
  intro_text:
    'Founded in 1957 in Monasterboice, Co. Louth, Naomh Mairtin GFC has risen to become a dominant force in Louth football, achieving historic success with three Senior Championship titles in the 2020s.',
  milestones_eyebrow: 'Key Milestones',
  timeline_items: [
    {
      id: 'timeline-1',
      year: '1957',
      title: 'Club Foundation',
      description: "Established in Monasterboice, based at Pairc Naomh Mairtin, Silloge. The beginning of 'The Jocks'.",
      icon: 'users',
      image: '',
    },
    {
      id: 'timeline-2',
      year: '1980',
      title: 'Junior Clean Sweep',
      description: 'A landmark unbeaten year winning the Junior Shield, League, and Championship.',
      icon: 'shield',
      image: '',
    },
    {
      id: 'timeline-3',
      year: '2018-19',
      title: 'Senior Contenders',
      description: 'Reached consecutive Senior Championship finals, establishing the club as a top-tier force.',
      icon: 'star',
      image: '',
    },
    {
      id: 'timeline-4',
      year: '2020',
      title: 'First Senior Title',
      description: "Won the first-ever Louth Senior Football Championship (Joe Ward Cup) defeating St Mary's.",
      icon: 'trophy',
      image: '',
    },
    {
      id: 'timeline-5',
      year: '2021',
      title: 'Back-to-Back Champions',
      description: "Secured consecutive county titles with victory over St Mochta's.",
      icon: 'award',
      image: '',
    },
    {
      id: 'timeline-6',
      year: '2025',
      title: 'Third Joe Ward Cup',
      description: 'Defeated Newtown Blues to claim a third Senior Title, cementing dominance in Louth.',
      icon: 'trophy',
      image: '',
    },
  ],
  figures_eyebrow: 'Notable Figures',
  figures_items: [
    {
      id: 'figure-1',
      name: 'Sam Mulroy',
      role: 'Louth Captain & All-Star Nominee',
      detail: 'Captained Louth since 2021 and 2024 All-Star nominee. A prolific scorer for club and county.',
      image: '',
    },
    {
      id: 'figure-2',
      name: 'Eoghan Callaghan',
      role: '2025 Championship Captain',
      detail: 'Led the team to our third Senior Championship title in 2025.',
      image: '',
    },
    {
      id: 'figure-3',
      name: 'Jim Mooney',
      role: 'Club Legend',
      detail: 'Prominent member of the 1966 Louth Leinster Junior Championship winning squad.',
      image: '',
    },
  ],
  cta_title: 'Be part of our future',
  cta_button_text: 'Join the Club',
  cta_button_link: 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
};

function TimelineIcon({ icon }: { icon: string }) {
  const className = 'w-5 h-5';
  switch (icon) {
    case 'shield':
      return <ShieldCheck className={`${className} text-amber-600`} />;
    case 'star':
      return <Star className={`${className} text-blue-600`} />;
    case 'award':
      return <Award className={`${className} text-amber-500`} />;
    case 'trophy':
      return <Trophy className={`${className} text-[#1E3A8A]`} />;
    case 'users':
    default:
      return <Users className={`${className} text-blue-600`} />;
  }
}

function TimelineCard({ item, index }: { item: ApiHistoryTimelineItem; index: number }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 transition-all group hover:border-amber-400/30 hover:bg-white"
    >
      {item.image ? (
        <div className="aspect-square w-full max-w-[800px] overflow-hidden border-b border-gray-100 mx-auto">
          <ImageWithFallback src={item.image} alt={item.title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="flex items-start gap-6 p-6">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm sm:flex">
          <TimelineIcon icon={item.icon} />
        </div>
        <div>
          <div className="mb-1 flex items-center gap-3">
            <span className="text-xl font-black tracking-tight text-amber-500">{item.year}</span>
            <div className="h-px w-6 bg-gray-200" />
            <h3 className="text-lg font-black uppercase tracking-tight text-[#1E3A8A]">{item.title}</h3>
          </div>
          <p className="font-medium leading-relaxed text-gray-500">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FigureCard({ figure }: { figure: ApiHistoryFigureItem }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {figure.image ? (
        <div className="aspect-square w-full max-w-[800px] overflow-hidden border-b border-white/10 mx-auto">
          <ImageWithFallback src={figure.image} alt={figure.name} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="p-8">
        <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white">{figure.name}</h3>
        <div className="mb-4 text-xs font-black uppercase tracking-widest text-amber-400">{figure.role}</div>
        <p className="text-sm font-medium leading-relaxed text-blue-100/70">{figure.detail}</p>
      </div>
    </div>
  );
}

export function HistoryPage() {
  const [pageContent, setPageContent] = useState<ApiHistoryPageContent>(DEFAULT_HISTORY_PAGE);

  useEffect(() => {
    fetchHistoryPageContent()
      .then((data) => setPageContent(data))
      .catch((error) => {
        console.error('Failed to load history page content:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface px-4 py-20 text-center sm:py-28">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
              {pageContent.hero_title}
            </h1>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100/90">
              {pageContent.hero_subtitle}
            </p>
          </div>
        </section>

        <section className="px-4 -mt-12">
          <div className="max-w-3xl mx-auto rounded-3xl border-2 border-gray-50 bg-white p-8 shadow-xl">
            <p className="text-center text-lg font-bold leading-relaxed text-[#1E3A8A]">
              {pageContent.intro_text}
            </p>
          </div>
        </section>

        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center text-sm font-black uppercase tracking-[0.3em] text-gray-400">
              {pageContent.milestones_eyebrow}
            </h2>
            <div className="space-y-4">
              {pageContent.timeline_items.map((item, index) => (
                <TimelineCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1E3A8A] px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="mb-12 text-center text-sm font-black uppercase tracking-[0.3em] text-blue-300">
              {pageContent.figures_eyebrow}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {pageContent.figures_items.map((figure) => (
                <FigureCard key={figure.id} figure={figure} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-8 text-2xl font-black uppercase tracking-tight text-[#1E3A8A]">
              {pageContent.cta_title}
            </h2>
            <a
              href={pageContent.cta_button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-[#1E3A8A] px-10 py-5 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-blue-900/10 transition-all hover:bg-blue-800"
            >
              {pageContent.cta_button_text}
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
