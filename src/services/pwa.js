async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    await navigator.serviceWorker.register("/sw.js");
    console.log("Service worker registered.");
  } catch (error) {
    console.error("Service worker registration failed:", error);
  }
}

export { registerServiceWorker };
