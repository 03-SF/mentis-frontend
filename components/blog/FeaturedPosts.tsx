import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/blog';
import { getStrapiImageUrl } from '@/lib/strapi';
import { formatDate } from '@/lib/utils';

interface FeaturedPostsProps {
  posts: Article[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  const [mainPost, ...sidePosts] = posts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Main Featured Post */}
      <Link
        href={`/blog/${mainPost.slug}`}
        className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        {mainPost.coverImage && (
          <div className="relative w-full aspect-video">
            <Image
              src={getStrapiImageUrl(mainPost.coverImage.url) || ''}
              alt={mainPost.coverImage.alternativeText || mainPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-3">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {mainPost.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{mainPost.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <time dateTime={mainPost.publishedAt}>
              {formatDate(mainPost.publishedAt)}
            </time>
            <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
              Read More →
            </span>
          </div>
        </div>
      </Link>

      {/* Side Featured Posts */}
      {sidePosts.length > 0 && (
        <div className="flex flex-col gap-6">
          {sidePosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex"
            >
              {post.coverImage && (
                <div className="relative w-1/3 flex-shrink-0">
                  <Image
                    src={getStrapiImageUrl(post.coverImage.url) || ''}
                    alt={post.coverImage.alternativeText || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5 flex-1">
                <div className="text-xs text-blue-600 font-semibold mb-2">
                  Featured
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <time
                  dateTime={post.publishedAt}
                  className="text-xs text-gray-500"
                >
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
