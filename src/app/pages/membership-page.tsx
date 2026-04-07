import { motion } from 'motion/react';
import { Smartphone, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCMS } from '../data/cms-context';

export function MembershipPage() {
  const { membership } = useCMS();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="club-hero-surface pt-16 pb-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-700/50"
            >
              <Smartphone size={14} />
              ClubSpot App — Official Club Partner
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-tight"
            >
              Club Membership <br className="hidden md:block" />
              <span className="text-amber-400">Now on ClubSpot</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-100/80 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {membership.description}
            </motion.p>

            {/* App Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* App Store */}
              <a
                href={membership.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-black text-white px-6 py-3.5 rounded-2xl hover:bg-gray-900 transition-all shadow-xl shadow-black/30 hover:-translate-y-0.5 min-w-[200px]"
                aria-label="Download on the App Store"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-0.5">Download on the</p>
                  <p className="text-base font-bold leading-none">App Store</p>
                </div>
              </a>

              {/* Google Play */}
              <a
                href={membership.googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-black text-white px-6 py-3.5 rounded-2xl hover:bg-gray-900 transition-all shadow-xl shadow-black/30 hover:-translate-y-0.5 min-w-[200px]"
                aria-label="Get it on Google Play"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.35.2.74.24 1.12.14L14.89 12 11 8.11 3.18 23.76z" fill="#EA4335"/>
                  <path d="M20.46 10.7l-2.71-1.57L14.89 12l2.86 2.86 2.73-1.58a1.55 1.55 0 0 0 0-2.58z" fill="#FBBC04"/>
                  <path d="M4.3.1C3.92 0 3.53.04 3.18.24L11 8.11 14.89 12l2.86-3.13L4.3.1z" fill="#4285F4"/>
                  <path d="M3.18.24a1.55 1.55 0 0 0-.76 1.37v20.78c0 .6.29 1.1.76 1.37L11 16 3.18.24z" fill="#34A853"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-0.5">Get it on</p>
                  <p className="text-base font-bold leading-none">Google Play</p>
                </div>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6 text-blue-300/60 text-xs"
            >
              Available free on iOS and Android · Powered by ClubSpot
            </motion.p>
          </div>
        </section>

        {/* Membership Poster Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-500 font-black uppercase tracking-widest text-xs">Annual Update</span>
              <h2 className="text-3xl font-black text-[#1E3A8A] uppercase tracking-tight mt-2">2026 Membership Rates</h2>
              <div className="w-20 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white border-8 border-white rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[1/1.4] sm:aspect-[1.4/1]">
                <ImageWithFallback
                  src={membership.poster}
                  alt="Membership Poster 2026"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-8">
                  <p className="text-white text-sm font-bold uppercase tracking-widest bg-amber-500/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
                    Full Rates & Details on ClubSpot
                  </p>
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-center text-gray-400 text-sm font-medium italic">
              Rates updated annually. For any queries, please contact the club registrar.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-[#1E3A8A] uppercase tracking-tight mb-4">Why join via the app?</h2>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    The Naomh Mairtin CPG app powered by ClubSpot is our central hub for all club activity. It's the fastest and most secure way to manage your membership.
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    "Quick and secure digital registration",
                    "Manage family memberships in one place",
                    "Receive official club notifications",
                    "Purchase lotto tickets and club gear",
                    "Access exclusive club content and updates",
                    "Available for both iOS and Android devices",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600 flex-shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="font-bold text-[#1E3A8A] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone mock */}
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 aspect-square rounded-[3rem] shadow-2xl overflow-hidden flex items-center justify-center p-8 rotate-3">
                  <div className="bg-[#1E3A8A] w-full h-full rounded-2xl shadow-inner flex items-center justify-center -rotate-3 border-4 border-[#1E3A8A]/20">
                    <Smartphone size={120} className="text-white/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                      <div className="w-20 h-20 bg-white rounded-2xl mb-4 flex items-center justify-center shadow-lg">
                        <div className="w-12 h-12 bg-[#1E3A8A] rounded-xl" />
                      </div>
                      <span className="text-xl font-black uppercase tracking-widest text-center">Naomh Mairtin CPG App</span>
                      <div className="mt-4 flex gap-2">
                        <span className="text-[9px] bg-white/20 rounded-lg px-2 py-1 font-black uppercase tracking-wider">iOS</span>
                        <span className="text-[9px] bg-white/20 rounded-lg px-2 py-1 font-black uppercase tracking-wider">Android</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200/50 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/50 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* How to Join Steps */}
        <section className="bg-[#1E3A8A] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-3">How to Join</h2>
            <p className="text-blue-200 mb-12 max-w-xl mx-auto">Follow these simple steps to register your membership through the ClubSpot app.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Download the App', desc: 'Get ClubSpot free on the App Store or Google Play.' },
                { step: '2', title: 'Find Our Club', desc: 'Search for "Naomh Mairtin CPG" in the app.' },
                { step: '3', title: 'Register & Pay', desc: 'Complete your membership and pay dues securely online.' },
              ].map((s) => (
                <div key={s.step} className="bg-white/10 rounded-2xl p-6 text-left">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-[#1E3A8A] font-black text-lg">{s.step}</span>
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight mb-2">{s.title}</h3>
                  <p className="text-blue-200 text-sm font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-black text-[#1E3A8A] mb-4 uppercase tracking-tight">Need help with registration?</h3>
            <p className="text-gray-500 font-medium mb-8">
              If you have any issues downloading the app or registering, please contact our club registrar.
            </p>
            <a 
              href="mailto:registrar.naomhmairtin.louth@gaa.ie"
              className="text-[#1E3A8A] font-black flex items-center justify-center gap-2 hover:underline uppercase text-sm tracking-wider"
            >
              Contact Registrar
              <ExternalLink size={16} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
