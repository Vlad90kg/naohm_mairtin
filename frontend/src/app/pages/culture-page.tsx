import { ContentPageSlugPage } from './content-page-slug-page';
import { useCMS } from '../data/cms-context';

export function CulturePage() {
  const { pages } = useCMS();

  return <ContentPageSlugPage slug="culture" fallbackContent={pages.culture} />;
}
