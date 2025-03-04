import { useCallback, useEffect, useState } from "react";

export function useFetch(apiUrl, setTasks) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch tasks");
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [apiUrl, setTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { loading, error, refetch: fetchTasks };
}
