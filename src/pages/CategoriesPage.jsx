function CategoriesPage() {
  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
          Categories
        </p>
        <h1 className="mt-2 text-3xl font-bold text-forest">
          Browse Eco-Friendly Collections
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This page will become the master-detail view for Food, Lifestyle, and
          Education. In the next step, we will load category data from JSON and
          let users filter items dynamically.
        </p>
      </header>
    </section>
  );
}

export default CategoriesPage;
