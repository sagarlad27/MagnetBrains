import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "./TaskDetails.css"; // Ensure you have the appropriate CSS file
import Header from "./Header";

function TaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the passed task data
  const task = location.state?.task;

  if (!task) {
    return <div>No data available</div>; // Fallback for missing data
  }

  return (
    <>
      <Header />
      <div className="task-details-container">
        <div className="task-details-card">
          <h2 className="task-details-title">Task Details</h2>
          <div className="task-details-row">
            <span className="task-details-label">Title:</span>
            <span className="task-details-value">{task.title}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-label">Description:</span>
            <span className="task-details-value">{task.description}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-label">Due Date:</span>
            <span className="task-details-value">{task.due_date}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-label">Status:</span>
            <span className="task-details-value">{task.status}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-label">Priority:</span>
            <span className="task-details-value">{task.priority}</span>
          </div>

          <div className="task-details-buttons">
            <Button color="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
