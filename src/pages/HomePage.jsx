import { Link } from "react-router-dom";
import ItemCard from "../components/common/ItemCard";
import SectionHeading from "../components/ui/SectionHeading";
import { categories, getFeaturedItems } from "../utils/items";

function HomePage() {
  const featuredItems = getFeaturedItems().slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-earth">
            Sustainable Community Living
          </p>
          <h1 className="max-w-3xl text-4xl font-bold text-forest sm:text-5xl">
            Urban Harvest Hub helps communities shop smarter, learn practical
            green skills, and join local eco events.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            This responsive single page application showcases eco-friendly
            products, hands-on workshops, and local events across Food,
            Lifestyle, and Education. It is designed to be simple to explore
            and easy to demonstrate in a university presentation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/categories" className="btn-primary">
              Explore all items
            </Link>
            <Link to="/booking" className="btn-secondary">
              Register now
            </Link>
          </div>
        </div>

        <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="card-surface border border-slate-200 bg-forest text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">
              Community reach
            </p>
            <p className="mt-3 text-4xl font-bold">9+</p>
            <p className="mt-2 text-white/85">
              realistic items covering products, workshops, and events
            </p>
          </div>
          <div className="card-surface border border-slate-200">
            <p className="text-sm uppercase tracking-[0.2em] text-earth">Focus</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">Low-waste living</p>
            <p className="mt-2 text-slate-600">
              Discover sustainable options that fit urban homes, schools, and
              neighbourhoods.
            </p>
          </div>
          <div className="card-surface border border-slate-200">
            <p className="text-sm uppercase tracking-[0.2em] text-earth">Why it matters</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">Easy to explore</p>
            <p className="mt-2 text-slate-600">
              Search, filter, compare, view details, and book from a single SPA.
            </p>
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Categories"
          title="Three clear sustainability pathways"
          description="Urban Harvest Hub is organised into Food, Lifestyle, and Education so users can quickly discover the kind of eco content that matters most to them."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {categories
            .filter((category) => category !== "All")
            .map((category) => (
              <article
                key={category}
                className="card-surface border border-slate-200"
              >
                <h2 className="text-xl font-semibold text-forest">{category}</h2>
                <p className="mt-2 text-slate-600">
                  {category === "Food" &&
                    "Organic produce, urban farming tools, workshops, and community market experiences."}
                  {category === "Lifestyle" &&
                    "Reusable essentials, repair-focused events, and mindful low-waste habits for everyday life."}
                  {category === "Education" &&
                    "Beginner-friendly learning resources, skill-building workshops, and public sustainability talks."}
                </p>
                <Link
                  to="/categories"
                  className="mt-4 inline-flex font-semibold text-forest underline-offset-4 hover:underline"
                >
                  Browse {category}
                </Link>
              </article>
            ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Featured"
          title="Popular picks for your demo"
          description="These featured examples give you a balanced mix of product, workshop, and event content to demonstrate the assignment requirements."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
