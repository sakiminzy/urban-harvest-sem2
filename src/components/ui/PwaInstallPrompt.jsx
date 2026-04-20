import { useState } from "react";
import useInstallPrompt from "../../hooks/useInstallPrompt";

function PwaInstallPrompt() {
  const { canInstall, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) {
    return null;
  }

  return (
    <div className="mx-auto mb-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="card-surface border border-forest/20 bg-white/95">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-earth">
              Install App
            </p>
            <h2 className="mt-2 text-2xl font-bold text-forest">
              Add Urban Harvest Hub to your device
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Install the app for faster access, offline support, and a more mobile-friendly experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={promptInstall}>
              Install now
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setDismissed(true)}
            >
              Maybe later
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PwaInstallPrompt;
