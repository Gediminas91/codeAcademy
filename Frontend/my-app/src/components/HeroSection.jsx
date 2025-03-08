const HeroSection = ({ setShowRegister, setShowLogin }) => {
  return (
    <>
      <h1 className="text-6xl font-bold text-white leading-tight">
        Task Management & To-Do List App
      </h1>
      <p className="mt-6 text-xl text-white max-w-xl">
        Task Management & To-Do List application is designed to help you better
        manage your task workflow efficiently. This application is specially for
        Developers & Designers and other productive people. By using this
        application, they can create task groups like office projects, personal
        projects, study tasks, etc., and handle tasks very easily.
      </p>

      <ul className="mt-6 text-lg space-y-3">
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
      <div className="mt-10 space-x-4">
        <button
          onClick={() => setShowRegister("register")}
          className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition cursor-pointer"
        >
          Register Now
        </button>
        <button
          onClick={() => setShowLogin("login")}
          className="px-8 py-4 bg-white text-gray-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-300 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default HeroSection;
