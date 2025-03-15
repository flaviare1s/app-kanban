import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

interface TaskProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: "A Fazer" | "Em Progresso" | "Concluído";
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card mb-4 p-4 bg-gray-100 rounded-lg shadow-md relative group">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-actions absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onDelete} />
      </div>
    </div>
  );
};
