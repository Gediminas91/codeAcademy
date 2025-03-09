import { useState } from "react";
import { useAISuggestion } from "../hooks/useAISuggestion";

const AI_API_URL = "http://localhost:3001/api/ai";

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { aiSuggestion, fetchAISuggestion, loading, error } =
    useAISuggestion(AI_API_URL);

  const [updatedData, setUpdatedData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(task._id, { ...updatedData, updatedAt: new Date() });
    setIsEditing(false);
  };

  const handleAISuggestion = () => {
    fetchAISuggestion(task.description);
    setShowSuggestion(true);
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-300">
      {/* Left Side: Task Details */}
      <div className="flex-1">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-2">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              Priority:
            </span>
            <span
              className={`px-2 py-1 text-xs md:text-sm font-semibold rounded-lg ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              Status:
            </span>
            <span
              className={`px-2 py-1 text-xs md:text-sm font-semibold rounded-lg ${
                task.status === "Completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>
        {/* Dates */}
        <p className="text-gray-500 text-xs md:text-sm mt-2">
          Created At: {new Date(task.date).toLocaleDateString()}
        </p>
        {task.updatedAt && (
          <p className="text-gray-500 text-xs md:text-sm">
            Updated At: {new Date(task.updatedAt).toLocaleDateString()}
          </p>
        )}
        {task.status === "Completed" && task.completedAt && (
          <p className="text-gray-500 text-xs md:text-sm">
            Completed At: {new Date(task.completedAt).toLocaleDateString()}
          </p>
        )}

        {/* AI Suggestion Box */}
        {showSuggestion && (
          <div className="mt-3 p-3 border rounded bg-gray-100 text-gray-700 relative">
            <button
              onClick={() => setShowSuggestion(false)}
              className="absolute top-1 right-2 text-gray-600 hover:text-black text-sm cursor-pointer"
            >
              ✖
            </button>
            {loading
              ? "Generating suggestion..."
              : aiSuggestion || "No suggestion available"}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}
      </div>

      {/* Right Side: Actions */}
      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm bg-red-500 text-white rounded-lg shadow hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={handleAISuggestion}
          className="px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 cursor-pointer"
        >
          AI Suggestion
        </button>
      </div>

      {/* Editing Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 p-6 z-50">
          <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-96 border border-gray-300">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Edit Task</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                value={updatedData.title}
                onChange={handleChange}
                placeholder="Task Title"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="description"
                value={updatedData.description}
                onChange={handleChange}
                placeholder="Task Description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <label className="text-sm font-semibold text-gray-600">
                Priority:
              </label>
              <select
                name="priority"
                value={updatedData.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <label className="text-sm font-semibold text-gray-600">
                Status:
              </label>
              <select
                name="status"
                value={updatedData.status}
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
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                type="button"
                className="w-full text-gray-600 hover:text-black transition-all cursor-pointer"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
