export default function FilterSortControls({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value })); // ✅ Directly update global state
  };

  const selectClasses =
    "p-1 md:p-2 text-xs md:text-sm border rounded w-24 sm:w-auto";
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
      {/* Common class for uniform styling */}

      {/* Filter by Status */}
      <select
        name="status"
        value={filters.status} // ✅ Now correctly uses the global state
        onChange={handleChange}
        className={selectClasses}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Filter by Priority */}
      <select
        name="priority"
        value={filters.priority} // ✅ Now correctly uses the global state
        onChange={handleChange}
        className={selectClasses}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Sort By */}
      <select
        name="sortBy"
        value={filters.sortBy} // ✅ Now correctly uses the global state
        onChange={handleChange}
        className={selectClasses}
      >
        <option value="">Sort By</option>
        <option value="title">Title (A-Z)</option>
        <option value="priority">Priority (Low → High)</option>
        <option value="date">Date (Oldest → Newest)</option>
      </select>
    </div>
  );
}
