import { useEffect, useState } from 'react';
import { Clock3, Loader2, Mail, Phone, User, Users } from 'lucide-react';
import { fetchTeams, type ApiTeam } from '../data/fixtures-results-api';
import { fetchContentPageBySlug, type ContentPageDTO } from '../data/content-pages-api';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';
import { FlexibleSections } from '../components/flexible-sections';

const FALLBACK_CONTENT = {
  title: 'Senior Men',
  subtitle: 'Senior men squads and team information managed from CMS.',
  eyebrow: 'Senior Men',
  intro: 'Add, remove, and update senior men teams in the Team CMS. Team cards and details are shown directly on this page.',
};

export function SeniorMenPage() {
  const [teams, setTeams] = useState<ApiTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contentPage, setContentPage] = useState<ContentPageDTO | null>(null);
  const [expandedTeamIds, setExpandedTeamIds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [teamsData, content] = await Promise.all([
          fetchTeams({ category: 'adult', senior_group: 'senior_men', internal: 'true' }),
          fetchContentPageBySlug('senior-men').catch(() => null),
        ]);

        setTeams(teamsData);
        setContentPage(content);
      } catch (error) {
        console.error('Failed to load senior men page:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPage();
  }, []);

  const toggleTeamDescription = (teamId: number) => {
    setExpandedTeamIds((current) => ({ ...current, [teamId]: !current[teamId] }));
  };

  return (
    <TeamsPageShell
      title={contentPage?.title || FALLBACK_CONTENT.title}
      subtitle={contentPage?.subtitle || FALLBACK_CONTENT.subtitle}
    >
      <div className="space-y-12">
        <TeamsSectionIntro
          eyebrow={FALLBACK_CONTENT.eyebrow}
          title={contentPage?.title || FALLBACK_CONTENT.title}
          description={contentPage?.intro_text || FALLBACK_CONTENT.intro}
        />

        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="w-10 h-10 text-[#1E3A8A] animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {teams.map((team) => (
              <article key={team.id} className="rounded-[2rem] border border-gray-100 bg-white p-6 text-left shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1E3A8A]">
                    <User className="h-5 w-5" />
                  </div>
                  <h4 className="text-xl font-black tracking-tight text-[#1E3A8A]">{team.name}</h4>
                </div>

                <div className="space-y-5">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    {team.image ? (
                      <img src={team.image} alt={team.name} className="h-52 w-full rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-52 items-center justify-center rounded-lg bg-white text-[#1E3A8A]">
                        <Users className="h-10 w-10" />
                      </div>
                    )}
                  </div>

                  <section>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Coaches</p>
                    <div className="mt-3 space-y-2">
                      {team.managers.length > 0 ? (
                        team.managers.map((m, i) => (
                          <div key={`${m.name}-${i}`} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                            <p className="font-bold text-[#1E3A8A]">
                              {m.name} {m.role ? <span className="font-normal text-xs text-gray-400">({m.role})</span> : null}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-4 text-xs text-gray-500">
                              {m.phone ? <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{m.phone}</span> : null}
                              {m.email ? <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{m.email}</span> : null}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-400 italic">No coaches listed.</div>
                      )}
                    </div>
                  </section>

                  <section>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Training Times</p>
                    <div className="mt-3 space-y-2">
                      {team.training_times.length > 0 ? (
                        team.training_times.map((time, i) => (
                          <div key={`${time}-${i}`} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                            <Clock3 className="h-4 w-4 text-[#1E3A8A]" />
                            {time}
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-400 italic">Training times TBC.</div>
                      )}
                    </div>
                  </section>

                  {team.description && team.description.trim().length > 0 && (
                    <section>
                      <button
                        type="button"
                        onClick={() => toggleTeamDescription(team.id)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-[#1E3A8A] transition-colors hover:bg-blue-50"
                      >
                        {expandedTeamIds[team.id] ? 'Hide Details' : 'Show Details'}
                      </button>

                      {expandedTeamIds[team.id] && (
                        <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700 whitespace-pre-line break-words [overflow-wrap:anywhere]">
                          {team.description}
                        </div>
                      )}
                    </section>
                  )}

                  {team.contact_email && (
                    <section>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Email</p>
                      <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">{team.contact_email}</div>
                    </section>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {contentPage && contentPage.sections.length > 0 && (
          <section className="pt-6">
            <FlexibleSections sections={contentPage.sections} />
          </section>
        )}
      </div>
    </TeamsPageShell>
  );
}
