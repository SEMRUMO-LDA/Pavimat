/**
 * KibanCMS Client for Pavimat
 * Handles communication with the KibanCMS REST API.
 * Uses Vite environment variables for configuration.
 */

const API_URL = import.meta.env.VITE_KIBAN_API_URL || 'http://localhost:5000';
const API_KEY = import.meta.env.VITE_KIBAN_API_KEY || '';

// --- TypeScript Interfaces ---

export interface KibanCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // Stored as Lucide icon name (e.g. "LayoutGrid")
  imageUrl: string;
}

export interface KibanPartner {
  name: string;
  category: string;
  url: string;
}

export interface KibanTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface KibanShowroomImage {
  url: string;
  title: string;
}

export interface ContactFormData {
  form_name: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source_url: string;
  extra?: Record<string, any>;
}

// --- CMS Internal Entry Interfaces ---

interface KibanEntry<T = Record<string, any>> {
  id: string;
  title: string;
  slug: string;
  content: T;
  status: string;
  created_at: string;
  updated_at: string;
}

interface KibanApiResponse<T> {
  data: T;
  meta?: any;
  timestamp: string;
}

// --- Helper Fetch Function ---

async function kibanFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!import.meta.env.VITE_KIBAN_API_KEY) {
    throw new Error('KibanCMS API key not configured.');
  }

  const url = `${API_URL}/api/v1${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error?.message || errorMessage;
    } catch {
      // Ignore JSON parse error if body is empty or non-JSON
    }
    throw new Error(errorMessage);
  }

  const json: KibanApiResponse<T> = await response.json();
  return json.data;
}

// --- API Methods ---

/**
 * Fetch all published categories.
 */
export async function getCategories(): Promise<KibanCategory[]> {
  const entries = await kibanFetch<KibanEntry[]>(`/entries/categories?status=published&limit=100`);
  return entries.map(entry => ({
    id: entry.slug || entry.id,
    title: entry.content.title || entry.title,
    description: entry.content.description || '',
    icon: entry.content.icon || 'HelpCircle',
    imageUrl: entry.content.imageUrl || entry.content.image || '',
  }));
}

/**
 * Fetch all published partners/brands.
 */
export async function getPartners(): Promise<KibanPartner[]> {
  const entries = await kibanFetch<KibanEntry[]>(`/entries/partners?status=published&limit=100`);
  return entries.map(entry => ({
    name: entry.content.name || entry.title,
    category: entry.content.category || '',
    url: entry.content.url || '',
  }));
}

/**
 * Fetch all published testimonials (Quem trabalha connosco).
 * Maps KibanCMS's official testimonial preset structure (author_name, author_role, testimonial)
 * to Pavimat's internal format (name, role, quote).
 */
export async function getTestimonials(): Promise<KibanTestimonial[]> {
  const entries = await kibanFetch<KibanEntry[]>(`/entries/testimonials?status=published&limit=100`);
  return entries.map(entry => ({
    quote: entry.content.testimonial || '',
    name: entry.content.author_name || entry.title,
    role: entry.content.author_role || '',
  }));
}

/**
 * Fetch all published showroom images.
 */
export async function getShowroomImages(): Promise<KibanShowroomImage[]> {
  const entries = await kibanFetch<KibanEntry[]>(`/entries/showroom-images?status=published&limit=100`);
  return entries.map(entry => ({
    url: entry.content.url || entry.content.image || '',
    title: entry.content.title || entry.title || '',
  }));
}

/**
 * Submit contact or budget form to KibanCMS Forms API.
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  if (!import.meta.env.VITE_KIBAN_API_KEY) {
    throw new Error('KibanCMS API key not configured.');
  }

  const url = `${API_URL}/api/v1/forms/submit`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error?.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  const result = await response.json();
  return { success: result.success };
}

/**
 * Subscribe email to the KibanCMS Newsletter.
 * Falls back to using the KibanCMS Forms API since the dedicated Newsletter addon is not installed.
 */
export async function subscribeNewsletter(email: string, source: string = 'footer'): Promise<{ success: boolean }> {
  if (!import.meta.env.VITE_KIBAN_API_KEY) {
    throw new Error('KibanCMS API key not configured.');
  }

  const url = `${API_URL}/api/v1/forms/submit`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      form_name: 'newsletter',
      name: 'Subscritor Newsletter',
      email,
      subject: 'Nova Subscrição de Newsletter',
      message: `Subscrição de newsletter a partir de: ${source}`,
      source_url: typeof window !== 'undefined' ? window.location.href : '',
    }),
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error?.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  const result = await response.json();
  return { success: result.success };
}

export interface KibanHeroConfig {
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  card1Title: string;
  card1Subtitle: string;
  card1Icon: string;
  card2Title: string;
  card2Subtitle: string;
  card2Icon: string;
  card3Title: string;
  card3Subtitle: string;
  card3Icon: string;
  card4Title: string;
  card4Subtitle: string;
  card4Icon: string;
}

/**
 * Fetch Hero settings/config from KibanCMS.
 */
export async function getHeroConfig(): Promise<KibanHeroConfig | null> {
  try {
    const entries = await kibanFetch<KibanEntry<KibanHeroConfig>[]>('/entries/hero?status=published&limit=1');
    if (entries && entries.length > 0) {
      return entries[0].content;
    }
    return null;
  } catch (err) {
    console.warn('Failed to load Hero config from KibanCMS, using fallback static data.', err);
    return null;
  }
}
