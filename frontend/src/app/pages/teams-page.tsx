import { ChevronRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';
import { fetchTeamsPageContent, type ApiTeamsPageCard, type ApiTeamsPageContent } from '../data/fixtures-results-api';

const pageLinks = [
  {
    title: 'Adult Teams',
    description: 'Browse the adult football section, including links onward to the senior men, senior ladies, and social overview pages.',
    href: '/teams/adult',
    eyebrow: 'Adult Teams',
    buttonLabel: 'Open Page',
  },
  {
    title: 'Juvenile Teams',
    description: 'Open the juvenile pathway page to view the full structure of teams and the current placeholder team details layout.',
    href: '/teams/juvenile',
    eyebrow: 'Juvenile Teams',
    buttonLabel: 'Open Page',
  },
  {
    title: 'Social',
    description: 'Visit the social section for direct access to G4MO, G4DL, and Furious but not Fast.',
    href: '/teams/social',
    eyebrow: 'Social',
    buttonLabel: 'Open Page',
  },
  {
    title: 'Scór',
    description: 'Explore the dedicated Scór page for the cultural side of the club, including music, performance, storytelling, and quiz activity.',
    href: '/teams/scor',
    eyebrow: 'Scór',
    buttonLabel: 'Open Page',
  },
];

export function TeamsPage() {
  const [content, setContent] = useState<ApiTeamsPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTeamsPageContent()
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load teams page content:', error);
        setIsLoading(false);
      });
  }, []);

  const cards: ApiTeamsPageCard[] = (content?.cards ?? pageLinks.map((page, index) => ({
    eyebrow: page.eyebrow,
    title: page.title,
    description: page.description,
    button_label: page.buttonLabel,
    button_url: page.href,
    order: index,
    is_active: true,
  })))
    .filter((card) => card.is_active)
    .sort((left, right) => left.order - right.order);

  const galleryImages = (content?.gallery_images ?? [])
    .filter((image) => image.is_active && image.image_url)
    .sort((left, right) => left.order - right.order);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-[#1E3A8A] animate-spin" />
      </div>
    );
  }

  return (
    <TeamsPageShell
      title={content?.hero_title || "OUR TEAMS"}
      subtitle={content?.hero_subtitle || ""}
    >
      <div className="mx-auto max-w-6xl space-y-16">
        <section className="space-y-6">
          <TeamsSectionIntro
            eyebrow={content?.hub_eyebrow || "Teams Hub"}
            title={content?.hub_title || "Explore Team Sections"}
            description={content?.hub_description || ""}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((page) => (
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
                    to={page.button_url}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                  >
                    {page.button_label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {galleryImages.length > 0 && (
        <section className="space-y-8">
          <TeamsSectionIntro
            eyebrow={content?.gallery_eyebrow || "Gallery"}
            title={content?.gallery_title || "Gallery"}
            description={content?.gallery_description || ""}
          />

          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <figure
                  key={`${image.order}-${image.image_url}`}
                  className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm"
                >
                  <img
                    src={image.image_url}
                    alt={image.caption || 'Teams gallery image'}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  {image.caption && (
                    <figcaption className="px-5 py-4 text-sm text-gray-600">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
        )}
      </div>
    </TeamsPageShell>
  );
}
