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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleAuth("register", user);
    if (response?.token) {
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800 w-full max-w-lg py-20">
      {success ? (
        <p className="text-green-500 text-center text-2xl">
          ✅ Registration Successful!
        </p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join us and start managing your tasks efficiently!
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
            <Button
              text="Register"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
            />
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Button
              text="Login"
              onClick={() => setShowRegister("login")}
              className="text-blue-600 hover:underline cursor-pointer"
            />
          </p>

          <Button
            text="Back to Home"
            onClick={() => setShowHome(null)}
            className="mt-4 text-blue-600 hover:underline block text-center cursor-pointer"
          />
        </>
      )}
    </div>
  );
};

export default RegisterForm;
