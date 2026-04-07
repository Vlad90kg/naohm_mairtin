import { ChevronRight, Clock3, Phone, User, X } from 'lucide-react';
import { useState } from 'react';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

type JuvenileTeam = {
  name: string;
  coach: string;
  contact: string;
  trainingTime: string;
};

type JuvenileGroup = {
  title: string;
  description: string;
  teams: JuvenileTeam[];
};

const juvenileGroups: JuvenileGroup[] = [
  {
    title: 'Foundation',
    description: 'Introductory teams focused on fun, participation, and building confidence.',
    teams: [
      { name: 'All Stars', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'Nursery', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
    ],
  },
  {
    title: 'Youth',
    description: 'Early youth teams developing core football skills and enjoyment of the game.',
    teams: [
      { name: 'U7 Boys & Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U8 Boys & Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U9 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U9 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U10 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U10 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
    ],
  },
  {
    title: 'Development',
    description: 'Teams moving into structured development and stronger competitive foundations.',
    teams: [
      { name: 'U11 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U11 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U12 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U12 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U13 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U13 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
    ],
  },
  {
    title: 'Senior Youth',
    description: 'Older juvenile teams preparing players for the transition toward adult football.',
    teams: [
      { name: 'U14 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U14 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U15 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U15 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U16 Boys', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'U16 Girls', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'Minor Men', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
      { name: 'Minor Ladies', coach: 'Coach placeholder', contact: 'Contact placeholder', trainingTime: 'Training time placeholder' },
    ],
  },
];

export function JuvenileTeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<JuvenileTeam | null>(null);

  return (
    <TeamsPageShell
      title="Juvenile Teams"
      subtitle="Browse every juvenile team at Naomh Mairtin CPG"
    >
      <div className="space-y-12">
        <TeamsSectionIntro
          eyebrow="Juvenile Pathway"
          title="Juvenile Teams"
          description="The juvenile section is grouped by stage so it stays easy to scan while still showing every team."
        />

        <div className="space-y-10">
          {juvenileGroups.map((group) => (
            <section
              key={group.title}
              className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-6 max-w-2xl space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A]">
                  {group.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {group.teams.map((team) => (
                  <button
                    key={team.name}
                    type="button"
                    onClick={() => setSelectedTeam(team)}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#1E3A8A]/15 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1E3A8A]">
                      <User className="h-5 w-5" />
                    </div>
                    <h4 className="mt-5 text-lg font-black tracking-tight text-[#1E3A8A]">
                      {team.name}
                    </h4>
                    <p className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1E3A8A]">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </p>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {selectedTeam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                  Juvenile Team
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

            <div className="space-y-6 p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Coach
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-[#1E3A8A]" />
                  {selectedTeam.coach}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Contact
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4 text-[#1E3A8A]" />
                  {selectedTeam.contact}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Training Time
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                  <Clock3 className="h-4 w-4 text-[#1E3A8A]" />
                  {selectedTeam.trainingTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </TeamsPageShell>
  );
}
