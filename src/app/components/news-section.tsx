import { ImageWithFallback } from './figma/ImageWithFallback';
import { Instagram, Facebook, ExternalLink } from 'lucide-react';
import instagramImage from '../../assets/social-media/instagram.png';
import facebookImage from '../../assets/social-media/facebook.png';

const socialUpdates = [
  {
    id: 2,
    platform: 'Instagram',
    icon: <Instagram size={16} className="text-[#E4405F]" />,
    content: 'See the latest club photos, matchday moments, and community updates on our official Instagram page.',
    date: 'Instagram',
    image: instagramImage,
    link: 'https://www.instagram.com/naomhmairtin/'
  },
  {
    id: 3,
    platform: 'Facebook',
    icon: <Facebook size={16} className="text-[#1877F2]" />,
    content: 'Follow our Facebook page for announcements, fixtures, event reminders, and club news throughout the season.',
    date: 'Facebook',
    image: facebookImage,
    link: 'https://www.facebook.com/NaomhMairtincpg/'
  },
];

export function NewsSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-[#1E3A8A] uppercase tracking-tight">
              Latest Updates
            </h2>
            <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-widest">
              From our social networks
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-[10px] font-black text-[#E4405F] border border-gray-100 uppercase tracking-wider">
              <Instagram size={14} /> Instagram
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-[10px] font-black text-[#1877F2] border border-gray-100 uppercase tracking-wider">
              <Facebook size={14} /> Facebook
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {socialUpdates.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border-2 border-gray-50 overflow-hidden hover:border-[#1E3A8A]/20 hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="aspect-square overflow-hidden relative">
                <ImageWithFallback
                  src={post.image}
                  alt={post.platform}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm flex items-center gap-2">
                  {post.icon}
                  <span className="text-[10px] font-black text-gray-800 uppercase tracking-wider">{post.platform}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow font-medium">
                  {post.content}
                </p>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{post.date}</span>
                  <ExternalLink size={14} className="text-gray-300 group-hover:text-[#1E3A8A] transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
