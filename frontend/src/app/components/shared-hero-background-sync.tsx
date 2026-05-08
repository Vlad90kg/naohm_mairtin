import { useEffect } from 'react';
import heroBackground from '../../assets/hero_background.jpg';
import { useCMS } from '../data/cms-context';

function resolveHeroBackground(backgroundImage?: string): string {
  if (!backgroundImage || backgroundImage === 'hero_background.jpg') {
    return heroBackground;
  }

  return backgroundImage;
}

export function SharedHeroBackgroundSync() {
  const { pages } = useCMS();
  const backgroundUrl = resolveHeroBackground(pages.home.hero.backgroundImage);

  useEffect(() => {
    document.documentElement.style.setProperty('--club-hero-background-image', `url("${backgroundUrl}")`);
  }, [backgroundUrl]);

  return null;
}

