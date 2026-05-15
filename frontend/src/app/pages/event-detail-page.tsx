import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Calendar, ChevronLeft, Clock, MapPin } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';
import { SafeHtml } from '../components/safe-html';
import { getEventBySlug, type EventDTO } from '../data/events-api';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatTime(time?: string | null) {
  if (!time) return null;
  const normalized = /^\d{2}:\d{2}:\d{2}$/.test(time) ? time.slice(0, 5) : time;
  const [hourString, minuteString] = normalized.split(':');
  const hour = Number(hourString);
  const minute = Number(minuteString);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return time;

  return new Intl.DateTimeFormat('en-IE', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(2000, 0, 1, hour, minute));
}

export function EventDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState<EventDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    let ignore = false;

    getEventBySlug(slug)
      .then((payload) => {
        if (!ignore) {
          setEvent(payload);
        }
      })
      .catch((error) => {
        console.error('Failed to load event details:', error);
        if (!ignore) {
          setEvent(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-10">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1E3A8A] hover:text-blue-800"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Events
        </Link>

        {isLoading ? (
          <div className="mt-8 text-sm font-bold text-gray-500">Loading event...</div>
        ) : !event ? (
          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-gray-500">
            Event not found.
          </div>
        ) : (
          <article className="mt-8 space-y-8">
            <header className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-black text-[#1E3A8A] tracking-tight">{event.title}</h1>
              <div className="flex flex-wrap gap-5 text-sm font-bold text-gray-600">
                <div className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {formatDate(event.date)}
                </div>
                {event.time && (
                  <div className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {formatTime(event.time)}
                    {event.end_time ? ` - ${formatTime(event.end_time)}` : ''}
                  </div>
                )}
                {event.location && (
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    {event.location}
                  </div>
                )}
              </div>
            </header>

            {event.image_url && (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
                <img src={event.image_url} alt={event.title} className="w-full h-[320px] md:h-[440px] object-cover" />
              </div>
            )}

            <SafeHtml html={event.description} className="prose prose-sm md:prose-base max-w-none text-gray-700" />
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
