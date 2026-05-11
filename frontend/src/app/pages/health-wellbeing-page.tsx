import { ContentPageSlugPage } from './content-page-slug-page';
import { useCMS } from '../data/cms-context';

export function HealthWellbeingPage() {
  const { pages } = useCMS();

  return <ContentPageSlugPage slug="health-wellbeing" fallbackContent={pages.healthWellbeing} />;
}
