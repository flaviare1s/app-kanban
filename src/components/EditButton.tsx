import { FaEdit } from "react-icons/fa";

interface EditButtonProps {
  onClick: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="text-primary hover:text-secondary mr-2">
    <FaEdit size={20} />
  </button>
);
