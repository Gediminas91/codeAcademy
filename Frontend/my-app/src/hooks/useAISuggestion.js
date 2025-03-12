import { useState } from "react";

export function useAISuggestion(apiUrl) {
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAISuggestion = async (description) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to get suggestion");

      setAiSuggestion(data.suggestion);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { aiSuggestion, fetchAISuggestion, loading, error };
}
