import { useEffect, useMemo, useState } from "react";
import ItemCard from "../components/common/ItemCard";
import ItemDetailPanel from "../components/common/ItemDetailPanel";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";
import SectionHeading from "../components/ui/SectionHeading";
import { fetchItems } from "../services/itemApi";
import { categories, filterItems } from "../utils/items";

function CategoriesPage() {
  const [allItems, setAllItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const items = await fetchItems();

        if (isMounted) {
          setAllItems(items);
          setSelectedItemId(items[0]?.id || "");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = useMemo(
    () => filterItems(allItems, activeCategory, searchTerm),
    [allItems, activeCategory, searchTerm]
  );

  const selectedItem =
    filteredItems.find((item) => item.id === selectedItemId) || filteredItems[0] || null;

  useEffect(() => {
    if (!selectedItem && filteredItems.length > 0) {
      setSelectedItemId(filteredItems[0].id);
    }
  }, [filteredItems, selectedItem]);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Categories"
        title="Filter and explore eco-friendly content"
        description="This page now loads item data from the Urban Harvest Hub backend API. Use the category buttons and search input together to narrow the results, then select any card to see the master-detail preview."
      />

      <section className="card-surface border border-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="badge-soft text-forest">
            {filteredItems.length} item{filteredItems.length === 1 ? "" : "s"} found
          </span>
          <span>
            Active category: <strong>{activeCategory}</strong>
          </span>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_1.05fr]">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-forest">Browse the collection</h2>

          {loading ? (
            <div className="card-surface border border-dashed border-slate-300">
              <p className="text-lg font-semibold text-slate-900">Loading items...</p>
              <p className="mt-2 text-slate-600">
                Fetching the latest product, workshop, and event listings from the API.
              </p>
            </div>
          ) : error ? (
            <div className="card-surface border border-rose-200 bg-rose-50">
              <p className="text-lg font-semibold text-rose-700">Unable to load items</p>
              <p className="mt-2 text-rose-600">{error}</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="card-surface border border-dashed border-slate-300">
              <p className="text-lg font-semibold text-slate-900">No matches found</p>
              <p className="mt-2 text-slate-600">
                Try a different search term or reset the category filter to view
                more Urban Harvest Hub content.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={(selected) => setSelectedItemId(selected.id)}
                  compact
                />
              ))}
            </div>
          )}
        </div>

        <div className="xl:sticky xl:top-8 xl:self-start">
          <h2 className="mb-4 text-2xl font-bold text-forest">Master-detail preview</h2>
          {loading ? (
            <div className="card-surface border border-dashed border-slate-300">
              <p className="text-lg font-semibold text-slate-900">Preparing preview...</p>
              <p className="mt-2 text-slate-600">
                The selected item details will appear here once the API data finishes loading.
              </p>
            </div>
          ) : error ? (
            <div className="card-surface border border-rose-200 bg-rose-50">
              <p className="text-lg font-semibold text-rose-700">Preview unavailable</p>
              <p className="mt-2 text-rose-600">
                The API request failed, so the master-detail panel cannot display item data right now.
              </p>
            </div>
          ) : (
            <ItemDetailPanel item={selectedItem} />
          )}
        </div>
      </section>
    </div>
  );
}

export default CategoriesPage;
