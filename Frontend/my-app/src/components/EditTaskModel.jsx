import Button from "../utils/Button";

const EditTaskModal = ({
  updatedData,
  handleChange,
  handleUpdate,
  setIsEditing,
}) => {
  return (
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
          <label className="text-sm font-semibold text-gray-600">Status:</label>
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
          <Button
            text="Save Changes"
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition-all cursor-pointer"
          />
          <Button
            text="Cancel"
            onClick={() => setIsEditing(false)}
            type="button"
            className="w-full text-gray-600 hover:text-black transition-all cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
