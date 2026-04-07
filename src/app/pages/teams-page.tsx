import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

const teamCategories = [
  {
    title: 'Adult Teams',
    description: 'Explore our senior adult football teams and access each dedicated team page.',
    href: '/teams/adult',
  },
  {
    title: 'Juvenile Teams',
    description: 'Browse every juvenile team from All Stars through to Minor in one structured place.',
    href: '/teams/juvenile',
  },
];

export function TeamsPage() {
  return (
    <TeamsPageShell
      title="OUR TEAMS"
      subtitle="Choose a category to explore the full team structure at Naomh Mairtin CPG"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <TeamsSectionIntro
          eyebrow="Team Categories"
          title="Club Teams"
          description="Start with the main pathway below, then move into the adult or juvenile category page for the full team list."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {teamCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-[2rem] border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10"
            >
              <div className="mx-auto max-w-sm space-y-5">
                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A] sm:text-3xl">
                  {category.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {category.description}
                </p>
                <Link
                  to={category.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                >
                  View
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </TeamsPageShell>
  );
}
