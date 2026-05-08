const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

async function request<T>(path: string): Promise<T> {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
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
