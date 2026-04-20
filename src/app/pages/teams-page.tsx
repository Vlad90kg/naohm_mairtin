import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

const pageLinks = [
  {
    title: 'Adult Teams',
    description: 'Browse the adult football section, including links onward to the senior men, senior ladies, and social overview pages.',
    href: '/teams/adult',
    eyebrow: 'Adult Teams',
  },
  {
    title: 'Juvenile Teams',
    description: 'Open the juvenile pathway page to view the full structure of teams and the current placeholder team details layout.',
    href: '/teams/juvenile',
    eyebrow: 'Juvenile Teams',
  },
  {
    title: 'Social',
    description: 'Visit the social section for direct access to G4MO, G4DL, and Furious but not Fast.',
    href: '/teams/adult/social',
    eyebrow: 'Social',
  },
  {
    title: 'Scór',
    description: 'Explore the dedicated Scór page for the cultural side of the club, including music, performance, storytelling, and quiz activity.',
    href: '/teams/scor',
    eyebrow: 'Scór',
  },
];

const gallerySlots = Array.from({ length: 6 }, (_, index) => index + 1);

export function TeamsPage() {
  return (
    <TeamsPageShell
      title="OUR TEAMS"
      subtitle="Use this page as the club teams hub, with direct links to each section and a gallery that stays here on the main teams page"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        <section className="space-y-6">
          <TeamsSectionIntro
            eyebrow="Teams Hub"
            title="Explore Team Sections"
            description="Each area below links to its own dedicated page. Adult Teams, Juvenile Teams, Social, and Scór now live as separate destinations, while the gallery remains here on the main Teams page."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {pageLinks.map((page) => (
              <article
                key={page.title}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10"
              >
                <div className="max-w-xl space-y-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">
                    {page.eyebrow}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A] sm:text-3xl">
                    {page.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {page.description}
                  </p>
                  <Link
                    to={page.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                  >
                    Open Page
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <TeamsSectionIntro
            eyebrow="Gallery"
            title="Gallery"
            description="The gallery remains on the main Teams page and can continue to showcase images from across every section of the club."
          />

          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-600">
                Media
              </p>
              <h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
                Gallery
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallerySlots.map((slot) => (
                <div
                  key={slot}
                  className="flex aspect-[4/3] items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 text-center"
                >
                  <span className="text-sm font-black uppercase tracking-[0.18em] text-gray-400">
                    Image Placeholder
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </TeamsPageShell>
  );
}
