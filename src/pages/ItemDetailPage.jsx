import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GeolocationPanel from "../components/common/GeolocationPanel";
import ItemCard from "../components/common/ItemCard";
import WeatherPanel from "../components/common/WeatherPanel";
import SectionHeading from "../components/ui/SectionHeading";
import useWeather from "../hooks/useWeather";
import { fetchItemById, fetchItems } from "../services/itemApi";
import { formatItemDate, formatPrice } from "../utils/items";

function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loadingItem, setLoadingItem] = useState(true);
  const [error, setError] = useState("");
  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather(item);

  useEffect(() => {
    let isMounted = true;

    async function loadItemDetails() {
      setLoadingItem(true);
      setError("");

      try {
        const currentItem = await fetchItemById(id);

        if (!isMounted) {
          return;
        }

        setItem(currentItem);

        const categoryItems = await fetchItems({ category: currentItem.category });

        if (isMounted) {
          setRelatedItems(
            categoryItems.filter((relatedItem) => relatedItem.id !== currentItem.id).slice(0, 2)
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
          setItem(null);
          setRelatedItems([]);
        }
      } finally {
        if (isMounted) {
          setLoadingItem(false);
        }
      }
    }

    loadItemDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loadingItem) {
    return (
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Loading"
          title="Loading item details"
          description="Urban Harvest Hub is fetching the selected item from the backend API."
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Load error"
          title="We couldn't load this item right now"
          description={error}
        />
        <div className="flex flex-wrap gap-4">
          <Link to="/categories" className="btn-primary">
            Browse categories
          </Link>
          <Link to="/" className="btn-secondary">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Item not found"
          title="We couldn't find that Urban Harvest Hub listing"
          description="The item may have been removed or the URL may be incorrect. You can go back to the categories page and continue browsing the collection."
        />
        <div className="flex flex-wrap gap-4">
          <Link to="/categories" className="btn-primary">
            Browse categories
          </Link>
          <Link to="/" className="btn-secondary">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow={`${item.category} ${item.type}`}
        title={item.title}
        description={item.description}
      />

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="card-surface border border-slate-200">
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-80 w-full rounded-3xl object-cover sm:h-[26rem]"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-sand/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Availability
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {item.availability}
              </p>
            </div>
            <div className="rounded-3xl bg-sand/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Price
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {formatPrice(item.price)}
              </p>
            </div>
            <div className="rounded-3xl bg-sand/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Location
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {item.location}
              </p>
            </div>
            <div className="rounded-3xl bg-sand/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Date
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {formatItemDate(item.date)}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link to={`/booking?item=${item.id}`} className="btn-primary">
              Book or Register
            </Link>
            <Link to="/categories" className="btn-secondary">
              Back to categories
            </Link>
          </div>
        </article>

        <aside className="space-y-6">
          {item.type !== "Product" ? (
            <WeatherPanel
              weather={weather}
              loading={weatherLoading}
              error={weatherError}
            />
          ) : (
            <section className="card-surface border border-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
                Good to know
              </p>
              <h2 className="mt-2 text-2xl font-bold text-forest">
                Product listing details
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Weather information is shown for workshops and events only.
                Product listings focus on availability, pickup location, and
                pricing instead.
              </p>
            </section>
          )}

          <section className="card-surface border border-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
              Why this matters
            </p>
            <h2 className="mt-2 text-2xl font-bold text-forest">
              Sustainable value
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Urban Harvest Hub highlights practical, local sustainability
              options that are easy for eco-conscious communities to access and
              understand.
            </p>
          </section>

          <GeolocationPanel item={item} />
        </aside>
      </section>

      {relatedItems.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-forest">More in {item.category}</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {relatedItems.map((relatedItem) => (
              <ItemCard key={relatedItem.id} item={relatedItem} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ItemDetailPage;
