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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

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
    logo: sponsor.logo ?? '',
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

  return response.json() as Promise<T>;
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

  return data.logo;
}
