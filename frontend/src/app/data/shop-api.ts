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

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)
    ?.replace(/\/+$/, '')
  ?? (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : '/api');

async function request<T>(path: string): Promise<T> {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const text = await response.text();

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Invalid JSON response from ${API_BASE_URL}${normalizedPath}. ` +
      'Set VITE_API_BASE_URL to your Laravel API URL in frontend/.env.'
    );
  }
}

export async function fetchShopPageContent() {
  return request<ApiShopPageContent>('/pages/shop/');
}
