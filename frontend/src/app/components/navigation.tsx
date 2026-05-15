import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import clubLogo from '../../assets/lgfa-logo.jpg';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[3.25rem]">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2.5">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <img src={clubLogo} alt="Naomh Mairtin CPG & LGFA" className="h-9 w-9 object-contain" />
              <span className="text-[1.05rem] font-bold text-[#1E3A8A]">Naomh Mairtin CPG & LGFA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Home
            </Link>
            
            <div className="relative group">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A] flex items-center gap-1">
                About
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/history" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">History</Link>
                <Link to="/committees" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Committees</Link>
                <Link to="/facilities" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Facilities</Link>
                <Link to="/health-wellbeing" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Health & Wellbeing</Link>
                <Link to="/culture" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Culture</Link>
                <Link to="/child-safety" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Child Safety</Link>
              </div>
            </div>

            <div className="relative group">
              <Link to="/teams" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A] flex items-center gap-1">
                Teams
                <ChevronDown className="h-4 w-4" />
              </Link>
              <div className="absolute left-0 mt-0 w-56 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="relative group/adult">
                  <Link to="/teams/adult" className="flex items-center justify-between px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    Adult Teams
                    <ChevronDown className="-rotate-90 h-4 w-4" />
                  </Link>
                  <div className="absolute left-full top-0 ml-0.5 w-56 rounded-md bg-white shadow-lg opacity-0 invisible group-hover/adult:opacity-100 group-hover/adult:visible transition-all">
                    <Link to="/teams/senior-men" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Senior Men</Link>
                    <Link to="/teams/senior-ladies" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Senior Ladies</Link>
                  </div>
                </div>
                <Link to="/teams/juvenile" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Juvenile Teams</Link>
                <Link to="/teams/adult/social" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Social</Link>
                <Link to="/scor" className="block px-3.5 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Scór</Link>
              </div>
            </div>
            <Link to="/fixtures-results" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Fixtures & Results
            </Link>

            <Link to="/events" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Events
            </Link>
            <Link to="/shop" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Shop
            </Link>
            <Link to="/membership" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Membership
            </Link>
            <Link to="/lotto" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Lotto
            </Link>
            <Link to="/sponsors" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Sponsors
            </Link>
            <Link to="/contact" className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#1E3A8A]"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-1.5 pt-1 pb-2 space-y-0.5">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Home
            </Link>
            <Link to="/history" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              History
            </Link>
            <Link to="/committees" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Committees
            </Link>
            <Link to="/facilities" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Facilities
            </Link>
            <Link to="/health-wellbeing" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Health & Wellbeing
            </Link>
            <Link to="/culture" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Culture
            </Link>
            <Link to="/child-safety" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Child Safety
            </Link>
            <div className="px-2.5 py-1">
              <Link to="/teams" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
                Teams
              </Link>
              <div className="mt-2 ml-3 space-y-1 border-l border-gray-200 pl-3">
                <Link to="/teams/adult" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
                  Adult Teams
                </Link>
                <div className="ml-3 space-y-1 border-l border-gray-200 pl-3">
                  <Link to="/teams/senior-men" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
                    Senior Men
                  </Link>
                  <Link to="/teams/senior-ladies" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
                    Senior Ladies
                  </Link>
                </div>
                <Link to="/teams/juvenile" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
                  Juvenile Teams
                </Link>
                <Link to="/teams/adult/social" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
                  Social
                </Link>
                <Link to="/scor" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
                  Scór
                </Link>
              </div>
            </div>
            <Link to="/fixtures-results" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Fixtures & Results
            </Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Events
            </Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Shop
            </Link>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Membership
            </Link>
            <Link to="/lotto" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Lotto
            </Link>
            <Link to="/sponsors" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Sponsors
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-2.5 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-[3px]">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
