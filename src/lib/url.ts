/** Bygger en intern länk som fungerar både med och utan base-path (t.ex. /foreningsbrev). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export const CONTACT_EMAIL = 'hej@foreningsbrev.se';
