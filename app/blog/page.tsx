import { Metadata } from 'next';
import Link from 'next/link';
import { getArticles, getFeaturedArticles } from '@/lib/strapi';
import { getBlogMetadata, getWebsiteSchema } from '@/lib/seo';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import PostCard from '@/components/blog/PostCard';
import Sidebar from '@/components/blog/Sidebar';
import Pagination from '@/components/blog/Pagination';

export const metadata: Metadata = getBlogMetadata();

export const revalidate = 60; // ISR - revalidate every 60 seconds

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 9;

  try {
    // Fetch articles and featured posts in parallel
    const [articlesResponse, featuredPosts] = await Promise.all([
      getArticles({ page: currentPage, pageSize }),
      getFeaturedArticles(3),
    ]);

    const { data: articles, meta } = articlesResponse;
    const pagination = meta.pagination;

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />

        {/* Hero Section */}
        <BlogHero />

        {/* Main Content */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Posts */}
            {currentPage === 1 && featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Featured Articles
                </h2>
                <FeaturedPosts posts={featuredPosts} />
              </section>
            )}

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Articles Grid */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Latest Articles
                </h2>

                {articles.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      No articles found. Check back soon!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {articles.map((article) => (
                        <PostCard key={article.id} article={article} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.pageCount > 1 && (
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.pageCount}
                        baseUrl="/blog"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <Sidebar />
              </aside>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unable to Load Blog
          </h1>
          <p className="text-gray-600 mb-8">
            We're having trouble connecting to our content server. Please try again later.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
