export interface ApiTeam {
  id: number;
  slug: string;
  name: string;
  category: 'adult' | 'juvenile';
  senior_group?: 'senior_men' | 'senior_ladies' | 'social' | null;
  category_display: string;
  image: string;
  description?: string | null;
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
  cards: ApiTeamsPageCard[];
  gallery_eyebrow: string;
  gallery_title: string;
  gallery_description: string;
  gallery_images: ApiTeamsPageGalleryImage[];
}

export interface ApiTeamsPageCard {
  eyebrow: string;
  title: string;
  description: string;
  button_label: string;
  button_url: string;
  order: number;
  is_active: boolean;
}

export interface ApiTeamsPageGalleryImage {
  image_url: string;
  caption: string;
  order: number;
  is_active: boolean;
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

function normalizeTrainingTimes(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        return item.trim();
      }

      if (item && typeof item === 'object' && 'time' in item && typeof (item as { time?: unknown }).time === 'string') {
        return (item as { time: string }).time.trim();
      }

      return '';
    })
    .filter((entry) => entry.length > 0);
}

function normalizeTeam(team: ApiTeam): ApiTeam {
  return {
    ...team,
    training_times: normalizeTrainingTimes(team.training_times),
  };
}

function normalizeFixture(fixture: ApiFixture): ApiFixture {
  return {
    ...fixture,
    home_team: normalizeTeam(fixture.home_team),
    away_team: normalizeTeam(fixture.away_team),
  };
}

function normalizeResult(result: ApiResult): ApiResult {
  return {
    ...result,
    home_team: normalizeTeam(result.home_team),
    away_team: normalizeTeam(result.away_team),
  };
}

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
  const fixtures = await request<ApiFixture[]>('/fixtures/', params);
  return fixtures.map(normalizeFixture);
}

export async function fetchResults(params?: { team?: string; category?: string }) {
  const results = await request<ApiResult[]>('/results/', params);
  return results.map(normalizeResult);
}

export async function fetchTeams(params?: { category?: string; senior_group?: string; internal?: string }) {
  const teams = await request<ApiTeam[]>('/teams/', params);
  return teams.map(normalizeTeam);
}

export async function fetchTeamBySlug(slug: string) {
  const team = await request<ApiTeam>(`/teams/slug/${slug}/`);
  return normalizeTeam(team);
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
