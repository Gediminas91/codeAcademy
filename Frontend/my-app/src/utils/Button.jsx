const Button = ({ text }) => {
  return (
    <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
      {text}
    </button>
  );
};

export default Button;
