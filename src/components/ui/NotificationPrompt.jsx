import useNotificationPermission from "../../hooks/useNotificationPermission";

function NotificationPrompt() {
  const { permission, message, requestPermission } = useNotificationPermission();

  if (permission === "unsupported" || permission === "granted") {
    return null;
  }

  return (
    <div className="mx-auto mb-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="card-surface border border-earth/20 bg-white/95 dark:bg-slate-900/95">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
              Notifications
            </p>
            <h2 className="mt-2 text-2xl font-bold text-forest">
              Turn on update alerts
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
              Allow notifications so Urban Harvest Hub can later alert users about new workshops, events, and eco-friendly item updates.
            </p>
            {message && (
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{message}</p>
            )}
          </div>

          <button type="button" className="btn-secondary" onClick={requestPermission}>
            Enable notifications
          </button>
        </div>
      </section>
    </div>
  );
}

export default NotificationPrompt;
