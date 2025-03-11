import Button from "../utils/Button";

const TaskPrefillModal = ({ modalTask, setModalTask, saveTask }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-3">Edit Task</h2>
        <textarea
          value={modalTask}
          onChange={(e) => setModalTask(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            text="Save & Go to Tasks"
            onClick={saveTask}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          />
          <Button
            text="Cancel"
            onClick={() => setModalTask(null)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPrefillModal;
