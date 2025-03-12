import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TaskTimeline = ({ timeline }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold">📈 Completion Timeline</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={timeline}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip
            formatter={(value) => new Date(value).toLocaleDateString()}
          />
          <Line type="monotone" dataKey="completedAt" stroke="#3498db" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskTimeline;
