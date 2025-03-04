import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaRobot, FaChartLine, FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch("http://localhost:3000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser({ name: "Guest", email: "N/A" });
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            {user ? (
              <>
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-600">Your email: {user.email}</p>
              </>
            ) : (
              <p className="text-gray-600">Loading user data...</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/tasks"
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              <FaTasks className="text-5xl text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Your Tasks
              </h3>
              <p className="text-gray-600">
                View and manage your tasks efficiently.
              </p>
            </Link>

            <Link
              to="/ai-suggestions"
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              <FaRobot className="text-5xl text-purple-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                AI Suggestions
              </h3>
              <p className="text-gray-600">
                Get AI-powered insights for better task management.
              </p>
            </Link>

            <Link
              to="/reports"
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              <FaChartLine className="text-5xl text-green-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Reports & Analytics
              </h3>
              <p className="text-gray-600">
                Track your productivity with insights.
              </p>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <button
              className="bg-blue-600 text-white w-full py-4 rounded-lg flex items-center justify-center text-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/tasks/add")}
            >
              <FaPlus className="mr-2" />
              Add New Task
            </button>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Recent Activity
              </h3>
              <p className="text-gray-600">
                No recent tasks. Start adding tasks now!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
