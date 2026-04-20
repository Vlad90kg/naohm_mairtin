import { motion } from 'motion/react';
import { Navigation } from './navigation';
import { Footer } from './footer';
import { PremiumSponsorBanner } from './premium-sponsor-banner';
import { type ArticlePageContent } from '../data/cms-context';
import { cn } from './ui/utils';

interface ArticlePageProps {
  content: ArticlePageContent;
}

export function ArticlePage({ content }: ArticlePageProps) {
  const { hero, blocks } = content;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        {/* Hero Header */}
        <section className={cn(
          'relative overflow-hidden px-4 py-20 text-white sm:py-28',
          !hero.backgroundImage && 'club-hero-surface'
        )}>
          {hero.backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: `url(${hero.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}
          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4"
            >
              {hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-100/90 font-bold uppercase tracking-[0.2em] text-sm md:text-base"
            >
              {hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Content Blocks */}
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
          {blocks.map((block, idx) => (
            <section 
              key={block.id}
              className={cn(
                "flex flex-col gap-12 items-center",
                block.imagePosition === 'right' ? "lg:flex-row" : "lg:flex-row-reverse",
                block.imagePosition === 'top' && "lg:flex-col",
                block.imagePosition === 'full' && "lg:flex-col"
              )}
            >
              <div className={cn(
                "flex-1 space-y-6",
                block.imagePosition === 'top' || block.imagePosition === 'full' ? "w-full text-center max-w-4xl mx-auto" : ""
              )}>
                {block.title && (
                  <h2 className="text-3xl font-black text-[#1E3A8A] uppercase tracking-tight">
                    {block.title}
                  </h2>
                )}
                <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {block.content}
                </div>
              </div>

              {block.image && (
                <div className={cn(
                  "flex-1 w-full",
                  block.imagePosition === 'full' ? "max-w-7xl" : "max-w-2xl"
                )}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50 aspect-[4/3]"
                  >
                    <img 
                      src={block.image} 
                      alt={block.title || "Content Image"} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
