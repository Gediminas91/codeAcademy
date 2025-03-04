import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../utils/Button";
import InputField from "../utils/InputField";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setShowRegister, setShowHome }) => {
  const { handleAuth, error, success } = useAuth();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800 max-w-md">
      <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
      <p className="mt-2 text-gray-600">
        Join us and start managing your tasks efficiently!
      </p>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500 text-center text-2xl">
          ✅ Registration Successful!
        </p>
      )}

      {!success && (
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await handleAuth("register", user);
            if (response?.token) {
              localStorage.setItem("token", response.token); // ✅ Save token after registration
              navigate("/dashboard"); // ✅ Redirect to dashboard
            }
          }}
        >
          <InputField
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <Button text="Register" />
        </form>
      )}

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => setShowRegister("login")}
          className="text-blue-600 hover:underline"
        >
          Login
        </button>
      </p>
      <button
        onClick={() => setShowHome(null)}
        className="mt-4 text-blue-600 hover:underline block text-center"
      >
        Back to Home
      </button>
    </div>
  );
};

export default RegisterForm;
