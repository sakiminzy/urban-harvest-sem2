function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-3"
      role="toolbar"
      aria-label="Filter by category"
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              isActive
                ? "bg-forest text-white"
                : "bg-white text-slate-700 hover:bg-forest hover:text-white"
            }`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
