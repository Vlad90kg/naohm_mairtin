export interface ApiMembershipPageContent {
  description: string;
  app_store_link: string;
  google_play_link: string;
  poster: string;
  registrar_email: string;
}

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

export async function fetchMembershipPageContent() {
  const data = await request<ApiMembershipPageContent>('/pages/membership/');

  let poster = data.poster ?? '';
  if (poster && /^https?:\/\//i.test(poster)) {
    try {
      const parsed = new URL(poster);
      if (parsed.pathname.startsWith('/storage/')) {
        poster = `${BACKEND_BASE_URL}${parsed.pathname}`;
      }
    } catch {
      // keep original poster value
    }
  } else if (poster) {
    const normalized = poster.replace(/^\/+/, '');
    poster = normalized.startsWith('storage/')
      ? `${BACKEND_BASE_URL}/${normalized}`
      : `${BACKEND_BASE_URL}/storage/${normalized}`;
  }

  return {
    ...data,
    poster,
  };
}
