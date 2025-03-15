import { useEffect, useState } from "react";

interface WelcomeScreenProps {
  onFinish: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }: { onFinish: () => void }) => {
  const [message, setMessage] = useState("Bem-vindo!");

  useEffect(() => {
    const messages = [
      "Carregando quadro Kanban...",
      "Preparando tarefas...",
      "Pronto!",
    ];
    let index = 0;

    const interval = setInterval(() => {
      setMessage(messages[index]);
      index++;

      if (index === messages.length) {
        clearInterval(interval);
        setTimeout(onFinish, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-primary text-white text-2xl font-bold">
      {message}
    </div>
  );
};
