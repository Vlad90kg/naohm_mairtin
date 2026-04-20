import {
  BookOpenText,
  ClipboardList,
  Mic2,
  Music2,
  Sparkles,
} from 'lucide-react';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

const scorActivities = [
  {
    title: 'Music',
    description: 'Celebrate instrumental talent and musical performance as part of the club’s cultural life.',
    icon: Music2,
  },
  {
    title: 'Singing',
    description: 'Create space for solo and group singing through community participation and competition.',
    icon: Mic2,
  },
  {
    title: 'Dancing',
    description: 'Highlight traditional dance and expressive performance within the wider GAA culture programme.',
    icon: Sparkles,
  },
  {
    title: 'Storytelling',
    description: 'Share local voice, club memory, and creativity through spoken performance and narrative.',
    icon: BookOpenText,
  },
  {
    title: 'Quiz',
    description: 'Bring members together through team quiz activity that blends knowledge, fun, and club spirit.',
    icon: ClipboardList,
  },
];

export function ScorPage() {
  return (
    <TeamsPageShell
      title="Scor"
      subtitle="Explore the cultural side of Naomh Mairtin CPG through music, performance, creativity, and community participation"
    >
      <div className="mx-auto max-w-6xl space-y-12">
        <TeamsSectionIntro
          eyebrow="Cultural Activity"
          title="Scor"
          description="Scor celebrates the cultural side of the GAA and gives the club a dedicated space for performance, expression, and shared community activity."
        />

        <section className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-600">
            About Scor
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            This page is reserved for Scor-specific content, including future updates on participation, events, achievements, and ways for members to get involved in the cultural programme.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {scorActivities.map((activity) => (
            <article
              key={activity.title}
              className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/10">
                <activity.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A]">
                {activity.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {activity.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </TeamsPageShell>
  );
}
