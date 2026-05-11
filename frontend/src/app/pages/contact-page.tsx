import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Mail, MapPin, Facebook, Instagram, Send, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { fetchContactPageContent, type ContactPageContent } from '../data/page-content-api';

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState<ContactPageContent>({
    hero: {
      title: 'Get in Touch',
      subtitle: "Have a question about membership, teams, or events? We'd love to hear from you.",
    },
    form: {
      title: 'Send us a Message',
      endpoint: 'https://formspree.io/f/mwvyqgdn',
      successMessage: "Message sent successfully! We'll get back to you soon.",
    },
    contactInfo: {
      clubGroundsTitle: 'Club Grounds',
      clubGroundsAddress: 'Sillogue Lane,\nNewtown Monasterboice,\nCo. Louth, A92 H678',
      emailTitle: 'Email Address',
      email: 'secretary.naomhmairtin.louth@gaa.ie',
      facebookUrl: 'https://www.facebook.com/NaomhMairtincpg/',
      instagramUrl: 'https://www.instagram.com/naomhmairtin/',
    },
    mapQuery: 'Naomh Mairtin CPG, Sillogue Lane, Newtown Monasterboice, Co. Louth',
  });

  useEffect(() => {
    fetchContactPageContent()
      .then((response) => setContent(response))
      .catch((error) => {
        console.error('Failed to load contact page content:', error);
      });
  }, []);

  const fallbackMapQuery = 'Naomh Mairtin CPG, Sillogue Lane, Newtown Monasterboice, Co. Louth';
  const rawMapValue = content.mapQuery?.trim();
  const mapEmbedSrc =
    rawMapValue && /^https?:\/\//i.test(rawMapValue)
      ? rawMapValue
      : `https://www.google.com/maps?q=${encodeURIComponent(rawMapValue || fallbackMapQuery)}&output=embed`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(content.form.endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Formspree request failed with status ${response.status}`);
      }

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; errors?: Array<{ message?: string }> }
        | null;

      if (payload?.ok === false || (Array.isArray(payload?.errors) && payload.errors.length > 0)) {
        const firstErrorMessage = payload?.errors?.[0]?.message;
        throw new Error(firstErrorMessage || 'Formspree rejected the submission.');
      }

      toast.success(content.form.successMessage);
      form.reset();
    } catch (error) {
      console.error('Failed to send contact message:', error);
      const message = error instanceof Error ? error.message : 'Could not send your message. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />
      
      {/* Hero Section */}
      <section className="club-hero-surface px-4 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            {content.hero.subtitle}
          </motion.p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-[#1E3A8A]" />
                {content.form.title}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <input 
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="e.g. Membership Inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-[#1E3A8A] text-white font-bold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden"
            >
              <div className="aspect-[21/9] rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  title="Naomh Mairtin CPG Map"
                  src={mapEmbedSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{content.contactInfo.clubGroundsTitle}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {content.contactInfo.clubGroundsAddress.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{content.contactInfo.emailTitle}</p>
                    <a 
                      href={`mailto:${content.contactInfo.email}`}
                      className="text-[#1E3A8A] hover:underline text-sm break-all"
                    >
                      {content.contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href={content.contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={content.contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Child Safety Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1E3A8A]/5 rounded-2xl p-6 border border-[#1E3A8A]/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-[#1E3A8A]" />
                <h4 className="font-bold text-[#1E3A8A]">Child Safety</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                We are committed to the safety and well-being of all our juvenile members. 
              </p>
              <Link to="/child-safety" className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider hover:underline">
                View Policy & Officers →
              </Link>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
