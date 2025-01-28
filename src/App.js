import React from "react";
import "./App.css";
import Experience from "./components/experience/Experience";
import Logo from "./components/nav/Logo";
import { currentSceneAtom } from "./utils/GlobalState";
import { useAtom } from "jotai";
import CustomCursor from "./utils/CustomCursor"

function App() {
  const [currentScene] = useAtom(currentSceneAtom);
  return (
    <div className="App">
      {currentScene > 1 && <Logo />}
      <CustomCursor />
      <Experience />
    </div>
  );
}

export default App;
