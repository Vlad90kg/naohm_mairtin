import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import clubLogo from 'figma:asset/c29df835214418d1211d6ebf912ea41a16418b68.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={clubLogo} alt="Naomh Mairtin CPG" className="h-12 w-12 object-contain" />
              <span className="text-xl font-bold text-[#1E3A8A]">Naomh Mairtin CPG</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Home
            </Link>
            
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A] flex items-center gap-1">
                About
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">History</Link>
                <Link to="/committees" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Committees</Link>
                <Link to="/facilities" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Facilities</Link>
                <Link to="/child-safety" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Child Safety</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A] flex items-center gap-1">
                Teams
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/teams" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Club Teams</Link>
                <Link to="/teams/adult" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Adult Teams</Link>
                <Link to="/teams/juvenile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Juvenile Teams</Link>
              </div>
            </div>
            <Link to="/fixtures-results" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Fixtures & Results
            </Link>

            <Link to="/events" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Events
            </Link>
            <Link to="/shop" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Shop
            </Link>
            <Link to="/membership" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Membership
            </Link>
            <Link to="/lotto" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Lotto
            </Link>
            <Link to="/sponsors" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Sponsors
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1E3A8A]">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#1E3A8A]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Home
            </Link>
            <Link to="/history" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              History
            </Link>
            <Link to="/committees" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Committees
            </Link>
            <Link to="/facilities" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Facilities
            </Link>
            <Link to="/child-safety" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Child Safety
            </Link>
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-700">Teams</p>
              <div className="mt-2 ml-3 space-y-1 border-l border-gray-200 pl-3">
                <Link to="/teams" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Club Teams
                </Link>
                <Link to="/teams/adult" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Adult Teams
                </Link>
                <Link to="/teams/juvenile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Juvenile Teams
                </Link>
              </div>
            </div>
            <Link to="/fixtures-results" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Fixtures & Results
            </Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Events
            </Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Shop
            </Link>
            <Link to="/membership" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Membership
            </Link>
            <Link to="/lotto" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Lotto
            </Link>
            <Link to="/sponsors" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Sponsors
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
