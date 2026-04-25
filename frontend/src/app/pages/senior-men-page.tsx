import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';

export function SeniorMenPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface px-4 py-20 text-center text-white sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
              Senior Men
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-blue-100 sm:text-xl">
              Team page coming soon.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-2xl font-black tracking-tight text-[#1E3A8A]">
              Placeholder Content
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              This placeholder page will hold fixtures, squad information, training updates, and other content for the Senior Men team.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
