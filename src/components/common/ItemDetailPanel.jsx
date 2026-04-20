import { Link } from "react-router-dom";
import { formatItemDate, formatPrice } from "../../utils/items";

function ItemDetailPanel({ item }) {
  if (!item) {
    return (
      <div className="card-surface border border-dashed border-slate-300">
        <h2 className="text-2xl font-semibold text-forest">No item selected</h2>
        <p className="mt-3 max-w-xl text-slate-600">
          Choose a card from the list to view more information about the item,
          including pricing, availability, and location details.
        </p>
      </div>
    );
  }

  return (
    <article className="card-surface border border-slate-200">
      <img
        src={item.image}
        alt={item.imageAlt}
        className="h-72 w-full rounded-3xl object-cover"
      />

      <div className="mt-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          <span className="badge-soft text-forest">{item.category}</span>
          <span className="badge-soft text-earth">{item.type}</span>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-900">{item.title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            {item.description}
          </p>
        </div>

        <dl className="grid gap-4 rounded-3xl bg-sand/70 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Availability
            </dt>
            <dd className="mt-1 text-base text-slate-900">{item.availability}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Price
            </dt>
            <dd className="mt-1 text-base text-slate-900">{formatPrice(item.price)}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Location
            </dt>
            <dd className="mt-1 text-base text-slate-900">{item.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Date
            </dt>
            <dd className="mt-1 text-base text-slate-900">{formatItemDate(item.date)}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-4">
          <Link to={`/items/${item.id}`} className="btn-secondary">
            Open Full Details
          </Link>
          <Link to={`/booking?item=${item.id}`} className="btn-primary">
            Continue to Booking
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ItemDetailPanel;
