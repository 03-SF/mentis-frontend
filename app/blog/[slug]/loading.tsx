export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs Skeleton */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        </div>
      </div>

      {/* Hero Skeleton */}
      <header className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-full mb-4 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-2/3 mb-6 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-5/6 mb-8 animate-pulse" />
        </div>
      </header>

      {/* Featured Image Skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
