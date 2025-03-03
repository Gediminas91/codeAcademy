import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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

      if (endpoint === "register" || endpoint === "login") {
        localStorage.setItem("token", data.token); // Store JWT
        console.log("🔑 Token saved:", data.token);
      }

      setSuccess(true);
      setTimeout(
        () => navigate(endpoint === "login" ? "/dashboard" : "/login"),
        4000
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return { handleAuth, error, success };
};

export default useAuth;
