import { FeaturedAnnouncement } from './featured-announcement';
import { EventsSection } from './events-section';
import { useCMS } from '../data/cms-context';

export function AnnouncementEventsSection() {
  const { events, featuredEvent, pages } = useCMS();
  const sectionConfig = pages.home.sections.events;
  const hasFallbackEvent = events.some(
    (event) => new Date(`${event.date}T00:00:00`) >= new Date(new Date().setHours(0, 0, 0, 0))
  );
  const hasAnnouncementCard = Boolean(featuredEvent || hasFallbackEvent);

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-6 ${hasAnnouncementCard ? 'md:grid-cols-2' : ''}`}>
          {hasAnnouncementCard && <FeaturedAnnouncement />}
          {sectionConfig.enabled && (
            <EventsSection
              title={sectionConfig.sectionTitle}
              itemsLimit={sectionConfig.itemsLimit}
            />
          )}
        </div>
      </div>
    </section>
  );
}
