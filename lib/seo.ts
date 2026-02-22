// SEO Utilities - JSON-LD Structured Data & Metadata Helpers

import { Article } from '@/types/blog';

const SITE_URL = 'https://mentis.pk';
const SITE_NAME = 'MENTIS';
const SITE_DESCRIPTION = 'AI-powered career guidance and assessment platform';

/**
 * Organization JSON-LD Schema
 * Add to root layout
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    sameAs: [
      // Add social media URLs here
      'https://twitter.com/mentispk',
      'https://facebook.com/mentispk',
      'https://linkedin.com/company/mentispk',
    ],
  };
}

/**
 * Website + SearchAction Schema
 * Add to blog index page
 */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Article JSON-LD Schema
 * Add to individual blog post pages
 */
export function getArticleSchema(article: Article) {
  const imageUrl = article.coverImage?.url
    ? (article.coverImage.url.startsWith('http')
        ? article.coverImage.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.coverImage.url}`)
    : `${SITE_URL}/default-blog-image.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

/**
 * BreadcrumbList Schema
 * Add to blog post pages
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate metadata for blog index page
 */
export function getBlogMetadata() {
  return {
    title: 'Blog | MENTIS - Career Guidance Insights',
    description: 'Explore expert articles on career guidance, assessment, and professional development from MENTIS.',
    openGraph: {
      title: 'Blog | MENTIS',
      description: 'Explore expert articles on career guidance, assessment, and professional development.',
      url: `${SITE_URL}/blog`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-blog.jpg`,
          width: 1200,
          height: 630,
          alt: 'MENTIS Blog',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | MENTIS',
      description: 'Explore expert articles on career guidance and professional development.',
      images: [`${SITE_URL}/og-blog.jpg`],
    },
    alternates: {
      canonical: `${SITE_URL}/blog`,
    },
  };
}

/**
 * Generate metadata for individual article
 */
export function getArticleMetadata(article: Article) {
  const imageUrl = article.coverImage?.url
    ? (article.coverImage.url.startsWith('http')
        ? article.coverImage.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.coverImage.url}`)
    : `${SITE_URL}/default-blog-image.jpg`;

  return {
    title: article.seoTitle || `${article.title} | MENTIS Blog`,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}/blog/${article.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

/**
 * Get site URL helper
 */
export function getSiteUrl(): string {
  return SITE_URL;
}
