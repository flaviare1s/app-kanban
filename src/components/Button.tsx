interface ButtonProps {
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-8 right-8 bg-secondary hover:bg-primary text-white p-4 rounded-full shadow-lg cursor-pointer"
      onClick={onClick}
    >
      Nova Tarefa
    </button>
  );
};
