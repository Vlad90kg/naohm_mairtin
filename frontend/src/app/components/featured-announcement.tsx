import { useCMS } from '../data/cms-context';

export function FeaturedAnnouncement() {
  const { pages } = useCMS();
  const announcement = pages.home.featuredAnnouncement;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-3">
        Featured Announcement
      </h2>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {announcement.title}
      </h3>
      <p className="text-gray-600 mb-6">
        {announcement.description}
      </p>
      <a
        href={announcement.buttonLink}
        className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A8A] rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md"
      >
        {announcement.buttonText}
      </a>
    </div>
  );
}
