import { Link } from 'react-router';
import clubLogo from '../../assets/lgfa-logo.jpg';
import heroBackground from '../../assets/hero_background.jpg';
import { useCMS } from '../data/cms-context';

export function HeroSection() {
  const { pages } = useCMS();
  const hero = pages.home.hero;
  const backgroundImage = hero.backgroundImage === 'hero_background.jpg' ? heroBackground : hero.backgroundImage;

  return (
    <section className="relative text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center relative z-10">
        {/* Club Badge */}
        <div className="mb-6 flex justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40">
            <img src={clubLogo} alt="Naomh Mairtin CPG Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {hero.title}
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          {hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={hero.primaryButtonLink}
            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A8A] rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-lg w-full sm:w-auto"
          >
            {hero.primaryButtonText}
          </Link>
          <Link
            to={hero.secondaryButtonLink}
            className="px-8 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto"
          >
            {hero.secondaryButtonText}
          </Link>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="rgb(243, 244, 246)"
          />
        </svg>
      </div>
    </section>
  );
}
