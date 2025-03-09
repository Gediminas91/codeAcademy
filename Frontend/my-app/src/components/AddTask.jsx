import { useState } from "react";

export default function AddTask({ closeModal, postTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "Pending",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTask(formData);
    setSuccessMessage("✔ Task successfully added!");
    setTimeout(() => {
      setSuccessMessage("");
      closeModal();
    }, 1500); // Auto-close modal after success message
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 p-6 z-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-96 border border-gray-300">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add New Task</h2>
        {successMessage && (
          <p className="text-green-600 font-semibold">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          {/* Priority Dropdown */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {/* Status Dropdown */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition-all cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-3 w-full text-gray-600 hover:text-black transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
