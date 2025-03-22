import { useState, useEffect, useCallback, useMemo } from "react";
import {
  DndContext,
  closestCorners
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  const addTask = useCallback((title) => {
    setTasks((prevTasks) => [...prevTasks, { id: crypto.randomUUID(), title }]);
  }, []);

  const editTask = useCallback((id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((prevTasks) => {
      const originalPos = prevTasks.findIndex((task) => task.id === active.id);
      const newPos = prevTasks.findIndex((task) => task.id === over.id);
      return arrayMove(prevTasks, originalPos, newPos);
    });
  }, []);

 
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <div className="App">
      <h1>My Tasks ✅</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <Input onSubmit={addTask} />

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column tasks={filteredTasks} editTask={editTask} deleteTask={deleteTask} />
      </DndContext>
    </div>
  );
}
