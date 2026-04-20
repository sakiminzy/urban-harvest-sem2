import { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherService";

function useWeather(item) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!item || item.type === "Product") {
      setWeather(null);
      setLoading(false);
      setError("");
      return;
    }

    let isMounted = true;

    async function loadWeather() {
      setLoading(true);
      setError("");

      try {
        const forecast = await fetchWeather(item.latitude, item.longitude);

        if (isMounted) {
          setWeather(forecast);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [item]);

  return { weather, loading, error };
}

export default useWeather;
