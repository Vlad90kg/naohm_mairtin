import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from './ui/utils';
import type { ContentPageSectionDTO } from '../data/content-pages-api';

function ManagedImage({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return null;
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

function GallerySection({
  images,
  title,
}: {
  images: ContentPageSectionDTO['gallery_images'];
  title?: string | null;
}) {
  const validImages = images.filter((image) => image.image_url);

  if (!validImages.length) {
    return null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {validImages.map((image, index) => (
        <div key={`${image.image_url}-${index}`} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <ManagedImage
            src={image.image_url}
            alt={image.caption || title || `Gallery image ${index + 1}`}
            className="h-64 w-full object-cover"
          />
          {image.caption && <p className="px-4 py-3 text-sm text-gray-500">{image.caption}</p>}
        </div>
      ))}
    </div>
  );
}

function SectionImage({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-2xl flex-1"
    >
      <div className="overflow-hidden rounded-3xl border-8 border-gray-50 shadow-2xl">
        <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setFailed(true)} />
      </div>
    </motion.div>
  );
}

function ContentSection({ section, index }: { section: ContentPageSectionDTO; index: number }) {
  const isImageText = section.layout_type === 'image_text' && section.image_url;
  const isGallery = section.layout_type === 'gallery';

  return (
    <section
      className={cn(
        'flex flex-col items-start gap-12',
        isImageText && section.image_position === 'right' && 'lg:flex-row',
        isImageText && section.image_position === 'left' && 'lg:flex-row-reverse',
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: index * 0.04 }}
        className={cn('min-w-0 space-y-6', isImageText ? 'flex-1' : 'w-full')}
      >
        {section.title && (
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
            {section.title}
          </h2>
        )}
        {section.body && (
          <div className="max-w-full whitespace-pre-wrap break-words text-lg leading-relaxed text-gray-600">
            {section.body}
          </div>
        )}
        {isGallery && <GallerySection images={section.gallery_images} title={section.title} />}
      </motion.div>

      {isImageText && <SectionImage src={section.image_url} alt={section.title || 'Content image'} />}
    </section>
  );
}

export function FlexibleSections({ sections }: { sections: ContentPageSectionDTO[] }) {
  const activeSections = sections.filter((section) => {
    if (section.layout_type === 'gallery') {
      const galleryImages = Array.isArray(section.gallery_images) ? section.gallery_images : [];
      return Boolean(section.title || section.body || galleryImages.some((image) => image.image_url));
    }

    if (section.layout_type === 'image_text') {
      return Boolean(section.title || section.body || section.image_url);
    }

    return Boolean(section.title || section.body);
  });

  if (!activeSections.length) {
    return null;
  }

  return (
    <div className="space-y-16">
      {activeSections.map((section, index) => (
        <ContentSection key={`${section.title ?? section.layout_type}-${index}`} section={section} index={index} />
      ))}
    </div>
  );
}

