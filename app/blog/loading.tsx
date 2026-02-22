export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 bg-white/20 rounded-lg w-2/3 mb-4 animate-pulse" />
          <div className="h-6 bg-white/20 rounded-lg w-1/2 animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles Grid Skeleton */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200" />
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                      <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
