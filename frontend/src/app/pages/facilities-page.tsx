import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MapPin, Dumbbell, Coffee, Trophy, Building2, Trees, Activity } from 'lucide-react';
import { useCMS } from '../data/cms-context';
import { ContentPageSlugPage } from './content-page-slug-page';

function isRenderableVideoUrl(url?: string | null): boolean {
  if (!url) return false;
  const value = url.trim();
  if (!value) return false;

  return /^https?:\/\//i.test(value) || value.startsWith('/');
}

function LegacyFacilitiesPage() {
  const { pages } = useCMS();
  const content = pages.facilities;

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'trophy':
        return <Trophy className="h-6 w-6 text-amber-500" />;
      case 'dumbbell':
        return <Dumbbell className="h-6 w-6 text-amber-500" />;
      case 'coffee':
        return <Coffee className="h-6 w-6 text-amber-500" />;
      case 'building':
        return <Building2 className="h-6 w-6 text-amber-500" />;
      case 'trees':
        return <Trees className="h-6 w-6 text-amber-500" />;
      case 'activity':
        return <Activity className="h-6 w-6 text-amber-500" />;
      default:
        return <Building2 className="h-6 w-6 text-amber-500" />;
    }
  };

  const sortedFacilities = [...(content?.list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!content) return null;

  const shouldRenderVideo = content.media.type === 'video' && isRenderableVideoUrl(content.media.url);
  const shouldRenderImage = content.media.type !== 'video' && Boolean(content.media.url);
  const showMediaFallback = content.media.type === 'video' && !shouldRenderVideo;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <PremiumSponsorBanner />

      <section className="club-hero-surface relative overflow-hidden px-4 py-20 text-white sm:py-28">
        <div className="relative z-10 mx-auto max-w-7xl sm:px-2 lg:px-4">
          <h1 className="mb-6 text-4xl font-black uppercase tracking-tight sm:text-6xl">Our Facilities</h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-blue-100 sm:text-xl">{content.hero.description}</p>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <MapPin className="h-4 w-4" />
            {content.hero.locationLabel}
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 translate-x-20 skew-x-12 transform bg-amber-400/10" />
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2.5rem] border-8 border-white bg-white shadow-2xl">
            <div className="relative aspect-video bg-black">
              {shouldRenderVideo && (
                <video className="h-full w-full object-cover" controls playsInline key={content.media.url}>
                  <source src={content.media.url} type="video/mp4" />
                </video>
              )}
              {shouldRenderImage && (
                <ImageWithFallback src={content.media.url} alt={content.media.title} className="h-full w-full object-cover" />
              )}
              {showMediaFallback && (
                <div className="flex h-full w-full items-center justify-center bg-gray-900 px-6 text-center text-lg font-semibold text-gray-200">
                  Video coming soon
                </div>
              )}
            </div>
            <div className="p-8 text-center sm:p-12">
              <h2 className="mb-4 text-2xl font-black uppercase tracking-tight text-[#1E3A8A] sm:text-3xl">{content.media.title}</h2>
              <p className="mx-auto max-w-2xl font-medium text-gray-500">{content.media.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500">Explore the grounds</span>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#1E3A8A] sm:text-4xl">Core Facilities</h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-400" />
          </div>

          <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
            {sortedFacilities.map((facility) => (
              <div key={facility.id} className="group">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white shadow-lg">
                  {facility.image ? (
                    <ImageWithFallback
                      src={facility.image}
                      alt={facility.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-blue-50 p-3">{getIcon(facility.icon)}</div>
                  <div>
                    <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-[#1E3A8A]">{facility.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-gray-500">{facility.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function FacilitiesPage() {
  return <ContentPageSlugPage slug="facilities" fallback={<LegacyFacilitiesPage />} />;
}

