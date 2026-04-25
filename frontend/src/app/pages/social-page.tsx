import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { TeamsPageShell, TeamsSectionIntro } from '../components/teams-page-shell';
import g4mo from "../../assets//social/g4mo.jpeg";
import g4dl from "../../assets/social/g4dl.jpg";
import furious from "../../assets/social/furious-but-not-fast.png";
const socialGroups = [
  {
    title: 'Gaelic for Mothers and Others (G4MO)',
    description:
      'A welcoming social football option for women who want to stay active, enjoy Gaelic games, and be part of the club community.',
    href: '/teams/adult/social/g4mo',
    image: g4mo,
  },
  {
    title: 'Gaelic for Dads and Lads (G4DL)',
    description:
      'A social football space for men who want to get involved, stay moving, and enjoy the club in a relaxed setting.',
    href: '/teams/adult/social/g4dl',
    image: g4dl,
  },
  {
    title: 'Furious but not Fast',
    description:
      'A club running group focused on consistency, encouragement, and shared sessions for members who want a social way to keep fit.',
    href: '/teams/adult/social/furious-but-not-fast',
    image: furious,
  },
];

export function SocialPage() {
  return (
    <TeamsPageShell
      title="Social"
      subtitle="Explore the social side of the adult pathway at Naomh Mairtin CPG"
    >
      <div className="space-y-10">
        <TeamsSectionIntro
          eyebrow="Adult Teams"
          title="Social"
          description="Choose one of the club’s social groups below to view its dedicated page."
        />

        <div className="grid gap-6 xl:grid-cols-3">
          {socialGroups.map((group) => (
              <article className="flex flex-col rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 h-60 w-full flex items-center justify-center bg-gray-50 rounded-2xl">
                  <img
                      src={group.image}
                      alt={group.title}
                      className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h3 className="text-2xl font-black tracking-tight text-[#1E3A8A]">
                  {group.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {group.description}
                </p>

                <Link
                    to={group.href}
                    className="mt-auto inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-blue-800"
                >
                  View Group
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </article>
          ))}
        </div>
      </div>
    </TeamsPageShell>
  );
}
