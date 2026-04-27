export interface ApiShopItem {
  id: string;
  name: string;
  description: string;
  detail: string;
  url: string;
  image: string;
  isLogo: boolean;
  cta: string;
  isPlaceholder: boolean;
}

export interface ApiShopPageContent {
  hero_eyebrow: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  info_title: string;
  info_description: string;
  info_button_text: string;
  info_button_link: string;
  shops: ApiShopItem[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchShopPageContent() {
  return request<ApiShopPageContent>('/pages/shop/');
}
