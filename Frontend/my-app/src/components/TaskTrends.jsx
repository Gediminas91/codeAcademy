import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TaskTrends = ({ trends }) => {
  return (
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
  );
};

export default TaskTrends;
