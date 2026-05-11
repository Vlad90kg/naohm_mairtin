const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

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
  hero_image_url: string | null;
  sections: ContentPageSectionDTO[];
}

export async function fetchContentPageBySlug(slug: string): Promise<ContentPageDTO> {
  const normalizedPath = `/pages/${slug}`.replace(/\/+$/, '');
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<ContentPageDTO>;
}
