import { useState } from "react";

const useAuth = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAuth = async (endpoint, userData) => {
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(`${endpoint} failed`);
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ Store token
        console.log("🔑 Token saved:", localStorage.getItem("token")); // Debugging
      }

      setSuccess(true);

      setTimeout(() => {
        if (endpoint === "register" || endpoint === "login") {
          window.location.href = "/dashboard"; // ✅ Redirect to dashboard immediately
        }
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleAuth, error, success };
};

export default useAuth;
