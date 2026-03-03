import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center glass sticky top-0 z-50 rounded-b-2xl">
        <div className="text-2xl font-bold text-gradient font-display tracking-tight">
          FindWork SA
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg">
            Join Now
          </Link>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-8 mt-12 mb-24 relative">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <h1 className="text-5xl md:text-7xl font-extrabold font-display leading-tight tracking-tight relative z-10">
            Find the right <span className="text-gradient">freelance</span><br />
            services, right away
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Connect with talented professionals across South Africa.
            Secure payments in ZAR natively with Paystack.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/search" className="w-full sm:w-auto px-8 py-4 bg-foreground text-background dark:bg-white dark:text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-xl">
              Find Services
            </Link>
            <Link href="/become-seller" className="w-full sm:w-auto px-8 py-4 glass-card rounded-full font-semibold text-lg text-foreground hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors">
              Become a Freelancer
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="w-full mt-16 mb-24 text-left">
          <h2 className="text-3xl font-bold font-display mb-10">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: "Web Development", desc: "Build modern, fast websites" },
              { title: "Logo Design", desc: "Build your brand identity" },
              { title: "SEO", desc: "Unlock growth and traffic" },
              { title: "Video Editing", desc: "Create engaging content" },
            ].map((cat, i) => (
              <div key={i} className="glass-card p-6 flex flex-col items-start cursor-pointer group">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl mb-6 group-hover:bg-primary-500 transition-colors flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary-600 group-hover:bg-white rounded-full transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">{cat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full glass py-8 mt-auto border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          &copy; 2026 FindWork SA. Designed for South Africa.
        </div>
      </footer>
    </div>
  );
}
