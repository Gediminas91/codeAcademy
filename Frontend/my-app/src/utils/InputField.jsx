const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default InputField;
