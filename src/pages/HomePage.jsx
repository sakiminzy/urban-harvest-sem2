import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-earth">
          Sustainable Community Living
        </p>
        <h1 className="max-w-3xl text-4xl font-bold text-forest sm:text-5xl">
          Explore greener ways to shop, learn, and connect in your city.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Urban Harvest Hub is a responsive single page application that helps
          eco-conscious communities discover products, workshops, and events in
          one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/categories" className="btn-primary">
            Explore Categories
          </Link>
          <Link to="/booking" className="btn-secondary">
            Book a Workshop
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="card-surface">
          <h2 className="text-xl font-semibold text-forest">Food</h2>
          <p className="mt-2 text-slate-600">
            Find organic produce, compost kits, and urban growing essentials for
            healthier homes.
          </p>
        </article>

        <article className="card-surface">
          <h2 className="text-xl font-semibold text-forest">Lifestyle</h2>
          <p className="mt-2 text-slate-600">
            Browse reusable products and low-waste alternatives that support
            mindful daily routines.
          </p>
        </article>

        <article className="card-surface">
          <h2 className="text-xl font-semibold text-forest">Education</h2>
          <p className="mt-2 text-slate-600">
            Discover workshops and community events that teach practical
            sustainability skills.
          </p>
        </article>
      </div>
    </section>
  );
}

export default HomePage;
