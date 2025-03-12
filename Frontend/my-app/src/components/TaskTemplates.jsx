import Button from "../utils/Button";

const TaskTemplates = ({
  taskTemplates,
  fetchAISuggestions,
  handleUseTemplate,
  loading,
  error,
}) => {
  return (
    <div className="mb-6 border p-4 rounded-lg bg-gray-100">
      <h2 className="text-lg font-semibold">📝 Suggested Task Templates</h2>
      <Button
        text="Generate Task Templates"
        onClick={() => fetchAISuggestions("task-templates")}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 cursor-pointer"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {taskTemplates.length > 0 && (
        <ul className="mt-3 p-3 border rounded bg-white">
          {taskTemplates.map((template, index) => (
            <li
              key={index}
              className="mb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
            >
              <p className="text-sm md:text-base text-gray-800 break-words w-full">
                {template}
              </p>
              <Button
                text="Prefill & Edit"
                onClick={() => handleUseTemplate(template)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm rounded hover:bg-blue-600 cursor-pointer w-24 md:w-auto"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskTemplates;
