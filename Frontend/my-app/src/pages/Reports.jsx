import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskSummary from "../components/TaskSummary";
import TaskTrends from "../components/TaskTrends";
import TaskTimeline from "../components/TaskTimeline";
import ProductivityScore from "../components/ProductivityScore";

const API_URL = "http://localhost:3001/api/reports";

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

        {summary && <TaskSummary summary={summary} />}
        {trends && <TaskTrends trends={trends} />}
        {timeline && <TaskTimeline timeline={timeline} />}
        {productivityScore !== null && (
          <ProductivityScore productivityScore={productivityScore} />
        )}
      </div>
    </>
  );
}
