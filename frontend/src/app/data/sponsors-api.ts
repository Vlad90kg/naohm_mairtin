import { API_BASE_URL } from '../lib/api';

export type SponsorTierLevel = 1 | 2 | 3;
export type ApiSponsorTier = 'gold' | 'silver' | 'bronze';

interface ApiSponsor {
  id: number;
  name: string;
  website?: string;
  url?: string;
  logo?: string;
  tier: ApiSponsorTier;
  is_active?: boolean;
}

export interface SponsorDTO {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: SponsorTierLevel;
  isActive: boolean;
}

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

function normalizeStorageUrl(value?: string): string {
  if (!value) return '';

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
  return normalized.startsWith('storage/')
    ? `${BACKEND_BASE_URL}/${normalized}`
    : `${BACKEND_BASE_URL}/storage/${normalized}`;
}

function tierToLevel(tier: ApiSponsorTier): SponsorTierLevel {
  if (tier === 'gold') return 1;
  if (tier === 'silver') return 2;
  return 3;
}

function levelToTier(level: SponsorTierLevel): ApiSponsorTier {
  if (level === 1) return 'gold';
  if (level === 2) return 'silver';
  return 'bronze';
}

function mapApiSponsor(sponsor: ApiSponsor): SponsorDTO {
  return {
    id: String(sponsor.id),
    name: sponsor.name,
    logo: normalizeStorageUrl(sponsor.logo),
    url: sponsor.website ?? sponsor.url ?? '',
    tier: tierToLevel(sponsor.tier),
    isActive: sponsor.is_active ?? true,
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
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

export async function listSponsors(): Promise<SponsorDTO[]> {
  const data = await request<ApiSponsor[]>('/sponsors/');
  return data.map(mapApiSponsor);
}

export async function createSponsor(sponsor: Omit<SponsorDTO, 'id' | 'isActive'>): Promise<SponsorDTO> {
  const data = await request<ApiSponsor>('/sponsors/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: sponsor.name,
      website: sponsor.url,
      logo: sponsor.logo,
      tier: levelToTier(sponsor.tier),
      is_active: true,
    }),
  });
  return mapApiSponsor(data);
}

export async function updateSponsorById(
  id: string,
  updates: Partial<Omit<SponsorDTO, 'id' | 'isActive'>>,
): Promise<SponsorDTO> {
  const payload: Record<string, string> = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.url !== undefined) payload.website = updates.url;
  if (updates.logo !== undefined) payload.logo = updates.logo;
  if (updates.tier !== undefined) payload.tier = levelToTier(updates.tier);

  const data = await request<ApiSponsor>(`/sponsors/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return mapApiSponsor(data);
}

export async function deleteSponsorById(id: string): Promise<void> {
  await request<void>(`/sponsors/${id}/`, {
    method: 'DELETE',
  });
}

export async function uploadSponsorLogo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const data = await request<{ logo: string }>('/uploads/sponsor-logo/', {
    method: 'POST',
    body: formData,
  });

  return normalizeStorageUrl(data.logo);
}
