import useGeolocation from "../../hooks/useGeolocation";

function calculateDistance(latitudeOne, longitudeOne, latitudeTwo, longitudeTwo) {
  const earthRadiusKm = 6371;
  const toRadians = (value) => (value * Math.PI) / 180;
  const latitudeDifference = toRadians(latitudeTwo - latitudeOne);
  const longitudeDifference = toRadians(longitudeTwo - longitudeOne);

  const haversineValue =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(latitudeOne)) *
      Math.cos(toRadians(latitudeTwo)) *
      Math.sin(longitudeDifference / 2) ** 2;

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return earthRadiusKm * angularDistance;
}

function GeolocationPanel({ item }) {
  const { location, loading, error, getCurrentLocation } = useGeolocation();

  if (!item?.latitude || !item?.longitude) {
    return null;
  }

  const distance =
    location &&
    calculateDistance(
      location.latitude,
      location.longitude,
      item.latitude,
      item.longitude
    );

  return (
    <section className="card-surface border border-slate-200">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
        Geolocation
      </p>
      <h2 className="mt-2 text-2xl font-bold text-forest">
        Check your distance to this venue
      </h2>
      <p className="mt-4 leading-7 text-slate-600">
        Use your device location to estimate how far you are from this Urban Harvest Hub item or event venue.
      </p>

      <div className="mt-5 flex flex-wrap gap-4">
        <button type="button" onClick={getCurrentLocation} className="btn-primary">
          {loading ? "Finding location..." : "Use my location"}
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Open in Maps
        </a>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          {error}
        </p>
      )}

      {distance && (
        <div className="mt-4 rounded-2xl bg-sand/80 px-4 py-4 dark:bg-slate-800">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
            Estimated distance
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
            {distance.toFixed(1)} km away
          </p>
        </div>
      )}
    </section>
  );
}

export default GeolocationPanel;
