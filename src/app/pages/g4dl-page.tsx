import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

export function G4DLPage() {
  return (
    <TeamsPageShell
      title="Gaelic for Dads and Lads (G4DL)"
      subtitle="A social football pathway for men who want to stay active and involved in the club"
    >
      <div className="space-y-10">
        <TeamsSectionIntro
          eyebrow="Social"
          title="Gaelic for Dads and Lads (G4DL)"
          description="Gaelic for Dads and Lads (G4DL) creates a relaxed way to enjoy football, stay moving, and connect with others through Naomh Mairtin CPG."
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
