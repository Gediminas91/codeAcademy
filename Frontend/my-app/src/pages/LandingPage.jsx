import { useState } from "react";
import Tasks from "../assets/Tasks.svg";
import HeroSection from "../components/HeroSection";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const LandingPage = () => {
  const [showForm, setShowForm] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-between px-16 py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-2xl text-left">
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
        {showForm === null && (
          <HeroSection
            setShowRegister={() => setShowForm("register")}
            setShowLogin={() => setShowForm("login")}
          />
        )}
      </div>

      <div className="hidden md:block w-2/5">
        <img src={Tasks} alt="Task Management" className="w-full" />
      </div>
    </div>
  );
};

export default LandingPage;
