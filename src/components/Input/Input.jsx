import { useState } from "react";
import "./Input.css";

export const Input = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit} className="button">
        Add
      </button>
    </div>
  );
};
