import { ArticlePage } from '../components/article-page';
import { useCMS } from '../data/cms-context';

export function CulturePage() {
  const { pages } = useCMS();
  const { culture } = pages;

  return <ArticlePage content={culture} />;
}
