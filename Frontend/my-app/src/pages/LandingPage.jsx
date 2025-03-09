import { useState } from "react";
import HeroSection from "../components/HeroSection";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Tasks from "../assets/Tasks.svg";

const LandingPage = () => {
  const [showForm, setShowForm] = useState(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Left Side: Hero Section */}
      <div className="max-w-2xl text-center md:text-left">
        {showForm === null && (
          <HeroSection
            setShowRegister={() => setShowForm("register")}
            setShowLogin={() => setShowForm("login")}
          />
        )}

        {/* Show Forms if Selected */}
        {showForm === "register" && (
          <RegisterForm
            setShowRegister={() => setShowForm("login")}
            setShowHome={() => setShowForm(null)}
          />
        )}
        {showForm === "login" && (
          <LoginForm
            setShowLogin={setShowForm}
            setShowRegister={() => setShowForm("register")}
          />
        )}
      </div>

      {/* Right Side: Image for Desktop, Scales for iPads */}
      <div className="hidden md:flex w-2/5 md:w-3/5 lg:w-4/5 justify-end">
        <img src={Tasks} alt="Task Management" className="w-full" />
      </div>
    </div>
  );
};

export default LandingPage;
