import { useEffect, useState } from "react";

export function useFetch(apiUrl, setTasks) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Missing authentication token");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch tasks");

        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [apiUrl, setTasks]);

  return { loading, error };
}
