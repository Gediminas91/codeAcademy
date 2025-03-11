const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg shadow bg-${color}-100`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatCard;
