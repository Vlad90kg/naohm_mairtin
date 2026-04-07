import { Mail, Phone } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import audreyGannonPhoto from '../../assets/Committee Photos/Audrey Gannon.jpeg';
import avatarPlaceholder from '../../assets/Committee Photos/avatar_placeholder.jpg';
import deirdreRyanPhoto from '../../assets/Committee Photos/Deirdre Ryan.jpeg';
import elmaFloodPhoto from '../../assets/Committee Photos/Elma Flood.jpeg';
import joeWalshPhoto from '../../assets/Committee Photos/Joe Walsh.jpeg';
import martinMcHughPhoto from '../../assets/Committee Photos/Martin Mc Hugh.jpeg';
import neilCooneyPhoto from '../../assets/Committee Photos/Neil Cooney.jpeg';
import patriciaMaddenPhoto from '../../assets/Committee Photos/Patricia Madden.jpeg';
import paulMcDonnellPhoto from '../../assets/Committee Photos/Paul McDonnell.jpeg';

type CommitteeMember = {
  role: string;
  name: string;
  image?: string;
  email?: string;
  phone?: string;
};

type CommitteeSection = {
  title: string;
  members: CommitteeMember[];
};

const committees: CommitteeSection[] = [
  {
    title: 'Senior Committee',
    members: [
      { role: 'Chairperson', name: 'Martin McHugh', image: martinMcHughPhoto },
      { role: 'Vice Chairperson', name: 'Paul McDonnell', image: paulMcDonnellPhoto },
      { role: 'Secretary', name: 'Sandra O’Rourke' },
      { role: 'Treasurer', name: 'Joe Walsh', image: joeWalshPhoto },
      { role: 'Asst Treasurer', name: 'Grainne McCullough' },
      { role: 'Comms Officer', name: 'Ben McCourt' },
      { role: 'Asst Comms Officer', name: 'Claire Clarke' },
      { role: 'Cultural Officer', name: 'Patricia Madden', image: patriciaMaddenPhoto },
      { role: 'Language Officer', name: 'Deirdre Ryan', image: deirdreRyanPhoto },
      { role: 'Health & Wellbeing Officers', name: 'Audrey Gannon & Linda Donohue', image: audreyGannonPhoto },
      { role: 'County Board Reps', name: 'Neil Cooney & Paul Carry', image: neilCooneyPhoto },
      { role: 'Children’s Officer', name: 'Elma Flood', image: elmaFloodPhoto },
      { role: 'Green Club Officer', name: 'Dolores McAloon' },
    ],
  },
  {
    title: 'Ladies Committee',
    members: [
      { role: 'Chairperson', name: 'Stuart McDonnell' },
      { role: 'Secretary', name: 'Edel Matthews' },
    ],
  },
  {
    title: 'Juvenile Committee',
    members: [
      { role: 'Co-Chairperson', name: 'Ollie Ginty' },
      { role: 'Co-Chairperson', name: 'Ailish Harty' },
      { role: 'Coaching Officer', name: 'Francis McCullough' },
    ],
  },
];

function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex justify-center">
        <img
          src={member.image ?? avatarPlaceholder}
          alt={member.name}
          className="h-28 w-28 rounded-full object-cover shadow-sm"
        />
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-500">
        {member.role}
      </p>
      <h3 className="mt-3 text-xl font-black tracking-tight text-[#1E3A8A]">
        {member.name}
      </h3>

      {(member.email || member.phone) && (
        <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#1E3A8A]"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">{member.email}</span>
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-[#1E3A8A]"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>{member.phone}</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function CommitteesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface px-4 py-20 text-center text-white sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
              Club Committees
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-blue-100 sm:text-xl">
              Meet the people behind Naomh Mairtin CPG
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl space-y-12">
            {committees.map((committee) => (
              <section key={committee.title} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="rounded-full border border-gray-100 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#1E3A8A] shadow-sm">
                    {committee.title}
                  </h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {committee.members.map((member) => (
                    <CommitteeMemberCard
                      key={`${committee.title}-${member.role}-${member.name}`}
                      member={member}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
