import Tasks from "../assets/Tasks.svg";

const HeroSection = ({ setShowRegister, setShowLogin }) => {
  return (
    <>
      {/* Heading - Always Visible */}
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white text-center md:text-left">
        Task Management & To-Do List App
      </h1>

      {/* Image - Visible Only on Mobile */}
      <div className="mt-6 flex justify-center md:hidden">
        <img src={Tasks} alt="Task Management" className="w-4/5 lg:w-2/5" />
      </div>

      {/* Hide Description & Features on Mobile, Show on Desktop */}
      <p className="hidden md:block mt-4 md:mt-6 text-lg md:text-base lg:text-xl text-white max-w-xl">
        Task Management & To-Do List application is designed to help you better
        manage your task workflow efficiently. This application is specially for
        Developers & Designers and other productive people.
      </p>

      <ul className="hidden md:block mt-4 md:mt-6 text-base lg:text-lg space-y-3">
        <li className="flex items-center gap-2">
          <span className="text-pink-300 text-xl">✔</span> Organized Layers
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-300 text-xl">✔</span> Stylish & Modern
          Design
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-300 text-xl">✔</span> Fully Customizable
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-300 text-xl">✔</span> With Design System
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-300 text-xl">✔</span> AI Features
        </li>
      </ul>

      {/* Buttons - Always Visible, Centered on Mobile */}
      <div className="mt-6 flex flex-col space-y-4 items-center md:items-start">
        <button
          onClick={() => setShowLogin("login")}
          className="px-8 py-4 w-full max-w-xs bg-white text-gray-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-300 transition cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => setShowRegister("register")}
          className="px-8 py-4 w-full max-w-xs bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition cursor-pointer"
        >
          Register Now
        </button>
      </div>
    </>
  );
};

export default HeroSection;
