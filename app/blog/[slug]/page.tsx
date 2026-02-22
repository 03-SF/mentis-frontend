import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getAllArticleSlugs, getStrapiImageUrl } from '@/lib/strapi';
import { getArticleMetadata, getArticleSchema, getBreadcrumbSchema, getSiteUrl } from '@/lib/seo';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import ShareBar from '@/components/blog/ShareBar';
import NewsletterCTA from '@/components/blog/NewsletterCTA';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);
    if (!article) {
      return {
        title: 'Article Not Found | MENTIS Blog',
      };
    }
    return getArticleMetadata(article);
  } catch (error) {
    return {
      title: 'Error | MENTIS Blog',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const readingTime = calculateReadingTime(article.content);
  const publishedDate = formatDate(article.publishedAt);
  const coverImageUrl = getStrapiImageUrl(article.coverImage?.url);

  const breadcrumbItems = [
    { name: 'Home', url: getSiteUrl() },
    { name: 'Blog', url: `${getSiteUrl()}/blog` },
    { name: article.title, url: `${getSiteUrl()}/blog/${article.slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getArticleSchema(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* Article Header */}
      <article className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <header className="bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <time dateTime={article.publishedAt}>{publishedDate}</time>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Share Bar */}
            <ShareBar
              url={`${getSiteUrl()}/blog/${article.slug}`}
              title={article.title}
            />
          </div>
        </header>

        {/* Featured Image */}
        {coverImageUrl && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={coverImageUrl}
                alt={article.coverImage?.alternativeText || article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="prose prose-lg prose-blue max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-gray-700 prose-li:my-2
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
              prose-blockquote:my-8 prose-blockquote:italic
              prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1
              prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NewsletterCTA />
        </div>

        {/* Back to Blog */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}
