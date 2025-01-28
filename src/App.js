import React, { useEffect, useRef } from "react";
import "./App.css";
import Experience from "./components/experience/Experience";
import Logo from "./components/nav/Logo";
import { currentSceneAtom } from "./utils/GlobalState";
import { useAtom } from "jotai";
import CustomCursor from "./utils/CustomCursor";
import ZoomParallax from "./components/zoomparallax/ZoomParallax";

function App() {
  const [currentScene] = useAtom(currentSceneAtom);
  const experienceRef = useRef(null);

  useEffect(() => {
    const experienceElement = experienceRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("Intersection observed:", entry.isIntersecting);
        if (entry.isIntersecting && currentScene < 5) {
          document.body.classList.add("no-scroll");
          console.log("Scroll locked");
        } else {
          document.body.classList.remove("no-scroll");
          console.log("Scroll unlocked");
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (experienceElement) {
      observer.observe(experienceElement);
    }

    return () => {
      if (experienceElement) {
        observer.unobserve(experienceElement);
      }
      document.body.classList.remove("no-scroll");
    };
  }, [currentScene]);

  return (
    <div className="App">
      {currentScene > 1 && <Logo />}
      <CustomCursor />
      <div ref={experienceRef} style={{ height: "100vh" }}>
        <Experience />
      </div>
      <ZoomParallax />
    </div>
  );
}

export default App;