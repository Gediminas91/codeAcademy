import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TaskAnalysis from "../components/TaskAnalysis";
import TaskTemplates from "../components/TaskTemplates";
import WorkflowImprovements from "../components/WorkflowImprovements";
import SaveSuggestions from "../components/SaveSuggestions";
import TaskPrefillModal from "../components/TaskPrefillModal";

const AI_API_URL = "http://localhost:3001/api/ai";

export default function AISuggestions() {
  const [taskAnalysis, setTaskAnalysis] = useState(null);
  const [taskTemplates, setTaskTemplates] = useState([]);
  const [workflowSuggestion, setWorkflowSuggestion] = useState(null);
  const [workflowInput, setWorkflowInput] = useState("");
  const [savedSuggestions, setSavedSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalTask, setModalTask] = useState(null);
  const navigate = useNavigate();

  const fetchAISuggestions = async (type, inputData = null) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const options = {
        method: "POST",
        headers,
        body: inputData ? JSON.stringify({ input: inputData }) : null,
      };

      const response = await fetch(`${AI_API_URL}/${type}`, options);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || `Failed to fetch ${type}`);

      switch (type) {
        case "task-analysis":
          setTaskAnalysis(data.analysis);
          break;
        case "task-templates":
          setTaskTemplates(data.templates);
          break;
        case "workflow-improvement":
          setWorkflowSuggestion(data.suggestion);
          break;
        default:
          throw new Error("Invalid request type");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const saveSuggestion = (suggestion) => {
    if (!savedSuggestions.includes(suggestion)) {
      setSavedSuggestions([...savedSuggestions, suggestion]);
    }
    setTaskAnalysis(null);
  };

  const removeSuggestion = (index) => {
    setSavedSuggestions(savedSuggestions.filter((_, i) => i !== index));
  };

  const handleUseTemplate = (template) => {
    setModalTask(template);
  };

  const saveTask = () => {
    localStorage.setItem("prefilledTask", JSON.stringify(modalTask));
    navigate("/tasks");
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">AI Suggestions</h1>

        <TaskAnalysis
          taskAnalysis={taskAnalysis}
          fetchAISuggestions={fetchAISuggestions}
          saveSuggestion={saveSuggestion}
          loading={loading}
          error={error}
        />

        <TaskTemplates
          taskTemplates={taskTemplates}
          fetchAISuggestions={fetchAISuggestions}
          handleUseTemplate={handleUseTemplate}
          loading={loading}
          error={error}
        />

        <WorkflowImprovements
          workflowInput={workflowInput}
          setWorkflowInput={setWorkflowInput}
          workflowSuggestion={workflowSuggestion}
          fetchAISuggestions={fetchAISuggestions}
          saveSuggestion={saveSuggestion}
          loading={loading}
          error={error}
        />

        <SaveSuggestions
          savedSuggestions={savedSuggestions}
          removeSuggestion={removeSuggestion}
        />

        {modalTask && (
          <TaskPrefillModal
            modalTask={modalTask}
            setModalTask={setModalTask}
            saveTask={saveTask}
          />
        )}
      </div>
    </>
  );
}
