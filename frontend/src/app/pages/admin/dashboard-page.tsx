import { Link } from 'react-router';
import { 
  Users, 
  Calendar, 
  Award, 
  Ticket, 
  Plus, 
  ArrowUpRight,
  History,
  LayoutDashboard,
  FileText,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { useCMS } from '../../data/cms-context';

export function DashboardPage() {
  const { teams, events, sponsors, lotto } = useCMS();

  const stats = [
    { name: 'Active Teams', value: teams.length, icon: Users, color: 'bg-blue-500', path: '/admin/teams' },
    { name: 'Upcoming Events', value: events.length, icon: Calendar, color: 'bg-amber-500', path: '/admin/events' },
    { name: 'Current Sponsors', value: sponsors.length, icon: Award, color: 'bg-green-500', path: '/admin/sponsors' },
    { name: 'Lotto Jackpot', value: lotto.jackpot, icon: Ticket, color: 'bg-red-500', path: '/admin/lotto' },
  ];

  const recentEdits = [
    { title: 'Senior Men Training Update', type: 'Team Edit', time: '2 hours ago', icon: Users },
    { title: 'Cul Camp Registration Live', type: 'Event Add', time: '5 hours ago', icon: Calendar },
    { title: 'New Silver Sponsor: Beltec', type: 'Sponsor Add', time: 'Yesterday', icon: Award },
    { title: 'Weekly Lotto Draw Results', type: 'Lotto Update', time: '2 days ago', icon: Ticket },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <section className="bg-[#1E3A8A] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <p className="text-amber-400 font-black uppercase tracking-[0.25em] text-xs mb-3">Naomh Mairtin CPG</p>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4 leading-tight">Club CMS Dashboard</h1>
          <p className="text-blue-100/80 font-medium max-w-xl text-lg leading-relaxed">
            Manage your club's online presence with ease. Update teams, post events, 
            coordinate sponsors, and announce lotto winners from one central hub.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link 
              to="/admin/events" 
              className="px-8 py-4 bg-amber-400 text-[#1E3A8A] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-500 transition-all flex items-center gap-2 shadow-xl shadow-amber-900/40"
            >
              <Plus size={18} /> Add New Event
            </Link>
            <Link 
              to="/admin/lotto" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              Update Lotto
            </Link>
          </div>
        </div>
        {/* Background art */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-400/5 -skew-x-12 translate-x-20" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </section>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            to={stat.path}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
          >
            <div className={`w-14 h-14 ${stat.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} className={stat.color.replace('bg-', 'text-')} />
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
            <p className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight leading-none">{stat.value}</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600">
              Manage Section <ArrowUpRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Recent Activity */}
        <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3">
              <History size={20} className="text-amber-500" /> Recent Activity
            </h3>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
              View All
            </button>
          </div>
          <div className="p-2">
            {recentEdits.map((edit, idx) => (
              <div key={idx} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors rounded-[1.5rem] group">
                <div className="w-12 h-12 bg-blue-50 text-[#1E3A8A] rounded-xl flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-all">
                  <edit.icon size={22} />
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-[#1E3A8A] leading-tight">{edit.title}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    {edit.type} · {edit.time}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-amber-500 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions / Shortcuts */}
        <section className="space-y-6">
          <h3 className="text-lg font-black text-[#1E3A8A] uppercase tracking-tight flex items-center gap-3 ml-4">
            <LayoutDashboard size={20} className="text-amber-500" /> Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Update Lotto Winning Numbers', icon: Ticket, path: '/admin/lotto' },
              { title: 'Edit Homepage Hero Content', icon: FileText, path: '/admin/pages' },
              { title: 'Update Club Membership Poster', icon: CreditCard, path: '/admin/membership' },
              { title: 'Manage Sponsor Visibility', icon: Award, path: '/admin/sponsors' },
            ].map((action, idx) => (
              <Link 
                key={idx}
                to={action.path}
                className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-400 group-hover:text-[#1E3A8A] transition-all">
                    <action.icon size={20} />
                  </div>
                  <span className="font-black text-[#1E3A8A] uppercase tracking-tight text-xs">{action.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-[#1E3A8A] transition-all">
                  <Plus size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
