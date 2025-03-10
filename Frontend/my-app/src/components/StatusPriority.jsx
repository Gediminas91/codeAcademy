const StatusPriority = ({ task }) => {
  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
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
  );
};

export default StatusPriority;
