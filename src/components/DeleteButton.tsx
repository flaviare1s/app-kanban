import { FaTrashAlt } from "react-icons/fa";

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="text-red-700 hover:text-red-900">
    <FaTrashAlt size={20} />
  </button>
);
