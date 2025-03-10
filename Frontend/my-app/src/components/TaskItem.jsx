import { useState } from "react";
import { useAISuggestion } from "../hooks/useAISuggestion";
import StatusPriority from "./StatusPriority";
import AIsuggestion from "./AIsuggestion";
import Button from "../utils/Button";
import TaskDates from "./TaskDates";
import EditTaskModal from "./EditTaskModel";

const AI_API_URL = "http://localhost:3001/api/ai";

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { aiSuggestion, fetchAISuggestion, loading, error } =
    useAISuggestion(AI_API_URL);

  const [updatedData, setUpdatedData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(task._id, { ...updatedData, updatedAt: new Date() });
    setIsEditing(false);
  };

  const handleAISuggestion = () => {
    fetchAISuggestion(task.description);
    setShowSuggestion(true);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-300">
      <div className="flex-1">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <StatusPriority task={task} />
        <TaskDates
          date={task.date}
          updatedAt={task.updatedAt}
          completedAt={task.completedAt}
          status={task.status}
        />
        {/* AI Suggestion Box */}
        <AIsuggestion
          showSuggestion={showSuggestion}
          setShowSuggestion={setShowSuggestion}
          loading={loading}
          aiSuggestion={aiSuggestion}
          error={error}
        />
      </div>
      <div className="flex flex-col gap-2 ml-4">
        {[
          {
            text: "Edit",
            onClick: () => setIsEditing(true),
            className: "bg-blue-500 hover:bg-blue-600",
          },
          {
            text: "Delete",
            onClick: () => deleteTask(task._id),
            className: "bg-red-500 hover:bg-red-600",
          },
          {
            text: "AI Suggestion",
            onClick: handleAISuggestion,
            className: "bg-gray-400 hover:bg-gray-500",
          },
        ].map((btn, index) => (
          <Button
            key={index}
            text={btn.text}
            onClick={btn.onClick}
            className={`px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm text-white rounded-lg shadow cursor-pointer ${btn.className}`}
          />
        ))}
      </div>
      {/* Editing Modal */}
      {isEditing && (
        <EditTaskModal
          updatedData={updatedData}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}
