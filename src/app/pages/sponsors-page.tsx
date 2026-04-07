import { Link } from 'react-router';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

import logoXL from "figma:asset/f53629ddb107c4b3ee14a45135a4df4c1c062460.png";
import logoBeltec from "figma:asset/0d2864839ffd3906f94a2f3891988093fdd4583d.png";
import logoTrinity from "figma:asset/53c88e94157083d2c282cf63c7b59e3ea670b6f1.png";
import logoAssist from "figma:asset/874b8970ede3b31f3c2a7db9348b3e6d40fea3f4.png";
import logoStirue from "figma:asset/92bd99e4a15ca20e57c6964cdc27e88788461d2a.png";
import logoBoylan from "figma:asset/da297634fb1eea9c76882865827d3413545a5d56.png";
import logoDrogheda from "figma:asset/1710ea26cbece1ab6961c7d015a6977e2e6d4a47.png";
import logoTony from "figma:asset/08b5df057017e6d791a7b6673cd340457b4e871f.png";
import logoBelview from "figma:asset/3be250974f17bcfb90f6d8ff4668a77936a340a4.png";
import logoHomeInstead from "figma:asset/c981f3b3f69e9057f76ab3ba1e6cb0b3c6bebf51.png";

/**
 * Full club sponsor directory.
 * To add / remove a sponsor: edit `allSponsors` below.
 * No tier labels shown — all sponsors appear with equal visual weight.
 */
const allSponsors = [
  { name: 'XL Tenure Stores', logo: logoXL, url: '#' },
  { name: 'Beltec Construction', logo: logoBeltec, url: '#' },
  { name: 'Trinity Finances', logo: logoTrinity, url: '#' },
  { name: 'Assist Electrical', logo: logoAssist, url: '#' },
  { name: 'Boylan Print Group', logo: logoBoylan, url: '#' },
  { name: 'Stirue Fencing', logo: logoStirue, url: '#' },
  { name: 'Drogheda Hire & Sales', logo: logoDrogheda, url: '#' },
  { name: 'Tony OBrien Body Repairs', logo: logoTony, url: '#' },
  { name: 'Belview Eggs', logo: logoBelview, url: '#' },
  { name: 'Home Instead', logo: logoHomeInstead, url: '#' },
];

/** Individual sponsor logo — large, clean, no card styling */
function SponsorLogo({ sponsor }: { sponsor: (typeof allSponsors)[0] }) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Visit ${sponsor.name}`}
      className="group flex items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#1E3A8A]/20 transition-all duration-300 hover:shadow-xl"
    >
      <div className="h-[80px] sm:h-[120px] w-full flex items-center justify-center">
        <ImageWithFallback
          src={sponsor.logo}
          alt={sponsor.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </a>
  );
}

export function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Sticky nav */}
      <Navigation />

      {/* Premium banner — below nav, above page header */}
      <PremiumSponsorBanner />

      {/* Page Header */}
      <section className="club-hero-surface text-white py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em] mb-3">
            Naomh Mairtin CPG
          </p>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tight">Club Sponsors</h1>
          <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto">
            Supporting our club, our community, and the future of Naomh Mairtin CPG.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-amber-400/10 skew-x-12 transform translate-x-20" />
      </section>

      {/* Full Sponsors Grid */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Section intro */}
          <div className="text-center mb-12">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.25em] mb-2">
              Our Partners
            </p>
            <h2 className="text-3xl font-black text-[#1E3A8A] uppercase tracking-tight mb-4">
              Thank You to All Our Sponsors
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Each of the businesses below play a vital role in keeping Naomh Mairtin CPG strong.
              Please support those who support us.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {allSponsors.map((sponsor, index) => (
              <SponsorLogo key={index} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1E3A8A] rounded-[4rem] p-12 sm:p-20 text-center text-white relative overflow-hidden shadow-2xl border-8 border-white">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight">
                Become a Club Sponsor
              </h2>
              <p className="text-blue-100 mb-12 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Partner with Naomh Mairtin CPG and help our community grow stronger. We offer tailored sponsorship
                opportunities for businesses of all sizes.
              </p>
              <Link
                to="/contact"
                className="inline-block px-14 py-5 bg-amber-400 text-[#1E3A8A] rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-2xl hover:-translate-y-2 text-lg"
              >
                Get in Touch
              </Link>
            </div>
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
