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
