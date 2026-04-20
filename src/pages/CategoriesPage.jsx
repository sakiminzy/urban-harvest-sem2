import { useEffect, useMemo, useState } from "react";
import ItemCard from "../components/common/ItemCard";
import ItemDetailPanel from "../components/common/ItemDetailPanel";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";
import SectionHeading from "../components/ui/SectionHeading";
import { categories, filterItems, getAllItems } from "../utils/items";

function CategoriesPage() {
  const allItems = getAllItems();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(allItems[0]?.id ?? "");

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
        description="This page reads its content from internal JSON seed data. Use the category buttons and search input to narrow the results, then select any card to see the master-detail preview."
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

          {filteredItems.length === 0 ? (
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
          <ItemDetailPanel item={selectedItem} />
        </div>
      </section>
    </div>
  );
}

export default CategoriesPage;
