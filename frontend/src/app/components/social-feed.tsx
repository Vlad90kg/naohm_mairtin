import { ExternalLink, Facebook, Instagram } from 'lucide-react';
import instagramFallbackImage from '../../assets/social-media/instagram.png';
import { useCMS } from '../data/cms-context';

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/NaomhMairtincpg/';

export function SocialFeed() {
  const { pages } = useCMS();
  const instagramLatestPostImage =
    pages.home.social.instagramLatestPostImage === 'instagram.png'
      ? instagramFallbackImage
      : pages.home.social.instagramLatestPostImage;

  const facebookEmbedUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    FACEBOOK_PAGE_URL,
  )}&tabs=timeline&width=500&height=720&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
              Latest Updates
            </h2>
            <p className="mt-1 text-sm font-bold uppercase tracking-widest text-gray-500">
              From our social networks
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#E4405F]">
              <Instagram size={14} />
              Instagram
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#1877F2]">
              <Facebook size={14} />
              Facebook
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(30,58,138,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE7EF]">
                  <Instagram size={18} className="text-[#E4405F]" />
                </div>
                <div>
                  <p className="text-base font-black tracking-tight text-[#1E3A8A]">Latest Instagram Post</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                    Managed from Home page CMS
                  </p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/naomhmairtin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 transition-colors hover:text-[#1E3A8A]"
              >
                Open profile
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-[#fafbff]">
              <a
                href="https://www.instagram.com/naomhmairtin/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block min-h-[34rem] w-full overflow-hidden"
              >
                <img
                  src={instagramLatestPostImage}
                  alt="Latest Instagram post"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </a>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[2rem] border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(30,58,138,0.08)]">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2FF]">
                  <Facebook size={18} className="text-[#1877F2]" />
                </div>
                <div>
                  <p className="text-base font-black tracking-tight text-[#1E3A8A]">Facebook Timeline</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                    Official page embed
                  </p>
                </div>
              </div>
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 transition-colors hover:text-[#1E3A8A]"
              >
                Open page
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-[#fafbff]">
              <div className="relative min-h-[34rem] w-full">
                <iframe
                  title="Naomh Mairtin Facebook timeline"
                  src={facebookEmbedUrl}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
