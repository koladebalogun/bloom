import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Experience from "./components/experience/Experience";
import Logo from "./components/nav/Logo";
import { currentSceneAtom } from "./utils/GlobalState";
import { useAtom } from "jotai";
import CustomCursor from "./utils/CustomCursor";
import ZoomParallax from "./components/zoomparallax/ZoomParallax";
import Footer from "./components/Footer/Footer";
import AboutIntro from "./components/about-us/AboutIntro";
import About from "./page/About";


const ExperienceWrapper = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Experience />
    </div>
  );
};

function App() {
  const [currentScene] = useAtom(currentSceneAtom);
  const experienceRef = useRef(null);

  useEffect(() => {
    const experienceElement = experienceRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("Intersection observed:", entry.isIntersecting);
        if (entry.isIntersecting && currentScene < 11) {
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
      {currentScene > 9 && <Logo />}
      {/* <CustomCursor /> */}
      {/* <div ref={experienceRef} style={{ height: "100vh" }}>
        <Experience />
      </div> */}

      {/* <ZoomParallax /> */}
      <Routes>
        <Route path="/" element={<ExperienceWrapper />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
