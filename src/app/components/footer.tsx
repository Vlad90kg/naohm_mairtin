import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';
import clubLogo from '../../assets/lgfa-logo.jpg';

export function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-6">
          {/* Club Logo & Info */}
          <div>
            <div className="mb-4">
              <Link to="/">
                <img src={clubLogo} alt="Naomh Mairtin CLG & LGFA" className="h-20 w-20 object-contain" />
              </Link>
            </div>
            <h3 className="font-bold text-lg mb-2">Naomh Mairtin CLG & LGFA</h3>
            <p className="text-blue-200 text-sm">
              Official GAA Club
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <p className="text-blue-200 text-sm mb-2">
              Naomh Mairtin CLG & LGFA, Sillogue Lane
            </p>
            <p className="text-blue-200 text-sm mb-2">
              Newtown Monasterboice
            </p>
            <p className="text-blue-200 text-sm mb-2">
              Co. Louth - A92 H6787
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Mail className="w-4 h-4 text-blue-200" />
              <a
                href="mailto:secretary.naomhmairtin.louth@gaa.ie"
                className="text-blue-200 text-sm hover:text-white transition-colors"
              >
                secretary.naomhmairtin.louth@gaa.ie
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-blue-200 hover:text-white transition-colors">
                  Teams
                </Link>
              </li>
              <li>
                <Link to="/lotto" className="text-blue-200 hover:text-white transition-colors">
                  Lotto
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-blue-200 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-blue-200 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="text-blue-200 hover:text-white transition-colors">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/child-safety" className="text-blue-200 hover:text-white transition-colors">
                  Child Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-6 text-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} Naomh Mairtin CLG & LGFA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}