import { useState } from "react";

export default function FilterSortControls({ setFilters }) {
  const [filters, setLocalFilters] = useState({
    status: "",
    priority: "",
    sortBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex gap-4 mb-4">
      {/* Filter by Status */}
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Filter by Priority */}
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Sort By */}
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">Sort By</option>
        <option value="title">Title (A-Z)</option>
        <option value="priority">Priority (Low → High)</option>
        <option value="dueDate">Due Date (Oldest → Newest)</option>
      </select>
    </div>
  );
}
