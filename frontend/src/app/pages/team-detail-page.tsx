import { useEffect, useState } from 'react';
import { Loader2, Mail, Phone, Users } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Footer } from '../components/footer';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { fetchTeamBySlug, type ApiTeam } from '../data/fixtures-results-api';

export function TeamDetailPage() {
  const { slug = '' } = useParams();
  const [team, setTeam] = useState<ApiTeam | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadTeam = async () => {
      try {
        const data = await fetchTeamBySlug(slug);
        if (!ignore) {
          setTeam(data);
        }
      } catch (error) {
        console.error('Failed to load team:', error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadTeam();

    return () => {
      ignore = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-16">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-[#1E3A8A]" />
          </div>
        ) : team ? (
          <article className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-8 py-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                {team.category_display}
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1E3A8A]">{team.name}</h1>
            </div>

            <div className="grid gap-8 p-8 md:grid-cols-[280px_1fr]">
              <div className="rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6">
                {team.image ? (
                  <img src={team.image} alt={team.name} className="h-56 w-full rounded-[1.25rem] object-cover" />
                ) : (
                  <div className="flex h-56 items-center justify-center rounded-[1.25rem] bg-white text-[#1E3A8A]">
                    <Users className="h-10 w-10" />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Coaches</h2>
                  <div className="mt-3 space-y-2">
                    {team.managers.length > 0 ? (
                      team.managers.map((manager, index) => (
                        <div key={`${manager.name}-${index}`} className="rounded-xl bg-gray-50 px-4 py-3">
                          <p className="font-bold text-[#1E3A8A]">
                            {manager.name}{' '}
                            {manager.role ? <span className="text-xs font-normal text-gray-400">({manager.role})</span> : null}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                            {manager.phone ? <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{manager.phone}</span> : null}
                            {manager.email ? <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{manager.email}</span> : null}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">No coaches listed.</p>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Training Times</h2>
                  <div className="mt-3 space-y-2">
                    {team.training_times.length > 0 ? (
                      team.training_times.map((time, index) => (
                        <div key={`${time}-${index}`} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                          {time}
                        </div>
                      ))
                    ) : (
                      <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">Training times TBC.</p>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Contact</h2>
                  <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {team.contact_email || 'No contact email listed.'}
                  </div>
                </section>

                <Link to="/teams" className="inline-flex items-center rounded-xl bg-[#1E3A8A] px-5 py-3 text-sm font-black uppercase tracking-wider text-white">
                  Back to Teams
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Team not found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
