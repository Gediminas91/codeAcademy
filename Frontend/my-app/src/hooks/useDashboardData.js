import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useDashboardData = () => {
  const [user, setUser] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch("http://localhost:3001/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");
        setUser(await response.json());
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser({ name: "Guest", email: "N/A" });
      }
    };

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [totalRes, statusRes, recentRes] = await Promise.all([
          fetch("http://localhost:3001/api/dash/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3001/api/dash/status-counts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3001/api/dash/recent", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTotalTasks((await totalRes.json()).totalTasks);
        setTaskStats((await statusRes.json()).percentages);
        setRecentTasks(await recentRes.json());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchUserData();
    fetchDashboardData();
  }, [navigate]);

  return { user, totalTasks, taskStats, recentTasks };
};
