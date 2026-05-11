import { useEffect, useState } from 'react';
import { ContentPage } from '../components/content-page';
import { fetchContentPageBySlug, type ContentPageDTO } from '../data/content-pages-api';
import { ArticlePage } from '../components/article-page';
import type { ArticlePageContent } from '../data/cms-context';

export function ContentPageSlugPage({
  slug,
  fallbackContent,
}: {
  slug: string;
  fallbackContent?: ArticlePageContent;
}) {
  const [content, setContent] = useState<ContentPageDTO | null>(null);
  const [didFail, setDidFail] = useState(false);

  useEffect(() => {
    setDidFail(false);

    fetchContentPageBySlug(slug)
      .then((page) => setContent(page))
      .catch((error) => {
        console.error(`Failed to load content page for slug "${slug}":`, error);
        setDidFail(true);
      });
  }, [slug]);

  if (didFail && fallbackContent) {
    return <ArticlePage content={fallbackContent} />;
  }

  if (!content) {
    return null;
  }

  return <ContentPage content={content} />;
}
