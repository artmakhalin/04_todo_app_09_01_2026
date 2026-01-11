const Task = ({ task, toggleTask }) => {
  const { id, title, isCompleted, createdAt, deadline } = task;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "15px",
        margin: "30px auto",
        padding: "30px",
        backgroundColor: isCompleted ? "#008000" : "#ffff00",
        boxShadow: "0 0 20px #ccc",
      }}
    >
      <h3>{title}</h3>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => toggleTask(id, e.target.checked)}
      />
      <p>Completed: {isCompleted.toString()}</p>
      <p>Created At: {createdAt.toDateString()}</p>
      <p>Deadline: {deadline.toDateString()}</p>
    </div>
  );
};

export default Task;
