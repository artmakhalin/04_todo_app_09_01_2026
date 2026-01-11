import "./NewTask.css";
import { useState } from "react";

const toDateInputValue = (date) => {
  // local YYYY-MM-DD
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
};

const NewTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [deadlineStr, setDeadlineStr] = useState(toDateInputValue(new Date()));

  const onSubmit = () => {
    addTask({ title, deadline: new Date(deadlineStr) });
    setTitle("");
    setDeadlineStr(toDateInputValue(new Date()));
  };

  return (
    <div className="new-task">
      <input
        className="new-task-input"
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <div className="new-task-right">
        <label className="new-task-label" htmlFor="deadline">Deadline</label>
        <input
        className="new-task-input"
          type="date"
          value={deadlineStr}
          id="deadline"
          onChange={(e) => setDeadlineStr(e.target.value)}
        />
        <button className="new-task-btn" onClick={onSubmit}>New Task</button>
      </div>
    </div>
  );
};

export default NewTask;
