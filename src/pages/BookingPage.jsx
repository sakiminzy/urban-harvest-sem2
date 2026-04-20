import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import { createBooking, fetchItems } from "../services/itemApi";

const initialForm = {
  name: "",
  email: "",
  selectedItem: "",
  notes: "",
};

function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectedItemSlug = searchParams.get("item") || "";
  const [bookableItems, setBookableItems] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBookableItems() {
      setLoadingItems(true);
      setApiError("");

      try {
        const items = await fetchItems();
        const filteredItems = items.filter(
          (item) => item.type === "Workshop" || item.type === "Event"
        );

        if (isMounted) {
          setBookableItems(filteredItems);

          const preselectedItem = filteredItems.find(
            (item) => item.id === preselectedItemSlug
          );

          setFormData((currentForm) => ({
            ...currentForm,
            selectedItem: preselectedItem?.dbId || "",
          }));
        }
      } catch (fetchError) {
        if (isMounted) {
          setApiError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoadingItems(false);
        }
      }
    }

    loadBookableItems();

    return () => {
      isMounted = false;
    };
  }, [preselectedItemSlug]);

  const selectedBookingItem = useMemo(
    () => bookableItems.find((item) => item.dbId === formData.selectedItem),
    [bookableItems, formData.selectedItem]
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.selectedItem) {
      nextErrors.selectedItem = "Please choose a workshop or event.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setLoadingSubmit(true);
    setApiError("");

    try {
      const result = await createBooking({
        name: formData.name,
        email: formData.email,
        itemId: formData.selectedItem,
      });

      setMessage(
        result.message ||
          `Thanks, ${formData.name}. Your booking request has been recorded successfully.`
      );
      setErrors({});
      setFormData(initialForm);
    } catch (submitError) {
      setApiError(submitError.message);
      setMessage("We could not submit your booking right now.");
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Booking"
        title="Register for a workshop or event"
        description="Choose an activity from Urban Harvest Hub, enter your details, and submit the form. This page now sends booking data to the backend API."
      />

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="card-surface border border-slate-200">
          <h2 className="text-2xl font-bold text-forest">Available registrations</h2>
          <p className="mt-3 text-slate-600">
            These bookable experiences are now loaded from the backend API.
          </p>

          {loadingItems ? (
            <p className="mt-6 text-slate-600">Loading available workshops and events...</p>
          ) : apiError && bookableItems.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-rose-700">
              {apiError}
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {bookableItems.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-sand/60 p-4"
                >
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.type} | {item.location}
                  </p>
                  <Link
                    to={`/items/${item.id}`}
                    className="mt-3 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline"
                  >
                    View details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="card-surface border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-rose-700">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-rose-700">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="selectedItem"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Select a workshop or event
              </label>
              <select
                id="selectedItem"
                name="selectedItem"
                required
                value={formData.selectedItem}
                onChange={handleChange}
                className="form-input"
                aria-invalid={Boolean(errors.selectedItem)}
                aria-describedby={
                  errors.selectedItem ? "selected-item-error" : undefined
                }
                disabled={loadingItems || bookableItems.length === 0}
              >
                <option value="">Choose an activity</option>
                {bookableItems.map((item) => (
                  <option key={item.dbId} value={item.dbId}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.selectedItem && (
                <p id="selected-item-error" className="mt-2 text-sm text-rose-700">
                  {errors.selectedItem}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Extra notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                className="form-input resize-none"
                placeholder="Optional accessibility or participation notes"
              />
            </div>

            {selectedBookingItem && (
              <div className="rounded-2xl bg-sand/70 px-4 py-3 text-sm text-slate-700">
                You are registering for <strong>{selectedBookingItem.title}</strong>.
              </div>
            )}

            {apiError && (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {apiError}
              </p>
            )}

            {message && (
              <p
                className={`rounded-2xl px-4 py-3 text-sm ${
                  Object.keys(errors).length > 0 || apiError
                    ? "bg-rose-50 text-rose-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}
                aria-live="polite"
                role={Object.keys(errors).length > 0 || apiError ? "alert" : "status"}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loadingSubmit || loadingItems}
            >
              {loadingSubmit ? "Submitting..." : "Submit booking"}
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}

export default BookingPage;
