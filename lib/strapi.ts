// Strapi API Utility - Secure, Token-Based Communication

import { Article, StrapiResponse, PaginationParams, ArticleFilters } from '@/types/blog';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined in environment variables');
}

if (!STRAPI_API_TOKEN) {
  throw new Error('STRAPI_API_TOKEN is not defined in environment variables');
}

/**
 * Generic fetch function for Strapi API
 */
async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: {
      revalidate: 60, // ISR - revalidate every 60 seconds
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    console.error(`Strapi API Error: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get all articles with pagination and filters
 */
export async function getArticles(
  params: PaginationParams = {},
  filters: ArticleFilters = {}
): Promise<StrapiResponse<Article[]>> {
  const { page = 1, pageSize = 9 } = params;

  // Build query string
  const queryParams = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    'sort': 'publishedAt:desc',
    'populate': 'coverImage',
  });

  // Add filters if provided
  if (filters.featured !== undefined) {
    queryParams.append('filters[featured][$eq]', String(filters.featured));
  }

  const data = await fetchStrapi<any>(`/articles?${queryParams.toString()}`);

  // Transform Strapi v4+ format to simplified format
  return {
    data: data.data.map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      ...item.attributes,
      coverImage: item.attributes.coverImage?.data ? {
        id: item.attributes.coverImage.data.id,
        ...item.attributes.coverImage.data.attributes,
      } : null,
    })),
    meta: data.meta,
  };
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const queryParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate': 'coverImage',
  });

  const data = await fetchStrapi<any>(`/articles?${queryParams.toString()}`);

  if (!data.data || data.data.length === 0) {
    return null;
  }

  const item = data.data[0];
  return {
    id: item.id,
    documentId: item.documentId,
    ...item.attributes,
    coverImage: item.attributes.coverImage?.data ? {
      id: item.attributes.coverImage.data.id,
      ...item.attributes.coverImage.data.attributes,
    } : null,
  };
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  const response = await getArticles({ page: 1, pageSize: limit }, { featured: true });
  return response.data;
}

/**
 * Get all article slugs for static generation
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  // Fetch all articles without pagination limit
  const queryParams = new URLSearchParams({
    'pagination[pageSize]': '100',
    'fields[0]': 'slug',
  });

  const data = await fetchStrapi<any>(`/articles?${queryParams.toString()}`);

  return data.data.map((item: any) => item.attributes.slug);
}

/**
 * Get image URL (handles both relative and absolute URLs)
 */
export function getStrapiImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  if (url.startsWith('http')) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}
