import { UserPlus } from 'lucide-react';
import { Link } from 'react-router';

export function MembershipCTA() {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-4">
          Become a member of Naomh Mairtin CPG
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Join our club and be part of the Naomh Mairtin family
        </p>
        <Link
          to="/membership"
          className="inline-block px-10 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-[#1E3A8A] rounded-lg font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all shadow-lg text-lg"
        >
          Become a Member
        </Link>
      </div>
    </section>
  );
}