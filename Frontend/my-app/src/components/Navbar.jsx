import { Link, useNavigate } from "react-router-dom";
import TaskManager from "../assets/TaskManager.png";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Left Side: Logo & Dashboard Link */}
      <div className="flex items-center space-x-6">
        {/* Logo (not clickable) */}
        <img src={TaskManager} alt="Logo" className="h-10 w-10" />
      </div>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/tasks" className="text-gray-700 hover:text-blue-600">
          Tasks
        </Link>
        <Link
          to="/ai-suggestions"
          className="text-gray-700 hover:text-blue-600"
        >
          AI Suggestions
        </Link>
        <Link to="/reports" className="text-gray-700 hover:text-blue-600">
          Reports
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
