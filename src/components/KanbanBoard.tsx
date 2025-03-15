import { useState, useEffect } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskForm } from "./TaskForm";
import { Button } from "./Button";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "A Fazer" | "Em Progresso" | "Concluído";
}

export const KanbanBoard: React.FC = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openTaskForm = (task?: Task) => {
    setTaskToEdit(task || null);
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
    setTaskToEdit(null);
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks);

      const validatedTasks = parsedTasks.filter((task) =>
        ["A Fazer", "Em Progresso", "Concluído"].includes(task.status)
      );

      setTasks(validatedTasks);
    }
  }, []);

  const saveTask = (title: string, description: string) => {
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, title, description } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask: Task = {
        id: new Date().getTime(),
        title,
        description,
        status: "A Fazer",
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) openTaskForm(taskToEdit);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    console.log(`Tarefa com id ${id} excluída`);
  };

  const handleDropTask = (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus as "A Fazer" | "Em Progresso" | "Concluído",
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="font-nunito bg-primary p-4">
        <h2 className="text-2xl font-bold text-center text-white p-4">
          Quadro Kanban
        </h2>
        <div className="flex flex-col lg:flex-row h-screen">
          {["A Fazer", "Em Progresso", "Concluído"].map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onDropTask={handleDropTask}
            />
          ))}
        </div>
        <Button onClick={() => openTaskForm()} />
        {isTaskFormOpen && (
          <TaskForm
            onClose={closeTaskForm}
            saveTask={saveTask}
            task={taskToEdit}
          />
        )}
      </div>
    </DndProvider>
  );
};
