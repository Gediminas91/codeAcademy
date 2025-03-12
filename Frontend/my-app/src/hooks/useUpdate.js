import { useState } from "react";

export function useUpdate(apiUrl, setTasks) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTask = async (taskId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update task");
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedData } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { updateTask, loading, error };
}
