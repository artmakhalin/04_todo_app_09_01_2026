import { useEffect, useState } from "react";
import Task from "./Task";
import NewTask from "./NewTask";

const STORAGE_KEY = "todo_tasks_v1";
const normalizeTitle = (s) => s.trim().toLowerCase();

const seedTasks = [
  {
    id: crypto.randomUUID(),
    title: "Water plants",
    isCompleted: true,
    createdAt: new Date(),
    deadline: new Date(2026, 0, 20),
  },
  {
    id: crypto.randomUUID(),
    title: "Do homework",
    isCompleted: false,
    createdAt: new Date(),
    deadline: new Date(2026, 0, 30),
  },
  {
    id: crypto.randomUUID(),
    title: "Buy groceries",
    isCompleted: false,
    createdAt: new Date(),
    deadline: new Date(2026, 0, 20),
  },
];

const serializeTasks = (tasks) =>
  tasks.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    deadline: t.deadline.toISOString(),
  }));

const deserializeTasks = (tasks) =>
  tasks.map((t) => ({
    ...t,
    createdAt: new Date(t.createdAt),
    deadline: new Date(t.deadline),
  }));

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return seedTasks;
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return seedTasks;
      }

      return deserializeTasks(parsed);
    } catch {
      return seedTasks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeTasks(tasks)));
    } catch (err) {
      console.log(err);
    }
  }, [tasks]);

  const addTask = ({ title, deadline }) => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      alert("Task title should not be empty");
      return;
    }

    const currentDate = new Date();
    if (!(deadline instanceof Date) || Number.isNaN(deadline.getTime())) {
      alert("Invalid deadline");
      return;
    }

    if (deadline < currentDate) {
      alert("Deadline should be in future");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      isCompleted: false,
      createdAt: currentDate,
      deadline,
    };

    setTasks((prev) => {
      const exists = prev.some(
        (t) => normalizeTitle(t.title) === normalizeTitle(cleanTitle)
      );
      if (exists) {
        alert(`Task ${cleanTitle} already exists`);
        return prev;
      }
      return [...prev, newTask];
    });
  };

  const toggleTask = (id, isCompleted) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted } : t))
    );
  };

  const sortedTasks = [...tasks].sort((first, second) => {
    const byCompleted = Number(first.isCompleted) - Number(second.isCompleted);
    if (byCompleted !== 0) {
      return byCompleted;
    }
    return first.deadline - second.deadline;
  });

  return (
    <div>
      <h1>To Do List</h1>
      <NewTask addTask={addTask} />

      {sortedTasks.map((task) => (
        <Task key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </div>
  );
};

export default TaskList;
