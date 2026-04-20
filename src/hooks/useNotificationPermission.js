import { useEffect, useState } from "react";

function getPermissionState() {
  if (!("Notification" in window)) {
    return "unsupported";
  }

  return Notification.permission;
}

function useNotificationPermission() {
  const [permission, setPermission] = useState(getPermissionState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPermission(getPermissionState());
  }, []);

  async function requestPermission() {
    if (!("Notification" in window)) {
      setMessage("Notifications are not supported on this device.");
      return;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);

    if (nextPermission === "granted") {
      setMessage("Notifications are enabled for Urban Harvest Hub.");
    } else if (nextPermission === "denied") {
      setMessage("Notification permission was denied.");
    } else {
      setMessage("Notification permission request was dismissed.");
    }
  }

  return { permission, message, requestPermission };
}

export default useNotificationPermission;
