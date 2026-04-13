import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

export function FuriousButNotFastPage() {
  return (
    <TeamsPageShell
      title="Furious but not Fast"
      subtitle="A social running group built around movement, encouragement, and club connection"
    >
      <div className="space-y-10">
        <TeamsSectionIntro
          eyebrow="Social"
          title="Furious but not Fast"
          description="Furious but not Fast gives club members a social running option focused on regular activity, encouragement, and shared sessions at an enjoyable pace."
        />

        <section className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
          <p className="max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            This page is ready for dedicated group content such as meeting times, routes, contact details, and upcoming running events.
          </p>
        </section>
      </div>
    </TeamsPageShell>
  );
}
