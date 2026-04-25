import { Calendar } from 'lucide-react';
import { useCMS } from '../data/cms-context';

export function EventsSection({
  title = 'Upcoming Events',
  itemsLimit = 3,
}: {
  title?: string;
  itemsLimit?: number;
}) {
  const { events } = useCMS();
  const limitedEvents = events.slice(0, itemsLimit);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
        {title}
      </h2>
      
      <div className="space-y-4 mb-6">
        {limitedEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} · {event.location}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#calendar"
        className="block w-full text-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A8A] rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md"
      >
        View Full Calendar
      </a>
    </div>
  );
}
