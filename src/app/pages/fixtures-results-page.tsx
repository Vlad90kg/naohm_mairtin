import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Footer } from '../components/footer';

type Fixture = {
  team: string;
  opponent: string;
  date: string;
  location: string;
};

type Result = {
  team: string;
  opponent: string;
  score: string;
  date: string;
};

const upcomingFixtures: Fixture[] = [
  {
    team: 'Senior Men',
    opponent: 'St. Mary’s',
    date: 'Saturday, April 18',
    location: 'Pairc Naomh Mairtin',
  },
  {
    team: 'Senior Ladies',
    opponent: 'Newtown Blues',
    date: 'Sunday, April 19',
    location: 'Newtown Blues Grounds',
  },
  {
    team: 'Minor Men',
    opponent: 'Drogheda Gaels',
    date: 'Wednesday, April 22',
    location: 'Monasterboice',
  },
];

const recentResults: Result[] = [
  {
    team: 'Senior Men',
    opponent: 'Clan na Gael',
    score: '2-14 to 1-10',
    date: 'Sunday, April 7',
  },
  {
    team: 'Senior Ladies',
    opponent: 'Geraldines',
    score: '1-11 to 0-09',
    date: 'Saturday, April 6',
  },
  {
    team: 'U16 Boys',
    opponent: 'Mattock Rangers',
    score: '3-08 to 2-12',
    date: 'Thursday, April 4',
  },
];

export function FixturesResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface px-4 py-20 text-center text-white sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
              Fixtures & Results
            </h1>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl space-y-12">
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
                  Upcoming Fixtures
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {upcomingFixtures.map((fixture) => (
                  <article
                    key={`${fixture.team}-${fixture.opponent}-${fixture.date}`}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                      {fixture.team}
                    </p>
                    <h3 className="mt-3 text-xl font-black tracking-tight text-[#1E3A8A]">
                      vs {fixture.opponent}
                    </h3>
                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                      <p><span className="font-bold text-gray-800">Date:</span> {fixture.date}</p>
                      <p><span className="font-bold text-gray-800">Location:</span> {fixture.location}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
                  Recent Results
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recentResults.map((result) => (
                  <article
                    key={`${result.team}-${result.opponent}-${result.date}`}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                      {result.team}
                    </p>
                    <h3 className="mt-3 text-xl font-black tracking-tight text-[#1E3A8A]">
                      vs {result.opponent}
                    </h3>
                    <div className="mt-5 space-y-2 text-sm text-gray-600">
                      <p><span className="font-bold text-gray-800">Score:</span> {result.score}</p>
                      <p><span className="font-bold text-gray-800">Date:</span> {result.date}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
