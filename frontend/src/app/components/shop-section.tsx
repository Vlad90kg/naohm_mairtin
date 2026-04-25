import { ExternalLink, ShoppingBag } from 'lucide-react';
import { cn } from './ui/utils';
import oneillsImg from 'figma:asset/852d2c85a3331660887554d243d06f2c25e7b657.png';
import ccmLogo from '../../assets/clear-cut-marketing-placeholder.svg';

const shops = [
  {
    name: "O'Neills",
    description: "Official Club Gear & Leisurewear",
    url: "https://www.oneills.com/catalogsearch/result/?q=naomh+mairtin",
    image: oneillsImg,
    isLogo: false
  },
  {
    name: "Clear Cut Marketing",
    description: "Official Club Merchandise & Apparel",
    url: "https://clearcutmarketing.ie/",
    image: ccmLogo,
    isLogo: true
  },
  {
    name: "Future Supplier",
    description: "Coming Soon",
    url: "#",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    isLogo: false,
    isPlaceholder: true
  }
];

export function ShopSection({
  title = 'Official Club Shops',
  itemsLimit = 3,
}: {
  title?: string;
  itemsLimit?: number;
}) {
  const visibleShops = shops.slice(0, itemsLimit);

  return (
    <section id="shop" className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#1E3A8A] rounded-full text-[10px] font-black uppercase tracking-widest">
              Storefronts
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1E3A8A] uppercase tracking-tighter">{title}</h2>
            <div className="w-20 h-1.5 bg-amber-400 rounded-full" />
          </div>
          <p className="max-w-md text-gray-500 font-bold text-sm leading-relaxed">
            Support the club by purchasing official gear from our approved retail partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {visibleShops.map((shop) => (
            <div key={shop.name} className={cn("flex flex-col", shop.isPlaceholder && "opacity-60 grayscale hover:grayscale-0 transition-all duration-500")}>
              <a 
                href={shop.url} 
                target={shop.isPlaceholder ? undefined : "_blank"} 
                rel="noopener noreferrer"
                className="group relative flex-grow overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white border-8 border-white aspect-[16/10] flex items-center justify-center"
              >
                {shop.isLogo ? (
                  <div className="w-full h-full p-12 flex items-center justify-center bg-gray-50/50">
                    <img 
                      src={shop.image} 
                      alt={`${shop.name} Shop`} 
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <img 
                    src={shop.image} 
                    alt={`${shop.name} Shop`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <div className="bg-white text-[#1E3A8A] px-6 py-3 rounded-full font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ShoppingBag size={18} />
                    Visit {shop.name}
                  </div>
                </div>
              </a>
              
              <div className="mt-6 text-center md:text-left px-4">
                <h3 className="text-xl font-black text-[#1E3A8A] uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                  {shop.name}
                  <ExternalLink size={16} className="text-amber-500" />
                </h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                  {shop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
