import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import Todo from "../assets/Todo.svg";

const Overview = ({ totalTasks, pieData }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#F44336"];

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
  );
};

export default Overview;
