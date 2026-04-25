import { Users, Baby } from 'lucide-react';
import { Link } from 'react-router';

export function TeamsSection({
  title = 'Our Teams',
  itemsLimit = 2,
}: {
  title?: string;
  itemsLimit?: number;
}) {
  const cards = [
    {
      key: 'adult',
      title: 'Adult Teams',
      icon: Users,
    },
    {
      key: 'juvenile',
      title: 'Juvenile Teams',
      icon: Baby,
    },
  ].slice(0, itemsLimit);

  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-8">
          {title}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.key} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
              <Link
                to="/teams"
                className="inline-block px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A8A] rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-md"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
