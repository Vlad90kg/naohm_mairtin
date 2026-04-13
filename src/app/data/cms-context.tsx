import React, { createContext, useContext, useState, useEffect } from 'react';
import { teamsData as initialTeams, type Team } from './teams';
import { sponsors as initialSponsorDirectory } from './sponsors';

// Types for our CMS data
export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: 1 | 2 | 3;
}

export interface LottoState {
  winningNumbers: string[];
  jackpot: string;
  nextDrawDate: string;
  poster: string;
  appLink: string;
  recentResults: string;
}

export interface MembershipState {
  description: string;
  appStoreLink: string;
  googlePlayLink: string;
  poster: string;
}

export interface ChildSafetyContact {
  id: string;
  name: string;
  role: string;
  description: string;
  email: string;
  phone: string;
}

export interface ChildSafetyDocument {
  id: string;
  title: string;
  fileUrl: string;
  date: string;
}

export interface ChildSafetyStep {
  title: string;
  description: string;
}

export interface ChildSafetyHelpline {
  name: string;
  phone: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  order: number;
}

export interface PageContent {
  home: {
    hero: {
      title: string;
      subtitle: string;
      primaryButtonText: string;
      primaryButtonLink: string;
      secondaryButtonText: string;
      secondaryButtonLink: string;
      backgroundImage: string;
    };
    featuredAnnouncement: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
    sections: {
      sponsors: {
        enabled: boolean;
        sectionTitle: string;
        itemsLimit: number;
      };
      shops: {
        enabled: boolean;
        sectionTitle: string;
        itemsLimit: number;
      };
      events: {
        enabled: boolean;
        sectionTitle: string;
        itemsLimit: number;
      };
      teams: {
        enabled: boolean;
        sectionTitle: string;
        itemsLimit: number;
      };
    };
  };
  contact: {
    email: string;
    address: string;
    mapLink: string;
  };
  facilities: {
    hero: {
      description: string;
      locationLabel: string;
    };
    media: {
      type: 'image' | 'video';
      url: string;
      title: string;
      description: string;
    };
    list: Facility[];
  };
  childSafety: {
    hero: {
      title: string;
      subtitle: string;
    };
    commitment: string;
    contacts: ChildSafetyContact[];
    documents: ChildSafetyDocument[];
    steps: ChildSafetyStep[];
    helplines: ChildSafetyHelpline[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
}

interface CMSContextType {
  teams: Team[];
  events: Event[];
  sponsors: Sponsor[];
  lotto: LottoState;
  membership: MembershipState;
  pages: PageContent;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addSponsor: (sponsor: Omit<Sponsor, 'id'>) => void;
  updateSponsor: (id: string, updates: Partial<Sponsor>) => void;
  deleteSponsor: (id: string) => void;
  updateLotto: (updates: Partial<LottoState>) => void;
  updateMembership: (updates: Partial<MembershipState>) => void;
  updatePageContent: (page: keyof PageContent, updates: any) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  // Initialize with dummy data or local storage
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Annual General Meeting',
      date: '2026-04-15',
      location: 'Clubhouse Hall',
      description: 'The annual general meeting for all club members to discuss the past year and future plans.',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    },
    {
      id: '2',
      title: 'Summer Cul Camp 2026',
      date: '2026-07-06',
      location: 'Main Training Grounds',
      description: 'Our popular annual youth camp for football and hurling.',
      image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80',
    }
  ]);

  const [sponsors, setSponsors] = useState<Sponsor[]>(
    initialSponsorDirectory.map((sponsor) => ({
      id: sponsor.id,
      name: sponsor.name,
      logo: sponsor.logo ?? '',
      url: sponsor.url,
      tier: sponsor.tier === 'gold' ? 1 : sponsor.tier === 'silver' ? 2 : 3,
    }))
  );

  const [lotto, setLotto] = useState<LottoState>({
    winningNumbers: ['04', '12', '19', '28'],
    jackpot: '€8,400',
    nextDrawDate: '2026-04-05',
    poster: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    appLink: 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
    recentResults: 'No winner this week. Jackpot rolls over.',
  });

  const [membership, setMembership] = useState<MembershipState>({
    description: 'We have moved our membership and club communications to the ClubSpot app.',
    appStoreLink: 'https://apps.apple.com/ie/app/clubspot/id1506101166',
    googlePlayLink: 'https://play.google.com/store/apps/details?id=app.clubspot.naomh.mairtin.gfc',
    poster: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
  });

  const [pages, setPages] = useState<PageContent>({
    home: {
      hero: {
        title: 'Naomh Mairtin CPG',
        subtitle: 'Strength in community, excellence on the field.',
        primaryButtonText: 'View Events',
        primaryButtonLink: '/events',
        secondaryButtonText: 'Membership',
        secondaryButtonLink: '/membership',
        backgroundImage: 'hero_background.jpg',
      },
      featuredAnnouncement: {
        title: 'Title of the announcement',
        description: '--------------------',
        buttonText: 'Learn More',
        buttonLink: '#announcement',
      },
      sections: {
        sponsors: {
          enabled: true,
          sectionTitle: 'Club Sponsors',
          itemsLimit: 5,
        },
        shops: {
          enabled: true,
          sectionTitle: 'Official Club Shops',
          itemsLimit: 2,
        },
        events: {
          enabled: true,
          sectionTitle: 'Upcoming Events',
          itemsLimit: 2,
        },
        teams: {
          enabled: true,
          sectionTitle: 'Our Teams',
          itemsLimit: 2,
        },
      },
    },
    contact: {
      email: 'secretary.naomhmairtin.louth@gaa.ie',
      address: 'Monasterboice, Co. Louth, Ireland',
      mapLink: 'https://maps.google.com',
    },
    facilities: {
      hero: {
        description: 'Naomh Mairtin CPG boasts some of the finest sporting and social facilities in the region, supporting our teams from juvenile to senior level.',
        locationLabel: 'Monasterboice, Co. Louth',
      },
      media: {
        type: 'video',
        url: 'http://www.naomhmairtin.com/wp-content/uploads/2024/03/WhatsApp-Video-2024-03-28-at-20.48.59-2.mp4',
        title: 'Experience Monasterboice',
        description: 'Take a virtual tour of our grounds and see the pride we take in maintaining a world-class environment for our players, members, and the wider community.',
      },
      list: [
        {
          id: '1',
          title: "Main Playing Pitch",
          description: "Our state-of-the-art main pitch is maintained to the highest standards, featuring modern floodlighting and a high-capacity stand.",
          icon: 'trophy',
          image: "https://images.unsplash.com/photo-1629129282643-95d9c53520e9?w=1080&q=80",
          order: 1,
        },
        {
          id: '2',
          title: "Training Gym",
          description: "A fully equipped strength and conditioning suite designed for team preparation and individual player development.",
          icon: 'dumbbell',
          image: "https://images.unsplash.com/photo-1659331150328-e6c822ae77b2?w=1080&q=80",
          order: 2,
        },
        {
          id: '3',
          title: "Clubhouse & Social Area",
          description: "Our modern clubhouse serves as the hub of the community, featuring meeting rooms, changing facilities, and a social lounge.",
          icon: 'coffee',
          image: "https://images.unsplash.com/photo-1759477274116-e3cb02d2b9d8?w=1080&q=80",
          order: 3,
        }
      ],
    },
    childSafety: {
      hero: {
        title: 'Safeguarding & Child Welfare',
        subtitle: 'Our commitment to a safe environment for all our young members.',
      },
      commitment: 'Naomh Mairtin CPG is committed to creating a safe and enjoyable environment for all children and young people. We follow the GAA Code of Behaviour (Underage) and all national safeguarding policies.',
      contacts: [
        {
          id: '1',
          name: 'Mary O\'Sullivan',
          role: 'Children\'s Officer',
          description: 'Primary contact for safeguarding concerns.',
          email: 'childrensofficer.naomhmairtin.louth@gaa.ie',
          phone: '087 123 4567',
        }
      ],
      documents: [
        {
          id: '1',
          title: 'Safeguarding Statement 2026',
          fileUrl: '/documents/safeguarding-2026.pdf',
          date: '2026-01-15',
        }
      ],
      steps: [
        { title: 'Report', description: 'Inform the Children\'s Officer of any concerns immediately.' },
        { title: 'Record', description: 'Document all details of the incident as soon as possible.' },
        { title: 'Review', description: 'The concern will be reviewed by the club executive.' },
        { title: 'Refer', description: 'If necessary, the matter will be referred to statutory authorities.' }
      ],
      helplines: [
        { name: 'Tusla', phone: '01 123 4567' },
        { name: 'Gardaí', phone: '999/112' }
      ],
      cta: {
        title: 'Need to Speak Privately?',
        description: 'Our Children\'s Officer is available for confidential discussions.',
        buttonText: 'Contact Mary',
        buttonLink: 'mailto:childrensofficer.naomhmairtin.louth@gaa.ie',
      }
    }
  });

  // CMS Handlers
  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    setEvents(prev => [...prev, { ...event, id: Date.now().toString() }]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const addSponsor = (sponsor: Omit<Sponsor, 'id'>) => {
    setSponsors(prev => [...prev, { ...sponsor, id: Date.now().toString() }]);
  };

  const updateSponsor = (id: string, updates: Partial<Sponsor>) => {
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSponsor = (id: string) => {
    setSponsors(prev => prev.filter(s => s.id !== id));
  };

  const updateLotto = (updates: Partial<LottoState>) => {
    setLotto(prev => ({ ...prev, ...updates }));
  };

  const updateMembership = (updates: Partial<MembershipState>) => {
    setMembership(prev => ({ ...prev, ...updates }));
  };

  const updatePageContent = (page: keyof PageContent, updates: any) => {
    setPages(prev => ({
      ...prev,
      [page]: { ...prev[page], ...updates }
    }));
  };

  return (
    <CMSContext.Provider value={{
      teams, events, sponsors, lotto, membership, pages,
      updateTeam, addEvent, updateEvent, deleteEvent,
      addSponsor, updateSponsor, deleteSponsor,
      updateLotto, updateMembership, updatePageContent
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
