import {
  BookOpenText,
  ChevronRight,
  ClipboardList,
  HeartHandshake,
  Mic2,
  Music2,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';

const adultTeams = [
  {
    title: 'Senior Men',
    description: 'Access the dedicated senior men team page for fixtures, updates, and team information.',
    href: '/teams/senior-men',
  },
  {
    title: 'Senior Ladies',
    description: 'Access the dedicated senior ladies team page for fixtures, updates, and team information.',
    href: '/teams/senior-ladies',
  },
];

const juvenileGroups = [
  'All Stars',
  'U7',
  'U8',
  'U9',
  'U10',
  'U11',
  'U12',
  'U13',
  'U14',
  'U15',
  'U16',
  'Minor',
];

const socialGroups = [
  {
    title: 'Gaelic for Mothers and Others (G4MO)',
    description: 'A welcoming social football pathway for women who want to stay active and connected through the club.',
    href: '/teams/adult/social/g4mo',
    icon: HeartHandshake,
  },
  {
    title: 'Gaelic for Dads and Lads (G4DL)',
    description: 'A relaxed social football option for men who want to enjoy the game and be part of club life.',
    href: '/teams/adult/social/g4dl',
    icon: Shield,
  },
  {
    title: 'Furious but not Fast',
    description: 'A social running group focused on movement, encouragement, and shared participation.',
    href: '/teams/adult/social/furious-but-not-fast',
    icon: Zap,
  },
];

const scorActivities = [
  { title: 'Music', icon: Music2 },
  { title: 'Singing', icon: Mic2 },
  { title: 'Dancing', icon: Sparkles },
  { title: 'Storytelling', icon: BookOpenText },
  { title: 'Quiz', icon: ClipboardList },
];

const gallerySlots = Array.from({ length: 6 }, (_, index) => index + 1);

export function TeamsPage() {
  return (
    <TeamsPageShell
      title="OUR TEAMS"
      subtitle="Explore adult teams, juvenile teams, social groups, and cultural activity across Naomh Mairtin CPG"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        <section className="space-y-6">
          <TeamsSectionIntro
            eyebrow="Adult Teams"
            title="Adult Teams"
            description="Access the adult football pathway below, with direct links to the senior team pages and the social area through the Teams dropdown."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {adultTeams.map((team) => (
              <article
                key={team.title}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10"
              >
                <div className="max-w-xl space-y-5">
                  <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A] sm:text-3xl">
                    {team.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {team.description}
                  </p>
                  <Link
                    to={team.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                  >
                    View Team
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <TeamsSectionIntro
            eyebrow="Juvenile Teams"
            title="Juvenile Teams"
            description="A full juvenile structure from All Stars through to Minor, shown here as a clean grid of team boxes."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {juvenileGroups.map((group) => (
              <article
                key={group}
                className="rounded-[2rem] border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-black tracking-tight text-[#1E3A8A]">
                  {group}
                </h3>
              </article>
            ))}
          </div>

          <div>
            <Link
              to="/teams/juvenile"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
            >
              View Juvenile Page
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <TeamsSectionIntro
            eyebrow="Social"
            title="Social"
            description="The social side of the club sits within the adult pathway and includes dedicated pages for each group."
          />

          <div className="grid gap-6 xl:grid-cols-3">
            {socialGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/10">
                  <group.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A]">
                  {group.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {group.description}
                </p>
                <Link
                  to={group.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                >
                  View Group
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div>
            <Link
              to="/teams/adult/social"
              className="inline-flex items-center gap-2 rounded-xl border border-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-[#1E3A8A] transition-colors hover:bg-blue-50"
            >
              Social Overview
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="space-y-8">
          <TeamsSectionIntro
            eyebrow="Scór"
            title="Scór"
            description="A dedicated cultural section celebrating the creative and community side of the club."
          />

          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-600">
              About Scór
            </p>
            <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
              Scór celebrates the cultural side of the GAA through performance, creativity, and community participation.
              This section is ready for future content about club involvement, events, achievements, and how members can take part.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {scorActivities.map((activity) => (
              <article
                key={activity.title}
                className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/10">
                  <activity.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A]">
                  {activity.title}
                </h3>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-600">
                Media
              </p>
              <h3 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
                Gallery
              </h3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallerySlots.map((slot) => (
                <div
                  key={slot}
                  className="flex aspect-[4/3] items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 text-center"
                >
                  <span className="text-sm font-black uppercase tracking-[0.18em] text-gray-400">
                    Image Placeholder
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </TeamsPageShell>
  );
}
