import ashcroftDevelopmentsLogo from '../../assets/sponsors/ashcroft developments.jpg';
import assistElectricalLogo from '../../assets/sponsors/assist electrical service.png';
import belviewEggLogo from '../../assets/sponsors/belview egg.png';
import callananAutosLogo from '../../assets/sponsors/calanan autos logo.png';
import campbellsBuildPaveLogo from '../../assets/sponsors/campells build and pave logo.png';
import declanBraniganLogo from '../../assets/sponsors/declan branigan.png';
import devineBuildingServicesLogo from '../../assets/sponsors/devinebuilding.png';
import droghedaCreditUnionLogo from '../../assets/sponsors/drogheda credit union.png';
import droghedaHireLogo from '../../assets/sponsors/drogheda hire.png';
import eleanorKellyLogo from '../../assets/sponsors/eleanor kelly.png';
import jasonFahyHeatingLogo from '../../assets/sponsors/jason-fahy-heating-ico.png';
import jimFarrellLogo from '../../assets/sponsors/jim farrel.png';
import lcBlindsLogo from '../../assets/sponsors/LC Blinds & Interiors logo design.png';
import lennonSolarLogo from '../../assets/sponsors/lennon solar logo.png';
import mathsPlantationsLogo from '../../assets/sponsors/mathsplantations_logo.png';
import monasterboiceLogo from '../../assets/sponsors/monastraboice-logo.png';
import physioPerformanceLogo from '../../assets/sponsors/phisio performance.png';
import tullyallenPharmacyLogo from '../../assets/sponsors/slane pharmacy tullyallen pharmacy.png';
import smfLogo from '../../assets/sponsors/smf-logo.png';
import tenureStoresLogo from '../../assets/sponsors/tenure.png';
import tonyObrienLogo from '../../assets/sponsors/tony o\'brien.png';
import trinityFinancesLogo from '../../assets/sponsors/trinity finance.png';

export type SponsorTier = 'gold' | 'silver' | 'bronze';

export interface SponsorEntry {
  id: string;
  name: string;
  tier: SponsorTier;
  url: string;
  logo?: string;
}

export const sponsors: SponsorEntry[] = [
  {
    id: 'the-monasterboice-inn-donegans',
    name: 'The Monasterboice Inn - Donegans',
    tier: 'gold',
    url: 'https://monasterboice-inn.ie/',
    logo: monasterboiceLogo,
  },
  {
    id: 'assist-electrical',
    name: 'Assist Electrical',
    tier: 'silver',
    url: 'https://www.assistelectrical.ie/',
    logo: assistElectricalLogo,
  },
  {
    id: 'jim-farrell-financial',
    name: 'Jim Farrell Financial',
    tier: 'silver',
    url: 'https://www.linkedin.com/in/jim-farrell-qfa-rpa-apa-55546715/',
    logo: jimFarrellLogo,
  },
  {
    id: 'lennon-solar',
    name: 'Lennon Solar',
    tier: 'silver',
    url: 'https://lennon.ie/',
    logo: lennonSolarLogo,
  },
  {
    id: 'tullyallen-pharmacy',
    name: 'Tullyallen Pharmacy Ltd',
    tier: 'silver',
    url: 'https://www.tullyallenpharmacy.ie/',
    logo: tullyallenPharmacyLogo,
  },
  {
    id: 'jp-rooney-trinity-finances',
    name: 'JP Rooney / Trinity Finances',
    tier: 'silver',
    url: 'https://trinityfinances.com/about-us/',
    logo: trinityFinancesLogo,
  },
  {
    id: 'physio-performance',
    name: 'Physio Performance',
    tier: 'silver',
    url: 'https://www.physioperformance.ie/',
    logo: physioPerformanceLogo,
  },
  {
    id: 'belview-egg-farm',
    name: 'Belview Egg Farm Ltd',
    tier: 'silver',
    url: 'https://belview.ie/',
    logo: belviewEggLogo,
  },
  {
    id: 'ashcroft-developments',
    name: 'Ashcroft Developments',
    tier: 'silver',
    url: 'https://ashcroftdevelopments.com/',
    logo: ashcroftDevelopmentsLogo,
  },
  {
    id: 'campbells-build-pave',
    name: 'Campbells Build & Pave',
    tier: 'bronze',
    url: 'https://www.campbellsbuildandpave.ie/',
    logo: campbellsBuildPaveLogo,
  },
  {
    id: 'maths-plantations',
    name: 'Maths Plantations',
    tier: 'bronze',
    url: 'https://mathsplantations.com/',
    logo: mathsPlantationsLogo,
  },
  {
    id: 'drogheda-hire',
    name: 'Drogheda Hire',
    tier: 'bronze',
    url: 'https://www.dhscompletehire.ie/',
    logo: droghedaHireLogo,
  },
  {
    id: 'tony-obrien',
    name: 'Tony O\'Brien',
    tier: 'bronze',
    url: '#',
    logo: tonyObrienLogo,
  },
  {
    id: 'drogheda-credit-union',
    name: 'Drogheda Credit Union Ltd',
    tier: 'bronze',
    url: 'https://droghedacu.ie/',
    logo: droghedaCreditUnionLogo,
  },
  {
    id: 'declan-branigan-designs',
    name: 'Declan Branigan Designs Ltd',
    tier: 'bronze',
    url: 'http://declanbranigandesign.com/',
    logo: declanBraniganLogo,
  },
  {
    id: 'callanan-autos',
    name: 'Callanan Autos',
    tier: 'bronze',
    url: 'https://www.callananautos.ie/',
    logo: callananAutosLogo,
  },
  {
    id: 'jason-fahy-heating',
    name: 'Jason Fahy Heating Ltd',
    tier: 'bronze',
    url: 'https://jasonfahyheating.com/',
    logo: jasonFahyHeatingLogo,
  },
  {
    id: 'lc-blinds',
    name: 'LC Blinds Ltd',
    tier: 'bronze',
    url: 'https://www.lcblinds.ie/',
    logo: lcBlindsLogo,
  },
  {
    id: 'eleanor-kelly',
    name: 'Eleanor Kelly',
    tier: 'bronze',
    url: 'https://www.eleanorkellyandco.com/',
    logo: eleanorKellyLogo,
  },
  {
    id: 'smf',
    name: 'SMF',
    tier: 'bronze',
    url: 'https://www.smfmotorfactors.ie/',
    logo: smfLogo,
  },
  {
    id: 'tenure-stores',
    name: 'Tenure Stores',
    tier: 'bronze',
    url: 'https://www.facebook.com/p/XL-Tenure-Stores-100057847171636/',
    logo: tenureStoresLogo,
  },
  {
    id: 'devine-building-services',
    name: 'Devine Building Services Ltd',
    tier: 'bronze',
    url: 'https://www.devinebuilding.ie/',
    logo: devineBuildingServicesLogo,
  },
];

export const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === 'gold');
export const silverSponsors = sponsors.filter((sponsor) => sponsor.tier === 'silver');
export const bronzeSponsors = sponsors.filter((sponsor) => sponsor.tier === 'bronze');
