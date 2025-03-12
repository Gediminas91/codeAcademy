import { useState } from "react";
import useAuth from "../hooks/useAuth";
import InputField from "../utils/InputField";
import Button from "../utils/Button";

const LoginForm = ({ setShowLogin, setShowRegister }) => {
  const { handleAuth, error, success } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    handleAuth("login", credentials);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800 w-full max-w-lg py-20">
      {success ? (
        <p className="text-green-500 text-center text-2xl">
          ✅ Login Successful!
        </p>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-600">
            Welcome back! Please enter your details.
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={credentials.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              text="Sign In"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
            />
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Button
              text="Register"
              onClick={() => setShowRegister("register")}
              className="text-blue-600 hover:underline cursor-pointer"
            />
          </p>

          <Button
            text="Back to Home"
            onClick={() => setShowLogin(null)}
            className="mt-4 text-blue-600 hover:underline block text-center cursor-pointer"
          />
        </>
      )}
    </div>
  );
};

export default LoginForm;
