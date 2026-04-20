import useOnlineStatus from "../../hooks/useOnlineStatus";

function OfflineStatus() {
  const isOnline = useOnlineStatus();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className={`mb-6 rounded-2xl px-4 py-3 text-sm font-medium ${
          isOnline
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
        }`}
        role="status"
        aria-live="polite"
      >
        {isOnline
          ? "You are online. Live API data and updates are available."
          : "You are offline. Cached pages remain available, but live data may be limited until you reconnect."}
      </div>
    </div>
  );
}

export default OfflineStatus;
