/**
 * Default Formspree endpoint used by the contact page.
 *
 * Priority:
 * 1) CMS value from backend page content (`contact.form.endpoint`)
 * 2) This env-backed fallback (`VITE_CONTACT_FORMSPREE_ENDPOINT`)
 * 3) Hardcoded safe default below
 */
export const DEFAULT_FORMSPREE_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/mwvyqgdn';

