/**
 * Centralized Team Data for Naomh Mairtin CPG
 * 
 * Managers, contact details, and training times can be updated here.
 * This structure makes it easy for admins to edit content without 
 * touching complex UI code.
 */

export interface TeamMember {
  role: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface Team {
  id: string;
  name: string;
  category: 'Adult' | 'Juvenile' | 'Ladies';
  image: string;
  managers: TeamMember[];
  trainingTimes: string[];
  contactEmail?: string;
}

export const teamsData: Team[] = [
  // ADULT TEAMS
  {
    id: 'senior-men',
    name: 'Senior Men',
    category: 'Adult',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    managers: [
      { role: 'Manager', name: 'Declan Reilly', phone: '087 123 4567' },
      { role: 'Coach', name: 'John Murphy' },
      { role: 'Selector', name: 'Paddy Smith' },
    ],
    trainingTimes: ['Tuesdays: 7:30 PM', 'Thursdays: 8:00 PM'],
    contactEmail: 'secretary.naomhmairtin.louth@gaa.ie',
  },
  {
    id: 'junior-men',
    name: 'Junior Men',
    category: 'Adult',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&q=80',
    managers: [
      { role: 'Manager', name: 'Thomas Byrne', phone: '086 987 6543' },
    ],
    trainingTimes: ['Wednesdays: 7:30 PM'],
  },
  {
    id: 'senior-ladies',
    name: 'Senior Ladies',
    category: 'Adult',
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800&q=80',
    managers: [
      { role: 'Manager', name: 'Sarah Greene', phone: '085 444 3322' },
      { role: 'Coach', name: 'Mick Lynch' },
    ],
    trainingTimes: ['Mondays: 7:00 PM', 'Thursdays: 7:00 PM'],
  },

  // JUVENILE TEAMS
  {
    id: 'u17-boys',
    name: 'U17 Boys',
    category: 'Juvenile',
    image: 'https://images.unsplash.com/photo-1529900948632-58674ba19306?w=800&q=80',
    managers: [
      { role: 'Lead Coach', name: 'Paul Connor', phone: '087 000 1111' },
    ],
    trainingTimes: ['Tuesdays: 6:30 PM'],
  },
  {
    id: 'u15-boys',
    name: 'U15 Boys',
    category: 'Juvenile',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80',
    managers: [
      { role: 'Lead Coach', name: 'Seamus Quinn' },
    ],
    trainingTimes: ['Mondays: 6:00 PM'],
  },
  {
    id: 'u13-boys',
    name: 'U13 Boys',
    category: 'Juvenile',
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800&q=80',
    managers: [
      { role: 'Lead Coach', name: 'David Kelly' },
    ],
    trainingTimes: ['Wednesdays: 6:30 PM'],
  },
  {
    id: 'u12-girls',
    name: 'U12 Girls',
    category: 'Juvenile',
    image: 'https://images.unsplash.com/photo-1516244122345-381a171d1887?w=800&q=80',
    managers: [
      { role: 'Lead Coach', name: 'Laura Brennan' },
    ],
    trainingTimes: ['Fridays: 6:00 PM'],
  },
];
