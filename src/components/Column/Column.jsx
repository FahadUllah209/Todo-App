import {
    SortableContext,
    verticalListSortingStrategy,
  } from "@dnd-kit/sortable";
  
  import { Task } from "../Task/Task";
  
  import "./Column.css";
  
  export const Column = ({ tasks, editTask, deleteTask }) => {
    return (
      <div className="column">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>
    );
  };
  