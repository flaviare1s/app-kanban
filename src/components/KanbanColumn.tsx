import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
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
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => {
      onDropTask(item.id, status);
    },
  });

  drop(ref);

  return (
    <div
      ref={ref}
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

const TaskCard: React.FC<{
  task: Task;
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}> = ({ task, onEditTask, onDeleteTask }) => {
  const [, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
  });

  return (
    <div
      ref={drag}
      className="task-card mb-4 p-4 bg-gray-100 rounded-lg shadow-md relative group"
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>

      <div className="task-actions absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <EditButton onClick={() => onEditTask(task.id)} />
        <DeleteButton onClick={() => onDeleteTask(task.id)} />
      </div>
    </div>
  );
};
