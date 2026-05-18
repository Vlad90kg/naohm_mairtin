import { ChevronRight, Clock3, Loader2, Phone, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';
import { fetchTeams, type ApiTeam } from '../data/fixtures-results-api';
import { fetchJuvenileTeamsPageContent, type ApiJuvenileTeamsPageContent } from '../data/juvenile-teams-api';

const DEFAULT_PAGE_CONTENT: ApiJuvenileTeamsPageContent = {
  hero_title: 'Juvenile Teams',
  hero_subtitle: 'Browse every juvenile team at Naomh Mairtin CPG & LGFA',
  intro_eyebrow: 'Juvenile Pathway',
  intro_title: 'Juvenile Teams',
  intro_description: 'Browse the full juvenile setup below and open any card to view the team details.',
  card_cta_text: 'View Details',
  modal_eyebrow: 'Juvenile Team',
  coaches_title: 'Coaches',
  no_coaches_text: 'No coaches listed',
  contact_email_title: 'Contact Email',
  training_times_title: 'Training Times',
  no_training_times_text: 'Training times TBC',
};

export function JuvenileTeamsPage() {
  const [teams, setTeams] = useState<ApiTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<ApiTeam | null>(null);
  const [pageContent, setPageContent] = useState<ApiJuvenileTeamsPageContent>(DEFAULT_PAGE_CONTENT);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const [teamsData, contentData] = await Promise.all([
          fetchTeams({ category: 'juvenile', internal: 'true' }),
          fetchJuvenileTeamsPageContent(),
        ]);
        setTeams(teamsData);
        setPageContent(contentData);
      } catch (error) {
        console.error('Failed to load juvenile teams:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void loadTeams();
  }, []);

  return (
    <TeamsPageShell
      title={pageContent.hero_title}
      subtitle={pageContent.hero_subtitle}
    >
      <div className="space-y-12">
        <TeamsSectionIntro
          eyebrow={pageContent.intro_eyebrow}
          title={pageContent.intro_title}
          description={pageContent.intro_description}
        />

        {isLoading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="w-10 h-10 text-[#1E3A8A] animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {teams.map((team) => (
              <button
                key={team.id}
                type="button"
                onClick={() => setSelectedTeam(team)}
                className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#1E3A8A]/15 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1E3A8A]">
                  <User className="h-5 w-5" />
                </div>
                <h4 className="mt-5 text-lg font-black tracking-tight text-[#1E3A8A]">
                  {team.name}
                </h4>
                <p className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1E3A8A]">
                  {pageContent.card_cta_text}
                  <ChevronRight className="h-4 w-4" />
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTeam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                  {pageContent.modal_eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-[#1E3A8A]">
                  {selectedTeam.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTeam(null)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#1E3A8A]"
                aria-label="Close team details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  {pageContent.coaches_title}
                </p>
                <div className="mt-3 space-y-2">
                  {selectedTeam.managers.length > 0 ? (
                    selectedTeam.managers.map((m, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                        <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-[#1E3A8A]" />
                          <span>{m.name} <span className="text-xs text-gray-400 font-normal">({m.role})</span></span>
                        </div>
                        {m.phone && <span className="text-xs font-bold text-[#1E3A8A]">{m.phone}</span>}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-400 italic">
                      {pageContent.no_coaches_text}
                    </div>
                  )}
                </div>
              </div>

              {selectedTeam.contact_email && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    {pageContent.contact_email_title}
                  </p>
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                    <Phone className="h-4 w-4 text-[#1E3A8A]" />
                    {selectedTeam.contact_email}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  {pageContent.training_times_title}
                </p>
                <div className="mt-3 space-y-2">
                  {selectedTeam.training_times.length > 0 ? (
                    selectedTeam.training_times.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                        <Clock3 className="h-4 w-4 text-[#1E3A8A]" />
                        {t}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-400 italic">
                      {pageContent.no_training_times_text}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </TeamsPageShell>
  );
}
