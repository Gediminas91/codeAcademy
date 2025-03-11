const ProductivityScore = ({ productivityScore }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">
        💡 Productivity Score: {productivityScore}%
      </h2>
      <p className="text-sm text-gray-600">
        {productivityScore > 70
          ? "You're doing great! Keep up the good work! 🚀"
          : "Try focusing on high-priority tasks to improve your efficiency."}
      </p>
    </div>
  );
};

export default ProductivityScore;
