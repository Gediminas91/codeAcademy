import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TaskManager from "../assets/TaskManager.png";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <img src={TaskManager} alt="Logo" className="h-10 w-10" />
      </div>

      <div className="hidden md:flex space-x-6">
        {[
          { path: "/dashboard", label: "Dashboard" },
          { path: "/tasks", label: "Tasks" },
          { path: "/ai-suggestions", label: "AI Suggestions" },
          { path: "/reports", label: "Reports" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative text-gray-700 hover:text-blue-600 pb-2 ${
              location.pathname === link.path
                ? "text-blue-600 font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-blue-600"
                : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        className="md:hidden text-gray-700 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/tasks", label: "Tasks" },
            { path: "/ai-suggestions", label: "AI Suggestions" },
            { path: "/reports", label: "Reports" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-gray-700 hover:text-blue-600 ${
                location.pathname === link.path
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="hidden md:flex bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
