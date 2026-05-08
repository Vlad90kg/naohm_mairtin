export interface EventDTO {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image: string;
}

export interface EventsPageContentDTO {
  hero_title: string;
  hero_subtitle: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

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

export async function listEvents(): Promise<EventDTO[]> {
  return request<EventDTO[]>('/events/');
}

export async function getEventsPageContent(): Promise<EventsPageContentDTO> {
  return request<EventsPageContentDTO>('/pages/events/');
}

export async function createEvent(event: Omit<EventDTO, 'id'>): Promise<EventDTO> {
  return request<EventDTO>('/events/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}

export async function updateEvent(id: string, event: Partial<Omit<EventDTO, 'id'>>) {
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
