export interface ApiLottoWinner {
  id: string;
  prize: string;
  winner: string;
  amount: string;
}

export interface ApiLottoPageContent {
  hero_eyebrow: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  jackpot_label: string;
  jackpot_amount: string;
  next_draw_label: string;
  next_draw_date: string;
  buy_tickets_url: string;
  buy_tickets_text: string;
  app_download_url: string;
  app_download_text: string;
  helper_text: string;
  latest_results_title: string;
  latest_draw_date: string;
  winning_numbers: number[];
  jackpot_won: boolean;
  latest_jackpot_amount: string;
  winners_section_title: string;
  winners: ApiLottoWinner[];
  how_it_works_title: string;
  bottom_cta_title: string;
  bottom_cta_description: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchLottoPageContent() {
  return request<ApiLottoPageContent>('/pages/lotto/');
}
