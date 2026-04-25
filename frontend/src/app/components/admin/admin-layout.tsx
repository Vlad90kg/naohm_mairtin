import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Award, 
  Ticket, 
  FileText, 
  Menu, 
  X, 
  LogOut,
  ChevronRight,
  Settings,
  CreditCard
} from 'lucide-react';
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Teams', path: '/admin/teams', icon: Users },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Sponsors', path: '/admin/sponsors', icon: Award },
    { name: 'Lotto', path: '/admin/lotto', icon: Ticket },
    { name: 'Membership', path: '/admin/membership', icon: CreditCard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
  ];

  const activePath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 w-72 bg-[#1E3A8A] text-white transform transition-transform duration-300 ease-in-out z-[70] lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col p-6">
            <div className="mb-10 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#1E3A8A] rounded-md" />
                </div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tight">Admin CMS</h1>
                  <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest leading-none">Naomh Mairtin CPG</p>
                </div>
              </Link>
              <button 
                className="lg:hidden p-2 text-white/50 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-grow space-y-2">
              {navItems.map((item) => {
                const isActive = activePath === item.path || (item.path !== '/admin' && activePath.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                      isActive 
                        ? 'bg-amber-400 text-[#1E3A8A] shadow-xl shadow-amber-900/20' 
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-[#1E3A8A]' : 'text-blue-300'} />
                    {item.name}
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-10 border-t border-blue-800 space-y-4">
              <button className="flex items-center gap-4 px-4 py-3 text-blue-300 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors w-full">
                <Settings size={20} /> Settings
              </button>
              <Link 
                to="/"
                className="flex items-center gap-4 px-4 py-3 text-red-300 font-bold uppercase tracking-widest text-xs hover:text-red-200 transition-colors w-full"
              >
                <LogOut size={20} /> Exit CMS
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 text-gray-400"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight">
                {navItems.find(i => i.path === activePath || (i.path !== '/admin' && activePath.startsWith(i.path)))?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-black text-[#1E3A8A] uppercase tracking-tight">Club Secretary</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#1E3A8A] font-black uppercase tracking-widest text-xs">
                CS
              </div>
            </div>
          </header>

          <div className="p-6 md:p-10 flex-grow max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
  );
}
