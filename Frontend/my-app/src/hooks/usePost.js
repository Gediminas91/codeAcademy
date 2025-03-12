import { useState } from "react";

export function usePost(apiUrl, setTasks) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = {
        ...taskData,
        date: new Date().toISOString(), 
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

      setTasks((prevTasks) => [...prevTasks, { ...newTask, _id: data.taskId }]);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { postTask, loading, error };
}
