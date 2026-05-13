import { API_BASE_URL } from '../lib/api';

export interface ApiJuvenileTeamsPageContent {
  hero_title: string;
  hero_subtitle: string;
  intro_eyebrow: string;
  intro_title: string;
  intro_description: string;
  card_cta_text: string;
  modal_eyebrow: string;
  coaches_title: string;
  no_coaches_text: string;
  contact_email_title: string;
  training_times_title: string;
  no_training_times_text: string;
}

async function request<T>(path: string): Promise<T> {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchJuvenileTeamsPageContent() {
  return request<ApiJuvenileTeamsPageContent>('/pages/juvenile-teams/');
}
