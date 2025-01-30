import React from "react";
import AboutBanner from "../components/about-us/AboutBanner";
import Projects from "../components/projects/Projects";
import Footer from "../components/Footer/Footer"

export default function About() {
  return (
    <div className="about-page">
      <AboutBanner />
      <div className="projects-container">
        <Projects />
      </div>
      <Footer />
    </div>
  );
}
