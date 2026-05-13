import { API_BASE_URL } from '../lib/api';

export interface EventDTO {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  image: string | null;
  image_url: string | null;
  is_featured: boolean;
}

export interface HomepageEventsDTO {
  featured_event: EventDTO | null;
  upcoming_events: EventDTO[];
}

export interface EventMutationDTO {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  is_featured?: boolean;
}

export interface EventsPageContentDTO {
  hero_title: string;
  hero_subtitle: string;
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

export async function listEvents(): Promise<EventDTO[]> {
  return request<EventDTO[]>('/events/');
}

export async function getHomepageEvents(): Promise<HomepageEventsDTO> {
  return request<HomepageEventsDTO>('/homepage/');
}

export async function getEventsPageContent(): Promise<EventsPageContentDTO> {
  return request<EventsPageContentDTO>('/pages/events/');
}

export async function createEvent(event: EventMutationDTO): Promise<EventDTO> {
  return request<EventDTO>('/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}

export async function updateEvent(id: string, event: Partial<EventMutationDTO>) {
  return request<EventDTO>(`/events/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}

export async function deleteEvent(id: string) {
  return request<void>(`/events/${id}/`, {
    method: 'DELETE',
  });
}
