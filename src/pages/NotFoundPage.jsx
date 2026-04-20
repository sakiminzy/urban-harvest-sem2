import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-6 text-center">
      <div className="card-surface border border-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-forest">
          This page has wandered off the garden path
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          The route you entered does not exist in Urban Harvest Hub. Head back
          to the homepage or continue browsing categories.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Return home
          </Link>
          <Link to="/categories" className="btn-secondary">
            Browse categories
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
