import Button from "../utils/Button";

const AIsuggestion = ({
  showSuggestion,
  setShowSuggestion,
  loading,
  aiSuggestion,
  error,
}) => {
  if (!showSuggestion) return null;

  return (
    <div className="mt-3 p-3 border rounded bg-gray-100 text-gray-700 relative">
      <Button
        text="✖"
        onClick={() => setShowSuggestion(false)}
        className="absolute top-1 right-2 text-gray-600 hover:text-black text-sm cursor-pointer"
      />
      {loading
        ? "Generating suggestion..."
        : aiSuggestion || "No suggestion available"}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AIsuggestion;
