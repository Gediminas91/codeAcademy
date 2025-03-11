import Button from "../utils/Button";

const SaveSuggestions = ({ savedSuggestions, removeSuggestion }) => {
  return (
    savedSuggestions.length > 0 && (
      <div className="mt-6 border p-4 rounded-lg bg-gray-100">
        <h2 className="text-lg font-semibold">💾 Saved AI Insights</h2>
        <ul className="mt-3 p-3 border rounded bg-white space-y-2">
          {savedSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 flex flex-col md:flex-row justify-between items-center gap-2 border rounded-lg"
            >
              <span className="text-sm md:text-base">{suggestion}</span>
              <Button
                text="Remove"
                onClick={() => removeSuggestion(index)}
                className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded hover:bg-red-600 cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SaveSuggestions;
