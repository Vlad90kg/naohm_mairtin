import { ArticlePage } from '../components/article-page';
import { useCMS } from '../data/cms-context';

export function HealthWellbeingPage() {
  const { pages } = useCMS();
  const { healthWellbeing } = pages;

  return <ArticlePage content={healthWellbeing} />;
}
