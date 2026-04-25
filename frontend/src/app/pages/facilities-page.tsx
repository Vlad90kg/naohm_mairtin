import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MapPin, Dumbbell, Coffee, Trophy, Building2, Trees, Activity } from 'lucide-react';
import { useCMS } from '../data/cms-context';

export function FacilitiesPage() {
  const { pages } = useCMS();
  const content = pages.facilities;

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'trophy': return <Trophy className="h-6 w-6 text-amber-500" />;
      case 'dumbbell': return <Dumbbell className="h-6 w-6 text-amber-500" />;
      case 'coffee': return <Coffee className="h-6 w-6 text-amber-500" />;
      case 'building': return <Building2 className="h-6 w-6 text-amber-500" />;
      case 'trees': return <Trees className="h-6 w-6 text-amber-500" />;
      case 'activity': return <Activity className="h-6 w-6 text-amber-500" />;
      default: return <Building2 className="h-6 w-6 text-amber-500" />;
    }
  };

  const sortedFacilities = [...(content?.list || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!content) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <PremiumSponsorBanner />

      {/* Hero Header */}
      <section className="club-hero-surface relative overflow-hidden px-4 py-20 text-white sm:py-28">
        <div className="max-w-7xl mx-auto relative z-10 sm:px-2 lg:px-4">
          <h1 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tight">
            Our Facilities
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl font-medium leading-relaxed">
            {content.hero.description}
          </p>
          <div className="mt-8 flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs">
            <MapPin className="h-4 w-4" />
            {content.hero.locationLabel}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-400/10 skew-x-12 transform translate-x-20"></div>
      </section>

      {/* Media Feature */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white">
            <div className="aspect-video relative bg-black">
              {content.media.type === 'video' ? (
                <video 
                  className="w-full h-full object-cover"
                  controls
                  muted
                  autoPlay
                  loop
                  playsInline
                  key={content.media.url}
                >
                  <source src={content.media.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <ImageWithFallback 
                  src={content.media.url} 
                  alt={content.media.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A8A] mb-4 uppercase tracking-tight">
                {content.media.title}
              </h2>
              <p className="text-gray-500 font-medium max-w-2xl mx-auto">
                {content.media.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-black uppercase tracking-widest text-xs">Explore the grounds</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] uppercase tracking-tight mt-2">Core Facilities</h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            {sortedFacilities.map((facility) => (
              <div key={facility.id} className="group">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg mb-6 border-4 border-white">
                  <ImageWithFallback 
                    src={facility.image} 
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-2xl">
                    {getIcon(facility.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight mb-2">
                      {facility.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {facility.description}
                    </p>
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
