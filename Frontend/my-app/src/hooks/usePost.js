import { useState } from "react";

export function usePost(apiUrl, setTasks) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Ensure date is included when posting a task
      const newTask = {
        ...taskData,
        date: new Date().toISOString(), // Automatically sets a valid date
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add task");

      // ✅ Ensure new task has a valid date in state update
      setTasks((prevTasks) => [...prevTasks, { ...newTask, _id: data.taskId }]);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { postTask, loading, error };
}
