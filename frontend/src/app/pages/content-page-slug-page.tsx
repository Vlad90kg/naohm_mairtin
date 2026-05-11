import { useEffect, useState } from 'react';
import { ContentPage } from '../components/content-page';
import { fetchContentPageBySlug, type ContentPageDTO } from '../data/content-pages-api';
import { ArticlePage } from '../components/article-page';
import type { ArticlePageContent } from '../data/cms-context';
import type { ReactNode } from 'react';

export function ContentPageSlugPage({
  slug,
  fallbackContent,
  fallback,
}: {
  slug: string;
  fallbackContent?: ArticlePageContent;
  fallback?: ReactNode;
}) {
  const [content, setContent] = useState<ContentPageDTO | null>(null);
  const [didFail, setDidFail] = useState(false);

  useEffect(() => {
    setContent(null);
    setDidFail(false);

    fetchContentPageBySlug(slug)
      .then((page) => setContent(page))
      .catch((error) => {
        console.error(`Failed to load content page for slug "${slug}":`, error);
        setContent(null);
        setDidFail(true);
      });
  }, [slug]);

  if (didFail && fallbackContent) {
    return <ArticlePage content={fallbackContent} />;
  }

  if (didFail && fallback) {
    return <>{fallback}</>;
  }

  if (!content) {
    return null;
  }

  return <ContentPage content={content} />;
}
