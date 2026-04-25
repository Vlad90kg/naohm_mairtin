export interface Fixture {
  id: string;
  team: string;
  opponent: string;
  date: string; // ISO format for easy sorting/filtering
  time: string;
  venue: string;
  competition: string;
}

export interface Result {
  id: string;
  team: string;
  opponent: string;
  scoreFor: string;
  scoreAgainst: string;
  date: string;
  competition: string;
  isWin: boolean;
}

export const fixtures: Fixture[] = [
  {
    id: '1',
    team: 'Senior Men',
    opponent: 'St Marys',
    date: '2026-04-22',
    time: '19:30',
    venue: 'Pairc Naomh Mairtin',
    competition: 'Louth Division 1 League'
  },
  {
    id: '2',
    team: 'Senior Ladies',
    opponent: 'Geraldines',
    date: '2026-04-24',
    time: '20:00',
    venue: 'Geraldines GFC',
    competition: 'Ladies Senior League'
  },
  {
    id: '3',
    team: 'U15 Boys',
    opponent: 'Newtown Blues',
    date: '2026-04-25',
    time: '11:00',
    venue: 'Monasterboice',
    competition: 'U15 Division 2'
  },
  {
    id: '4',
    team: 'Junior Men',
    opponent: 'Dreadnots',
    date: '2026-04-28',
    time: '19:00',
    venue: 'Clogherhead',
    competition: 'Junior League'
  },
  {
    id: '5',
    team: 'Minor Ladies',
    opponent: 'St Fechins',
    date: '2026-05-02',
    time: '10:30',
    venue: 'Pairc Naomh Mairtin',
    competition: 'Minor League'
  }
];

export const results: Result[] = [
  {
    id: '1',
    team: 'Senior Men',
    opponent: 'Clan na Gael',
    scoreFor: '2-14',
    scoreAgainst: '1-10',
    date: '2026-04-12',
    competition: 'Louth Division 1 League',
    isWin: true
  },
  {
    id: '2',
    team: 'Senior Ladies',
    opponent: 'St Mochtas',
    scoreFor: '1-12',
    scoreAgainst: '2-08',
    date: '2026-04-11',
    competition: 'Ladies Senior League',
    isWin: true
  },
  {
    id: '3',
    team: 'U17 Boys',
    opponent: 'Mattock Rangers',
    scoreFor: '0-15',
    scoreAgainst: '0-15',
    date: '2026-04-09',
    competition: 'U17 Division 1',
    isWin: false // Draw
  },
  {
    id: '4',
    team: 'Senior Men',
    opponent: 'Ardee St Marys',
    scoreFor: '1-08',
    scoreAgainst: '1-12',
    date: '2026-04-05',
    competition: 'Louth Division 1 League',
    isWin: false
  },
  {
    id: '5',
    team: 'U13 Girls',
    opponent: 'Dundalk Gaels',
    scoreFor: '4-06',
    scoreAgainst: '2-03',
    date: '2026-04-02',
    competition: 'U13 Division 3',
    isWin: true
  },
  {
    id: '6',
    team: 'Junior Men',
    opponent: 'St Kevins',
    scoreFor: '2-11',
    scoreAgainst: '0-14',
    date: '2026-03-29',
    competition: 'Junior League',
    isWin: true
  }
];
