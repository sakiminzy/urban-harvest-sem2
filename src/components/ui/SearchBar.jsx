function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-xl">
      <label htmlFor="item-search" className="mb-2 block text-sm font-semibold text-slate-700">
        Search products, workshops, or events
      </label>
      <input
        id="item-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try compost, workshop, Melbourne, Food..."
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-forest focus:ring-2 focus:ring-forest/20"
      />
    </div>
  );
}

export default SearchBar;
