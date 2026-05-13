import { API_BASE_URL } from '../lib/api';

export type ContentPageLayoutType = 'text_only' | 'image_text' | 'gallery';
export type ContentPageImagePosition = 'left' | 'right' | 'none';

export interface ContentPageSectionImageDTO {
  image_url: string | null;
  caption: string | null;
}

export interface ContentPageSectionDTO {
  title: string | null;
  body: string | null;
  layout_type: ContentPageLayoutType;
  image_url: string | null;
  image_position: ContentPageImagePosition;
  gallery_images: ContentPageSectionImageDTO[];
}

export interface ContentPageDTO {
  title: string;
  subtitle: string | null;
  intro_text: string | null;
  sections: ContentPageSectionDTO[];
}

function normalizeContentPage(payload: unknown): ContentPageDTO {
  const page = (payload && typeof payload === 'object' ? payload : {}) as Partial<ContentPageDTO>;

  return {
    title: typeof page.title === 'string' && page.title.trim() ? page.title : 'Content Page',
    subtitle: typeof page.subtitle === 'string' ? page.subtitle : null,
    intro_text: typeof page.intro_text === 'string' ? page.intro_text : null,
    sections: Array.isArray(page.sections) ? page.sections : [],
  };
}

export async function fetchContentPageBySlug(slug: string): Promise<ContentPageDTO> {
  const normalizedPath = `/pages/${slug}`.replace(/\/+$/, '');
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();

  return normalizeContentPage(payload);
}
