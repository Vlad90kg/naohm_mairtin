import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

export function G4MOPage() {
  return (
    <TeamsPageShell
      title="Gaelic for Mothers and Others (G4MO)"
      subtitle="A social football pathway for women who want to be active and connected through the club"
    >
      <div className="space-y-10">
        <TeamsSectionIntro
          eyebrow="Social"
          title="Gaelic for Mothers and Others (G4MO)"
          description="Gaelic for Mothers and Others (G4MO) offers a welcoming way to get involved in football, build fitness, and enjoy the social side of Naomh Mairtin CPG."
        />

        <section className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            This page is ready for dedicated group content such as training details, contact information, session times, and club updates.
          </p>
        </section>
      </div>
    </TeamsPageShell>
  );
}
