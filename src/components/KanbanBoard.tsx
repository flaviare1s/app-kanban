import { useState, useEffect } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskForm } from "./TaskForm";
import { Button } from "./Button";

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
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
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

  return (
    <div className="font-nunito bg-primary p-4">
      <h2 className="text-2xl font-bold text-center text-white p-4">
        Quadro Kanban
      </h2>
      <div className="flex flex-col lg:flex-row h-screen">
        <KanbanColumn
          status="A Fazer"
          tasks={tasks.filter((task) => task.status === "A Fazer")}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <KanbanColumn
          status="Em Progresso"
          tasks={tasks.filter((task) => task.status === "Em Progresso")}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <KanbanColumn
          status="Concluído"
          tasks={tasks.filter((task) => task.status === "Concluído")}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <Button onClick={() => openTaskForm()} />{" "}
      {isTaskFormOpen && (
        <TaskForm
          onClose={closeTaskForm}
          saveTask={saveTask}
          task={taskToEdit}
        />
      )}
    </div>
  );
};
