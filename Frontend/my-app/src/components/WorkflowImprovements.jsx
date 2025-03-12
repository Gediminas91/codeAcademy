import Button from "../utils/Button";

const WorkflowImprovements = ({
  workflowInput,
  setWorkflowInput,
  workflowSuggestion,
  fetchAISuggestions,
  saveSuggestion,
  loading,
  error,
}) => {
  return (
    <div className="mb-6 border p-4 rounded-lg bg-gray-100">
      <h2 className="text-lg font-semibold">⚡ Improve My Workflow</h2>
      <input
        type="text"
        value={workflowInput}
        onChange={(e) => setWorkflowInput(e.target.value)}
        className="mt-2 w-full p-2 border rounded"
        placeholder="Describe your work habits..."
      />
      <Button
        text="Get Workflow Improvement Tips"
        onClick={() =>
          fetchAISuggestions("workflow-improvement", workflowInput)
        }
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 cursor-pointer"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {workflowSuggestion && (
        <div className="mt-3 p-3 border rounded bg-white flex flex-col md:flex-row md:justify-between items-center gap-2">
          <p className="text-sm md:text-base text-gray-800 break-words w-full">
            {workflowSuggestion}
          </p>
          <Button
            text="Save"
            onClick={() => saveSuggestion(workflowSuggestion)}
            className="bg-gray-400 text-white px-3 py-1 text-xs md:px-4 md:py-1 md:text-sm rounded hover:bg-gray-500 cursor-pointer w-20 md:w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default WorkflowImprovements;
