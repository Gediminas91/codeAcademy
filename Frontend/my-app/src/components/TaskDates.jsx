const TaskDates = ({ date, updatedAt, completedAt, status }) => {
  return (
    <div className="text-gray-500 text-xs md:text-sm mt-2">
      <p>Created At: {new Date(date).toLocaleDateString()}</p>
      {updatedAt && (
        <p>Updated At: {new Date(updatedAt).toLocaleDateString()}</p>
      )}
      {status === "Completed" && completedAt && (
        <p>Completed At: {new Date(completedAt).toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default TaskDates;
