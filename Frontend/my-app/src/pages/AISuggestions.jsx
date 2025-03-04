import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AI_API_URL = "http://localhost:3000/api/ai";

export default function AISuggestions() {
  const [taskAnalysis, setTaskAnalysis] = useState(null);
  const [taskTemplates, setTaskTemplates] = useState([]);
  const [workflowSuggestion, setWorkflowSuggestion] = useState(null);
  const [workflowInput, setWorkflowInput] = useState(""); // ✅ Now being used
  const [savedSuggestions, setSavedSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalTask, setModalTask] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch AI Task Analysis
  const fetchTaskAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${AI_API_URL}/task-analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to get task analysis");

      setTaskAnalysis(data.analysis);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // ✅ Fetch AI-generated Task Templates
  const fetchTaskTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${AI_API_URL}/task-templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to get task templates");

      setTaskTemplates(data.templates);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // ✅ Fetch Workflow Improvement Suggestion
  const fetchWorkflowSuggestion = async () => {
    if (!workflowInput.trim()) return; // Avoid empty input requests

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${AI_API_URL}/workflow-improvement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ input: workflowInput }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to get workflow suggestion");

      setWorkflowSuggestion(data.suggestion);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // ✅ Save AI suggestion
  const saveSuggestion = (suggestion) => {
    if (!savedSuggestions.includes(suggestion)) {
      setSavedSuggestions([...savedSuggestions, suggestion]);
    }
    setTaskAnalysis(null); // Reset after saving so user can analyze again
  };

  // ✅ Remove AI suggestion
  const removeSuggestion = (index) => {
    setSavedSuggestions(savedSuggestions.filter((_, i) => i !== index));
  };

  // ✅ Use a task template
  const handleUseTemplate = (template) => {
    setModalTask(template); // Prefill task creation modal
  };

  // ✅ Save & Navigate to Tasks Page with Prefilled Template
  const saveTask = () => {
    localStorage.setItem("prefilledTask", JSON.stringify(modalTask));
    navigate("/tasks");
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">AI Suggestions</h1>

        {/* Task Analysis */}
        <div className="mb-6 border p-4 rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">📊 Task Analysis</h2>
          <button
            onClick={fetchTaskAnalysis}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Analyze My Tasks
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {taskAnalysis && (
            <div className="mt-3 p-3 border rounded bg-white flex justify-between">
              <p>{taskAnalysis}</p>
              <button
                onClick={() => saveSuggestion(taskAnalysis)}
                className="ml-2 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Task Templates */}
        <div className="mb-6 border p-4 rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">📝 Suggested Task Templates</h2>
          <button
            onClick={fetchTaskTemplates}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            Generate Task Templates
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {taskTemplates.length > 0 && (
            <ul className="mt-3 p-3 border rounded bg-white">
              {taskTemplates.map((template, index) => (
                <li key={index} className="mb-2 flex justify-between">
                  {template}
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Prefill & Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Workflow Improvement */}
        <div className="mb-6 border p-4 rounded-lg bg-gray-100">
          <h2 className="text-lg font-semibold">⚡ Improve My Workflow</h2>
          <input
            type="text"
            value={workflowInput}
            onChange={(e) => setWorkflowInput(e.target.value)}
            className="mt-2 w-full p-2 border rounded"
            placeholder="Describe your work habits..."
          />
          <button
            onClick={fetchWorkflowSuggestion}
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600"
          >
            Get Workflow Improvement Tips
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {workflowSuggestion && (
            <div className="mt-3 p-3 border rounded bg-white flex justify-between">
              <p>{workflowSuggestion}</p>
              <button
                onClick={() => saveSuggestion(workflowSuggestion)}
                className="ml-2 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Saved AI Insights */}
        {savedSuggestions.length > 0 && (
          <div className="mt-6 border p-4 rounded-lg bg-gray-100">
            <h2 className="text-lg font-semibold">💾 Saved AI Insights</h2>
            <ul className="mt-3 p-3 border rounded bg-white">
              {savedSuggestions.map((suggestion, index) => (
                <li key={index} className="mb-2 flex justify-between">
                  <span>{suggestion}</span>
                  <button
                    onClick={() => removeSuggestion(index)}
                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Task Prefill Modal (Fixed & Used `saveTask`) */}
        {modalTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-3">Edit Task</h2>
              <textarea
                value={modalTask}
                onChange={(e) => setModalTask(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={saveTask}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save & Go to Tasks
                </button>
                <button
                  onClick={() => setModalTask(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
