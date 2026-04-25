import { FeaturedAnnouncement } from './featured-announcement';
import { EventsSection } from './events-section';
import { useCMS } from '../data/cms-context';

export function AnnouncementEventsSection() {
  const { pages } = useCMS();
  const sectionConfig = pages.home.sections.events;

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <FeaturedAnnouncement />
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
