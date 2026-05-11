export interface ApiMembershipPageContent {
  description: string;
  app_store_link: string;
  google_play_link: string;
  poster: string;
  secretary_email: string;
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
  const raw = await request<Record<string, unknown>>('/pages/membership/');

  let poster = typeof raw.poster === 'string' ? raw.poster : '';
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
    description: typeof raw.description === 'string' ? raw.description : '',
    app_store_link: typeof raw.app_store_link === 'string' ? raw.app_store_link : '',
    google_play_link: typeof raw.google_play_link === 'string' ? raw.google_play_link : '',
    secretary_email:
      typeof raw.secretary_email === 'string' && raw.secretary_email.trim()
        ? raw.secretary_email
        : typeof raw.registrar_email === 'string' && raw.registrar_email.trim()
          ? raw.registrar_email
          : 'secretary.naomhmairtin.louth@gaa.ie',
    poster,
  };
}
