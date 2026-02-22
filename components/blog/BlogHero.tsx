export default function BlogHero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          MENTIS Blog
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          Expert insights on career guidance, assessment strategies, and professional development
        </p>
      </div>
    </section>
  );
}
