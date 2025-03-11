import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button
      text="Logout"
      onClick={handleLogout}
      className="bg-red-500 text-white p-3 rounded-md"
    />
  );
};

export default LogoutButton;
