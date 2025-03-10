import { FaChartLine, FaRobot, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      <Link
        to="/tasks"
        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition"
      >
        <FaTasks className="text-5xl text-blue-500 mb-3" />
        <h3 className="text-xl font-semibold text-gray-800">Your Tasks</h3>
        <p className="text-gray-600">View and manage your tasks efficiently.</p>
      </Link>

      <Link
        to="/ai-suggestions"
        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition"
      >
        <FaRobot className="text-5xl text-purple-500 mb-3" />
        <h3 className="text-xl font-semibold text-gray-800">AI Suggestions</h3>
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
        <p className="text-gray-600">Track your productivity with insights.</p>
      </Link>
    </div>
  );
};

export default Links;
