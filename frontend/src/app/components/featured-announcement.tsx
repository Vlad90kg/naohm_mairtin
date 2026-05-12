import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useCMS } from '../data/cms-context';

export function FeaturedAnnouncement() {
  const { events, featuredEvent } = useCMS();
  const fallbackEvent = events
    .filter((event) => new Date(`${event.date}T00:00:00`) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((left, right) => left.date.localeCompare(right.date))[0] ?? null;
  const announcement = featuredEvent ?? fallbackEvent;

  if (!announcement) {
    return null;
  }

  const plainDescription = (announcement.description ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const hasMeta = Boolean(announcement.date || announcement.location);
  const linkTarget = announcement.slug ? `/events#${announcement.slug}` : '/events';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-3">
        Featured Announcement
      </h2>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {announcement.title}
      </h3>
      {hasMeta && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
          {announcement.date && (
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-amber-500" />
              <span>{new Intl.DateTimeFormat('en-IE', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(announcement.date))}</span>
            </div>
          )}
          {announcement.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{announcement.location}</span>
            </div>
          )}
        </div>
      )}
      {plainDescription && (
        <p className="text-gray-600 mb-6 line-clamp-4">
          {plainDescription}
        </p>
      )}
      <Link
        to={linkTarget}
        className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A8A] rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md"
      >
        Learn More
      </Link>
    </div>
  );
}
