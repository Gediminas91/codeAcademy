import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaRobot, FaChartLine, FaClipboardList } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Todo from "../assets/Todo.svg";

const Dashboard = () => {
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

        const response = await fetch("http://localhost:3000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser({ name: "Guest", email: "N/A" });
      }
    };

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch total tasks
        const totalRes = await fetch("http://localhost:3000/api/dash/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const totalData = await totalRes.json();
        setTotalTasks(totalData.totalTasks);

        // Fetch task status counts
        const statusRes = await fetch(
          "http://localhost:3000/api/dash/status-counts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const statusData = await statusRes.json();
        setTaskStats(statusData.percentages);

        // Fetch recent tasks
        const recentRes = await fetch("http://localhost:3000/api/dash/recent", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const recentData = await recentRes.json();
        setRecentTasks(recentData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchUserData();
    fetchDashboardData();
  }, [navigate]);

  // Pie chart data
  const pieData = [
    { name: "Completed", value: parseFloat(taskStats.completed) },
    { name: "In Progress", value: parseFloat(taskStats.inProgress) },
    { name: "Pending", value: parseFloat(taskStats.pending) },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // Green, Orange, Red

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${pieData[index].value.toFixed(1)}%`}
      </text>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-6">
          {/* Welcome Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {user ? (
              <>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-600">Your email: {user.email}</p>
              </>
            ) : (
              <p className="text-gray-600">Loading user data...</p>
            )}
          </div>

          {/* Links Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
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

          {/* Overview Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Total Tasks
              </h3>
              <div className="flex flex-col items-center">
                <img
                  src={Todo}
                  alt="Tasks Illustration"
                  className="w-28 h-28 md:w-32 md:h-32"
                />
                <span className="mt-3 text-5xl font-bold text-gray-900  px-5 py-2">
                  {totalTasks}
                </span>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Task Status
              </h3>
              <PieChart width={220} height={220}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomLabel}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            {recentTasks.length > 0 ? (
              <ul className="space-y-4">
                {recentTasks.map((task) => (
                  <li
                    key={task._id}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Updated: {new Date(task.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "In Progress"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">
                No recent tasks. Start adding tasks now!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
