import { Link } from "react-router-dom";
import { formatItemDate, formatPrice } from "../../utils/items";

function ItemCard({
  item,
  isSelected = false,
  onSelect,
  showCategory = true,
  compact = false,
}) {
  const cardBody = (
    <>
      <img
        src={item.image}
        alt={item.imageAlt}
        className={`w-full object-cover ${compact ? "h-44" : "h-56"}`}
      />

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {showCategory && (
            <span className="badge-soft text-forest">{item.category}</span>
          )}
          <span className="badge-soft text-earth">{item.type}</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-clamp-3 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        </div>

        <dl className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-900">Price</dt>
            <dd>{formatPrice(item.price)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Availability</dt>
            <dd>{item.availability}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-900">Location</dt>
            <dd>{item.location}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-900">Schedule</dt>
            <dd>{formatItemDate(item.date)}</dd>
          </div>
        </dl>
      </div>
    </>
  );

  return (
    <article
      className={`card-surface overflow-hidden border transition ${
        isSelected
          ? "border-forest ring-2 ring-forest/20"
          : "border-slate-200 hover:-translate-y-1 hover:border-forest/40"
      }`}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          aria-pressed={isSelected}
        >
          {cardBody}
        </button>
      ) : (
        <div>{cardBody}</div>
      )}

      <div className="flex flex-wrap gap-3 border-t border-slate-100 px-5 py-4">
        <Link to={`/items/${item.id}`} className="btn-primary text-sm">
          View Details
        </Link>
        <Link to={`/booking?item=${item.id}`} className="btn-secondary text-sm">
          Book or Register
        </Link>
      </div>
    </article>
  );
}

export default ItemCard;
