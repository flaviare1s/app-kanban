import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Home } from "./pages/Home";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return showWelcome ? (
    <WelcomeScreen onFinish={() => setShowWelcome(false)} />
  ) : (
    <Home />
  );
}

export default App;
