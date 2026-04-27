import { ChevronRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';
import { fetchTeams, type ApiTeam } from '../data/fixtures-results-api';

export function AdultTeamsPage() {
  const [teams, setTeams] = useState<ApiTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams({ category: 'adult', internal: 'true' });
        const ladies = await fetchTeams({ category: 'ladies', internal: 'true' });
        setTeams([...data, ...ladies]);
      } catch (error) {
        console.error('Failed to load adult teams:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void loadTeams();
  }, []);

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

        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="w-10 h-10 text-[#1E3A8A] animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {teams.map((team) => (
              <article
                key={team.id}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10"
              >
                <div className="max-w-xl space-y-5">
                  <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A] sm:text-3xl">
                    {team.name}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {team.training_times[0] || 'Team overview and upcoming content.'}
                  </p>
                  <Link
                    to={`/teams/${team.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                  >
                    View Team
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
            
            {/* Social link is still static for now as it's a hub */}
            <article
              className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10"
            >
              <div className="max-w-xl space-y-5">
                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A] sm:text-3xl">
                  Social
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  Open the club social section to explore Gaelic for Mothers and Others, Gaelic for Dads and Lads, and the running group.
                </p>
                <Link
                  to="/teams/adult/social"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                >
                  View Social
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        )}
      </div>
    </TeamsPageShell>
  );
}
