import StatCard from "../utils/StatCard";

const TaskSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
      <StatCard title="Total Tasks" value={summary.totalTasks} color="blue" />
      <StatCard
        title="Completed Tasks"
        value={summary.completedTasks}
        color="green"
      />
      <StatCard
        title="Pending Tasks"
        value={summary.pendingTasks}
        color="red"
      />
    </div>
  );
};

export default TaskSummary;
