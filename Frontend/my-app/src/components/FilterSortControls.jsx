export default function FilterSortControls({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const selectClasses =
    "p-1 md:p-2 text-xs md:text-sm border rounded w-24 sm:w-auto";
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className={selectClasses}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className={selectClasses}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        name="sortBy"
        value={filters.sortBy}
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
