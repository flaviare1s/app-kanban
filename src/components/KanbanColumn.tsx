import { useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";
import { useRef } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "A Fazer" | "Em Progresso" | "Concluído";
}

interface KanbanColumnProps {
  status: string;
  tasks: Task[];
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onDropTask: (taskId: number, newStatus: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onDropTask,
}) => {
  const dropRef = useRef(null);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => {
      onDropTask(item.id, status);
    },
  });

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className="flex-1 bg-white p-4 m-2 rounded-lg shadow lg:h-5/6"
    >
      <h2 className="text-xl font-bold mb-3">{status}</h2>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
