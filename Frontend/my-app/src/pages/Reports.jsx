import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:3000/api/reports";

export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [productivityScore, setProductivityScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [summaryRes, trendsRes, timelineRes, scoreRes] = await Promise.all([
        fetch(`${API_URL}/summary`, { headers: authHeaders() }),
        fetch(`${API_URL}/trends`, { headers: authHeaders() }),
        fetch(`${API_URL}/completion-timeline`, { headers: authHeaders() }),
        fetch(`${API_URL}/productivity-score`, { headers: authHeaders() }),
      ]);

      const summaryData = await summaryRes.json();
      const trendsData = await trendsRes.json();
      const timelineData = await timelineRes.json();
      const scoreData = await scoreRes.json();

      setSummary(summaryData);
      setTrends(trendsData);
      setTimeline(timelineData.timelineData);
      setProductivityScore(scoreData.productivityScore);
    } catch (err) {
      setError(err.message, "Failed to fetch reports.");
    }
    setLoading(false);
  };

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Reports & Analytics</h1>

        {/* Task Summary */}
        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <StatCard
              title="Total Tasks"
              value={summary.totalTasks}
              color="blue"
            />
            <StatCard
              title="Completed Tasks"
              value={summary.completedTasks}
              color="green"
            />
            <StatCard
              title="Pending Tasks"
              value={summary.pendingTasks}
              color="red"
            />
          </div>
        )}

        {/* Trends Report */}
        {trends && (
          <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold">📅 Task Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[trends]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weeklyTasks" fill="#3498db" name="Weekly" />
                <Bar dataKey="monthlyTasks" fill="#2ecc71" name="Monthly" />
                <Bar dataKey="yearlyTasks" fill="#e74c3c" name="Yearly" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Completion Timeline */}
        {timeline && (
          <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold">📈 Completion Timeline</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeline}>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip
                  formatter={
                    (value) => new Date(value).toLocaleDateString() // Format timestamp to date
                  }
                />
                <Line type="monotone" dataKey="completedAt" stroke="#3498db" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Productivity Score */}
        {productivityScore !== null && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">
              💡 Productivity Score: {productivityScore}%
            </h2>
            <p className="text-sm text-gray-600">
              {productivityScore > 70
                ? "You're doing great! Keep up the good work! 🚀"
                : "Try focusing on high-priority tasks to improve your efficiency."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// 📌 Reusable Stat Card Component
const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg shadow bg-${color}-100`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
