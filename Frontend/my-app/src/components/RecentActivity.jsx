const RecentActivity = ({ recentTasks }) => {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      {recentTasks.length > 0 ? (
        <ul className="space-y-4">
          {recentTasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{task.title}</h4>
                <p className="text-sm text-gray-600">
                  Updated: {new Date(task.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : task.status === "In Progress"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          No recent tasks. Start adding tasks now!
        </p>
      )}
    </div>
  );
};

export default RecentActivity;
