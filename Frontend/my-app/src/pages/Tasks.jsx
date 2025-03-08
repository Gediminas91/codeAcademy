import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import { useUpdate } from "../hooks/useUpdate";
import { useDelete } from "../hooks/useDelete";
import TaskItem from "../components/TaskItem";
import AddTask from "../components/AddTask";
import Navbar from "../components/Navbar";
import FilterSortControls from "../components/FilterSortControls";

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
      if (filters.sortBy === "date") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 cursor-pointer"
          >
            + New Task
          </button>
        </div>

        {/* ✅ Dropdown Filters */}
        <FilterSortControls filters={filters} setFilters={setFilters} />

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
          <AddTask
            closeModal={() => setIsModalOpen(false)}
            postTask={postTask}
          />
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          className="sm:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-600 cursor-pointer"
        >
          +
        </button>
      </div>
    </>
  );
}
