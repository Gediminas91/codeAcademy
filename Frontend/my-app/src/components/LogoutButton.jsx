import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white p-3 rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
