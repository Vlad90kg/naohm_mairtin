import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

const adultTeams = [
  {
    name: 'Senior Men',
    description: 'A placeholder overview for the club’s senior men’s team and upcoming team content.',
    href: '/teams/senior-men',
  },
  {
    name: 'Senior Ladies',
    description: 'A placeholder overview for the club’s senior ladies team and upcoming team content.',
    href: '/teams/senior-ladies',
  },
  {
    name: 'Social',
    description: 'Open the club social section to explore Gaelic for Mothers and Others, Gaelic for Dads and Lads, and the running group.',
    href: '/teams/adult/social',
  },
];

export function AdultTeamsPage() {
  return (
    <TeamsPageShell
      title="Adult Teams"
      subtitle="Explore the senior adult teams representing Naomh Mairtin CPG"
    >
      <div className="space-y-10">
        <TeamsSectionIntro
          eyebrow="Adult Pathway"
          title="Adult Teams"
          description="Our adult section includes the senior teams as well as the club social pathway, each with its own dedicated page."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {adultTeams.map((team) => (
            <article
              key={team.name}
              className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10"
            >
              <div className="max-w-xl space-y-5">
                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A] sm:text-3xl">
                  {team.name}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {team.description}
                </p>
                <Link
                  to={team.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                >
                  View Team
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
