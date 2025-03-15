import { useState } from "react";

interface TaskFormProps {
  onClose: () => void;
  saveTask: (title: string, description: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onClose, saveTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [titleLength, setTitleLength] = useState(0);

  const handleSave = () => {
    if (title.trim() === "") {
      setError("O título é obrigatório.");
      return;
    }

    saveTask(title, description);
    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setTitle(value);
      setTitleLength(value.length);
      setError("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Nova Tarefa</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Título"
          className="w-full p-2 mb-4 border rounded"
          maxLength={100}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {titleLength === 100 && (
          <p className="text-gray-500 text-sm">
            Título máximo de 100 caracteres atingido.
          </p>
        )}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição (opcional)"
          className="w-full p-2 mb-4 border rounded h-24"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-secondary hover:bg-primary text-white p-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
