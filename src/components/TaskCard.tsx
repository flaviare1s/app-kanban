import { useDrag } from "react-dnd";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { useState, useRef } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "A Fazer" | "Em Progresso" | "Concluído";
}

const TaskCard: React.FC<{
  task: Task;
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}> = ({ task, onEditTask, onDeleteTask }) => {
  const dragRef = useRef(null);
  const [, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
  });

  drag(dragRef);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={dragRef}
      className="task-card mb-4 p-4 bg-gray-100 rounded-lg shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>

      <div
        className={`task-actions absolute top-2 right-2 transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <EditButton onClick={() => onEditTask(task.id)} />
        <DeleteButton onClick={() => onDeleteTask(task.id)} />
      </div>
    </div>
  );
};

export { TaskCard };
