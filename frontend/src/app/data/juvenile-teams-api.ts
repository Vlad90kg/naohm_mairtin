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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchJuvenileTeamsPageContent() {
  return request<ApiJuvenileTeamsPageContent>('/pages/juvenile-teams/');
}
