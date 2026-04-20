import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/common/ItemCard";
import SectionHeading from "../components/ui/SectionHeading";
import { fetchItems } from "../services/itemApi";
import { categories } from "../utils/items";

function HomePage() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [featuredError, setFeaturedError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedItems() {
      setLoadingFeatured(true);
      setFeaturedError("");

      try {
        const items = await fetchItems({ featured: "true" });

        if (isMounted) {
          setFeaturedItems(items.slice(0, 3));
        }
      } catch (error) {
        if (isMounted) {
          setFeaturedError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoadingFeatured(false);
        }
      }
    }

    loadFeaturedItems();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft dark:bg-slate-900 sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-earth">
            Sustainable Community Living
          </p>
          <h1 className="max-w-3xl text-4xl font-bold text-forest sm:text-5xl">
            Urban Harvest Hub helps communities shop smarter, learn practical
            green skills, and join local eco events.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            This full-stack progressive web app combines React, Express,
            MongoDB, offline support, and mobile-friendly features into one
            clear university-ready Task 2 submission.
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
              Full-stack
            </p>
            <p className="mt-3 text-4xl font-bold">API + PWA</p>
            <p className="mt-2 text-white/85">
              React frontend, Express REST API, MongoDB, offline support
            </p>
          </div>
          <div className="card-surface border border-slate-200">
            <p className="text-sm uppercase tracking-[0.2em] text-earth">Focus</p>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-50">
              Low-waste living
            </p>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Discover sustainable options that fit urban homes, schools, and
              neighbourhoods.
            </p>
          </div>
          <div className="card-surface border border-slate-200">
            <p className="text-sm uppercase tracking-[0.2em] text-earth">
              Mobile-ready
            </p>
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-50">
              Installable app
            </p>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Includes PWA install prompt, offline access, dark mode, and geolocation.
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
                <p className="mt-2 text-slate-600 dark:text-slate-300">
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
          title="Featured API-powered content"
          description="These featured examples are loaded from the backend so the homepage demonstrates frontend-backend integration as well."
        />

        {loadingFeatured ? (
          <div className="card-surface border border-dashed border-slate-300">
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Loading featured items...
            </p>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Fetching featured products, workshops, and events from the Urban Harvest Hub API.
            </p>
          </div>
        ) : featuredError ? (
          <div className="card-surface border border-rose-200 bg-rose-50 dark:bg-rose-950/40">
            <p className="text-lg font-semibold text-rose-700 dark:text-rose-300">
              Unable to load featured items
            </p>
            <p className="mt-2 text-rose-600 dark:text-rose-300">{featuredError}</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} compact />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
