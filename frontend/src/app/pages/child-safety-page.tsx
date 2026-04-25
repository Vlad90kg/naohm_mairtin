import { motion } from 'motion/react';
import { ShieldCheck, Users, FileText, AlertCircle, Phone, Mail, Download, ChevronRight, ExternalLink } from 'lucide-react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { useCMS } from '../data/cms-context';

export function ChildSafetyPage() {
  const { pages } = useCMS();
  const { childSafety } = pages;
  const safeguardingContacts = childSafety.contacts;

  // Find contact emails by role
  const childrenOfficer = safeguardingContacts.find(c => c.role.toLowerCase().includes('children\'s officer'));
  const dlp = safeguardingContacts.find(c => c.role.toLowerCase().includes('dlp') || c.role.toLowerCase().includes('designated liaison person'));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      {/* Hero Header */}
      <section className="club-hero-surface px-4 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm"
          >
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {childSafety.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            {childSafety.hero.subtitle}
          </motion.p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 -mt-8">
        
        {/* Safeguarding Statement */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full translate-x-16 -translate-y-16"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#1E3A8A]/5 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Our Safeguarding Commitment</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {childSafety.commitment}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contacts Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-[#1E3A8A]" />
            <h2 className="text-2xl font-bold text-gray-900">Safeguarding Contacts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {safeguardingContacts.map((contact, idx) => (
              <motion.div 
                key={contact.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-[#1E3A8A] text-xs font-bold uppercase tracking-wider rounded-lg mb-4">
                      {contact.role}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{contact.description}</p>
                  </div>
                  <div className="mt-auto space-y-3 pt-6 border-t border-gray-50">
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#1E3A8A] transition-colors group">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[#1E3A8A]/10 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="font-medium truncate">{contact.email}</span>
                      </a>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{contact.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Policies Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-6 h-6 text-[#1E3A8A]" />
            <h2 className="text-2xl font-bold text-gray-900">Policies & Documents</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {childSafety.documents.map((doc, idx) => (
              <motion.div 
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#1E3A8A]/30 transition-all group flex flex-col"
              >
                <div className="w-10 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#1E3A8A] transition-colors">{doc.title}</h4>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Issued {doc.date}</span>
                  <a 
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-[#1E3A8A] group-hover:text-white transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reporting Section */}
        <section className="mb-16">
          <div className="bg-[#1E3A8A] rounded-3xl overflow-hidden shadow-xl text-white relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-32 -translate-y-32"></div>
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between mb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-400">
                    <AlertCircle className="w-6 h-6" />
                    <span className="font-bold uppercase tracking-widest text-sm">Action Required</span>
                  </div>
                  <h2 className="text-3xl font-bold">Reporting a Concern</h2>
                  <p className="text-blue-100 max-w-xl">
                    If you have a concern about a child's welfare or wish to report a breach of code of behavior, please follow these steps.
                  </p>
                </div>
                <a 
                  href="https://www.gaa.ie/the-gaa/child-safeguarding-and-protection" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1E3A8A] font-bold rounded-xl hover:bg-amber-400 transition-colors whitespace-nowrap"
                >
                  GAA National Portal
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {childSafety.steps.map((step, idx) => (
                  <div key={idx} className="relative space-y-3 group">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-white font-bold text-sm">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-blue-100/80 leading-relaxed">
                      {step.description}
                    </p>
                    {idx < childSafety.steps.length - 1 && (
                      <div className="hidden md:block absolute top-4 -right-4 text-white/20">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* National Helplines */}
        <section className="mb-8">
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900">National Support Helplines</h4>
                <p className="text-sm text-amber-700">Tusla Child and Family Agency / An Garda Síochána</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {childSafety.helplines.map((line, idx) => (
                <div key={idx} className="px-4 py-2 bg-white rounded-lg border border-amber-200 text-sm font-bold text-amber-900">
                  {line.name}: {line.phone}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm max-w-4xl mx-auto">
             <h3 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight mb-4">{childSafety.cta.title}</h3>
             <p className="text-gray-500 mb-8 max-w-xl mx-auto">{childSafety.cta.description}</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`mailto:${childrenOfficer?.email || ''}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1E3A8A] text-white font-bold rounded-2xl hover:bg-blue-800 transition-colors uppercase tracking-widest text-xs"
                >
                  Contact Children's Officer
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href={`mailto:${dlp?.email || ''}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-[#1E3A8A] font-bold rounded-2xl hover:bg-amber-500 transition-colors uppercase tracking-widest text-xs"
                >
                  Contact Designated Liaison Person
                  <Mail className="w-4 h-4" />
                </a>
             </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
