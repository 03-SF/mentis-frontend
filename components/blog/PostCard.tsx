import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/blog';
import { getStrapiImageUrl } from '@/lib/strapi';
import { formatDate, calculateReadingTime } from '@/lib/utils';

interface PostCardProps {
  article: Article;
}

export default function PostCard({ article }: PostCardProps) {
  const coverImageUrl = getStrapiImageUrl(article.coverImage?.url);
  const readingTime = calculateReadingTime(article.content);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Cover Image */}
      {coverImageUrl && (
        <div className="relative w-full aspect-video overflow-hidden bg-gray-200">
          <Image
            src={coverImageUrl}
            alt={article.coverImage?.alternativeText || article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>

        {/* Read More */}
        <div className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">
          Read Article →
        </div>
      </div>
    </Link>
  );
}
