import { motion } from 'motion/react';
import { ShoppingBag, ExternalLink, ArrowRight } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';
import oneillsImg from 'figma:asset/852d2c85a3331660887554d243d06f2c25e7b657.png';
import ccmLogo from '../../assets/clear-cut-marketing-placeholder.svg';

/**
 * Official Club Shop page — Naomh Mairtin CPG
 * Update the `shops` array below to add, remove, or change shop providers.
 */
const shops = [
  {
    name: "O'Neills",
    description: "Official Club Gear & Leisurewear",
    detail: "Browse and order official Naomh Mairtin CPG jerseys, training gear, and leisurewear directly from O'Neills — the GAA's trusted kit supplier.",
    url: "https://www.oneills.com/catalogsearch/result/?q=naomh+mairtin",
    image: oneillsImg,
    isLogo: false,
    cta: "Shop O'Neills",
  },
  {
    name: "Clear Cut Marketing",
    description: "Official Club Merchandise & Apparel",
    detail: "Personalised club merchandise, custom apparel, and supporter gear from our local marketing and print partner, Clear Cut Marketing.",
    url: "https://clearcutmarketing.ie/",
    image: ccmLogo,
    isLogo: true,
    cta: "Shop Clear Cut",
  },
];

export function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      {/* Hero */}
      <section className="club-hero-surface py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-800/50 text-blue-200 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-700/50"
          >
            <ShoppingBag size={14} />
            Official Club Stores
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none"
          >
            Club <span className="text-amber-400">Shop</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100/80 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Support Naomh Mairtin CPG by purchasing official gear and merchandise through our approved retail partners.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-amber-400/10 skew-x-12 transform translate-x-20" />
      </section>

      {/* Shops Grid */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 mb-16">
          {shops.map((shop, i) => (
            <motion.div
              key={shop.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              {/* Image card */}
              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white border-8 border-white aspect-[16/10] flex items-center justify-center"
              >
                {shop.isLogo ? (
                  <div className="w-full h-full p-12 flex items-center justify-center bg-gray-50/50">
                    <img
                      src={shop.image}
                      alt={`${shop.name} Shop`}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <img
                    src={shop.image}
                    alt={`${shop.name} Shop`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <div className="bg-white text-[#1E3A8A] px-6 py-3 rounded-full font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ShoppingBag size={18} />
                    {shop.cta}
                  </div>
                </div>
              </a>

              {/* Text */}
              <div className="mt-6 px-2">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">{shop.name}</h2>
                  <ExternalLink size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-3">{shop.description}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{shop.detail}</p>
                <a
                  href={shop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-blue-800 transition-colors"
                >
                  {shop.cta}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-[#1E3A8A]" />
          </div>
          <h3 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight mb-3">Need Help with an Order?</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            For queries about club orders, sizes, or custom printing, contact the club directly or reach out to our retail partners using the links above.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-amber-400 text-[#1E3A8A] rounded-xl font-black text-sm uppercase tracking-wider hover:bg-amber-300 transition-colors"
          >
            Contact the Club
            <ArrowRight size={16} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
