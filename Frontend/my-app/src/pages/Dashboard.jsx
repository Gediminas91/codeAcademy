import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Links from "../components/Links";
import Overview from "../components/Overview";
import RecentActivity from "../components/RecentActivity";
import { useDashboardData } from "../hooks/useDashboardData";

const Dashboard = () => {
  const { user, totalTasks, taskStats, recentTasks } = useDashboardData();

  // Pie chart data
  const pieData = [
    { name: "Completed", value: parseFloat(taskStats.completed) },
    { name: "In Progress", value: parseFloat(taskStats.inProgress) },
    { name: "Pending", value: parseFloat(taskStats.pending) },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <Welcome user={user} />
          <Links />
          <Overview totalTasks={totalTasks} pieData={pieData} />
          <RecentActivity recentTasks={recentTasks} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
