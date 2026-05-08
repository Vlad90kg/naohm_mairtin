export interface ApiTeam {
  id: number;
  slug: string;
  name: string;
  category: 'adult' | 'juvenile' | 'ladies';
  category_display: string;
  image: string;
  managers: Array<{ role: string; name: string; phone?: string; email?: string }>;
  training_times: string[];
  contact_email: string | null;
  is_internal: boolean;
}

export interface ApiFixtureResultSummary {
  id: number;
  home_score: string;
  away_score: string;
  status: string;
  status_display: string;
}

export interface ApiFixture {
  id: number;
  date: string;
  location: string;
  competition: string;
  home_team: ApiTeam;
  away_team: ApiTeam;
  result: ApiFixtureResultSummary | null;
}

export interface ApiResult {
  id: number;
  fixture_id: number;
  date: string;
  location: string;
  competition: string;
  home_team: ApiTeam;
  away_team: ApiTeam;
  home_score: string;
  away_score: string;
  status: string;
  status_display: string;
}

export interface ApiTeamsPageContent {
  hero_title: string;
  hero_subtitle: string;
  hub_eyebrow: string;
  hub_title: string;
  hub_description: string;
  gallery_eyebrow: string;
  gallery_title: string;
  gallery_description: string;
}

export interface ApiFixturesPageContent {
  hero_title: string;
  hero_subtitle: string;
}

export interface ApiHistoryTimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ApiHistoryFigureItem {
  id: string;
  name: string;
  role: string;
  detail: string;
  image: string;
}

export interface ApiHistoryPageContent {
  hero_title: string;
  hero_subtitle: string;
  intro_text: string;
  milestones_eyebrow: string;
  timeline_items: ApiHistoryTimelineItem[];
  figures_eyebrow: string;
  figures_items: ApiHistoryFigureItem[];
  cta_title: string;
  cta_button_text: string;
  cta_button_link: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

function buildUrl(path: string, params?: Record<string, string | undefined>) {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}

async function request<T>(path: string, params?: Record<string, string | undefined>, options?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path, params), options);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  if (response.status === 204) return {} as T;
  return response.json() as Promise<T>;
}

export async function fetchFixtures(params?: { team?: string; category?: string }) {
  return request<ApiFixture[]>('/fixtures/', params);
}

export async function fetchResults(params?: { team?: string; category?: string }) {
  return request<ApiResult[]>('/results/', params);
}

export async function fetchTeams(params?: { category?: string; internal?: string }) {
  return request<ApiTeam[]>('/teams/', params);
}

export async function fetchTeamBySlug(slug: string) {
  return request<ApiTeam>(`/teams/slug/${slug}/`);
}

export async function createTeam(team: Partial<ApiTeam>) {
  return request<ApiTeam>('/teams/', undefined, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
}

export async function updateTeam(id: number, team: Partial<ApiTeam>) {
  return request<ApiTeam>(`/teams/${id}/`, undefined, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
}

export async function deleteTeam(id: number) {
  return request<void>(`/teams/${id}/`, undefined, {
    method: 'DELETE',
  });
}

export async function fetchTeamsPageContent() {
  return request<ApiTeamsPageContent>('/pages/teams/');
}

export async function updateTeamsPageContent(content: Partial<ApiTeamsPageContent>) {
  return request<ApiTeamsPageContent>('/pages/teams/', undefined, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
}

export async function fetchFixturesPageContent() {
  return request<ApiFixturesPageContent>('/pages/fixtures/');
}

export async function updateFixturesPageContent(content: Partial<ApiFixturesPageContent>) {
  return request<ApiFixturesPageContent>('/pages/fixtures/', undefined, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
}

export async function fetchHistoryPageContent() {
  return request<ApiHistoryPageContent>('/pages/history/');
}
