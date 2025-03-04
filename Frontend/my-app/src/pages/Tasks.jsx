import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import { useUpdate } from "../hooks/useUpdate";
import { useDelete } from "../hooks/useDelete";
import TaskItem from "../components/TaskItem";
import AddTask from "../components/AddTask";

const TASKS_API_URL = "http://localhost:3000/api/tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sortBy: "",
  });

  // Hooks for API calls
  const { loading, error } = useFetch(TASKS_API_URL, setTasks);
  const { postTask } = usePost(TASKS_API_URL, setTasks);
  const { updateTask } = useUpdate(TASKS_API_URL, setTasks);
  const { deleteTask } = useDelete(TASKS_API_URL, setTasks);

  // ✅ Function to handle filtering and sorting
  const filteredTasks = tasks
    .filter((task) => (filters.status ? task.status === filters.status : true))
    .filter((task) =>
      filters.priority ? task.priority === filters.priority : true
    )
    .sort((a, b) => {
      if (filters.sortBy === "title") return a.title.localeCompare(b.title);
      if (filters.sortBy === "priority") {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (filters.sortBy === "dueDate")
        return new Date(a.dueDate) - new Date(b.dueDate);
      return 0;
    });

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          + New Task
        </button>
      </div>

      {/* ✅ Dropdown Filters */}
      <div className="flex gap-4 mb-4">
        <select
          name="status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="title">Title (A-Z)</option>
          <option value="priority">Priority (Low → High)</option>
          <option value="dueDate">Due Date (Oldest → Newest)</option>
        </select>
      </div>

      {/* Error & Loading */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Task List (Filtered & Sorted) */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTask closeModal={() => setIsModalOpen(false)} postTask={postTask} />
      )}
    </div>
  );
}
