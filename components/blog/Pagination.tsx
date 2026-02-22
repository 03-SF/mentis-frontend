import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const pages = [];
  const maxVisible = 5;

  // Calculate start and end pages
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
        className={`px-4 py-2 rounded-lg border font-medium transition ${
          currentPage > 1
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </Link>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <Link
            href={`${baseUrl}?page=1`}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${baseUrl}?page=${page}`}
          className={`px-4 py-2 rounded-lg border font-medium transition ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
          <Link
            href={`${baseUrl}?page=${totalPages}`}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      <Link
        href={
          currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'
        }
        className={`px-4 py-2 rounded-lg border font-medium transition ${
          currentPage < totalPages
            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </Link>
    </nav>
  );
}
