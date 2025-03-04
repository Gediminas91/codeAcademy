import { useState } from "react";

export function useDelete(apiUrl, setTasks) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete task");
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { deleteTask, loading, error };
}
