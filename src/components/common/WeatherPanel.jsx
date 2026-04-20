function WeatherPanel({ weather, loading, error }) {
  return (
    <section className="card-surface border border-slate-200" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
        Weather Snapshot
      </p>
      <h2 className="mt-2 text-2xl font-bold text-forest">Event day conditions</h2>

      {loading && (
        <p className="mt-4 text-slate-600">
          Loading live weather information for this location...
        </p>
      )}

      {!loading && error && (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-rose-700">
          {error}
        </p>
      )}

      {!loading && !error && weather && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-sand/80 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Current conditions
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {weather.temperature}&deg;C
            </p>
            <p className="mt-2 text-slate-600">{weather.summary}</p>
          </div>

          <div className="rounded-3xl bg-sand/80 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Planning info
            </p>
            <p className="mt-2 text-slate-900">
              High {weather.maxTemperature}&deg;C / Low {weather.minTemperature}&deg;C
            </p>
            <p className="mt-2 text-slate-600">
              Wind speed: {weather.windSpeed} km/h
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default WeatherPanel;
