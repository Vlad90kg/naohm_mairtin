import { API_BASE_URL } from '../lib/api';
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

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

export async function fetchHomePageContent() {
  const data = await request<any>('/pages/home/');

  const normalizeStorageUrl = (value?: string) => {
    if (!value) return value;
    if (/^https?:\/\//i.test(value)) {
      try {
        const parsed = new URL(value);
        if (parsed.pathname.startsWith('/storage/')) {
          return `${BACKEND_BASE_URL}${parsed.pathname}`;
        }
      } catch {
        return value;
      }
      return value;
    }
    const normalized = value.replace(/^\/+/, '');
    if (normalized === 'hero_background.jpg' || normalized === 'instagram.png') return normalized;
    return normalized.startsWith('storage/')
      ? `${BACKEND_BASE_URL}/${normalized}`
      : `${BACKEND_BASE_URL}/storage/${normalized}`;
  };

  if (data?.hero?.backgroundImage) {
    data.hero.backgroundImage = normalizeStorageUrl(data.hero.backgroundImage);
  }
  if (data?.social?.instagramLatestPostImage) {
    data.social.instagramLatestPostImage = normalizeStorageUrl(data.social.instagramLatestPostImage);
  }

  return data;
}

export async function fetchChildSafetyPageContent() {
  return request<any>('/pages/child-safety/');
}

export interface ContactPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  form: {
    title: string;
    endpoint: string;
    successMessage: string;
  };
  contactInfo: {
    clubGroundsTitle: string;
    clubGroundsAddress: string;
    emailTitle: string;
    email: string;
    facebookUrl: string;
    instagramUrl: string;
  };
  mapQuery: string;
}

export async function fetchContactPageContent() {
  return request<ContactPageContent>('/pages/contact/');
}
