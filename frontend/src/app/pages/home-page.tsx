import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { HeroSection } from '../components/hero-section';
import { AnnouncementEventsSection } from '../components/announcement-events-section';
import { NewsSection } from '../components/news-section';
import { TeamsSection } from '../components/teams-section';
import { Tier2SponsorCarousel } from '../components/tier2-sponsor-carousel';
import { ShopSection } from '../components/shop-section';
import { MembershipCTA } from '../components/membership-cta';
import { Footer } from '../components/footer';
import { useCMS } from '../data/cms-context';

export function HomePage() {
  const { pages } = useCMS();
  const home = pages.home;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky navigation always at top */}
      <Navigation />

      {/* PRIMARY sponsor placement — directly below nav, above hero */}
      <PremiumSponsorBanner />

      <HeroSection />
      <AnnouncementEventsSection />
      <NewsSection />
      {home.sections.teams.enabled && (
        <TeamsSection
          title={home.sections.teams.sectionTitle}
          itemsLimit={home.sections.teams.itemsLimit}
        />
      )}

      {home.sections.sponsors.enabled && <Tier2SponsorCarousel />}

      {home.sections.shops.enabled && (
        <ShopSection
          title={home.sections.shops.sectionTitle}
          itemsLimit={home.sections.shops.itemsLimit}
        />
      )}
      <MembershipCTA />
      <Footer />
    </div>
  );
}
