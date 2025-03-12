import Button from "../utils/Button";

const TaskAnalysis = ({
  taskAnalysis,
  fetchAISuggestions,
  saveSuggestion,
  loading,
  error,
}) => {
  return (
    <div className="mb-6 border p-4 rounded-lg bg-gray-100">
      <h2 className="text-lg font-semibold">📊 Task Analysis</h2>
      <Button
        text=" Analyze My Tasks"
        onClick={() => fetchAISuggestions("task-analysis")}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 cursor-pointer"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {taskAnalysis && (
        <div className="mt-3 p-3 border rounded bg-white flex flex-col md:flex-row md:justify-between items-center gap-2">
          <p className="text-sm md:text-base text-gray-800 break-words w-full">
            {taskAnalysis}
          </p>
          <Button
            text="Save"
            onClick={() => saveSuggestion(taskAnalysis)}
            className="bg-gray-400 text-white px-3 py-1 text-xs md:px-4 md:py-1 md:text-sm rounded hover:bg-gray-500 cursor-pointer w-20 md:w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default TaskAnalysis;
