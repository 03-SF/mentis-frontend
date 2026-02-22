// TypeScript interfaces for Blog/Article entities from Strapi

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: StrapiImage | null;
  seoTitle: string | null;
  seoDescription: string | null;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ArticleData {
  id: number;
  attributes: Omit<Article, 'id'>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface ArticleFilters {
  slug?: string;
  featured?: boolean;
}
