import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Banner from "./Banner";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer/Footer";
import AboutIntro from "../about-us/AboutIntro";

export default function Content() {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".header-info",
      end: "bottom bottom",
      onUpdate: (self) => {
        const rotation = self.progress * 360;
        gsap.to(".revealer", { rotation });
      },
    });

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".header-info",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 - 0 * progress}%,
          ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`;
        gsap.to(".revealer-1, .revealer-2", {
          clipPath: clipPath,
          ease: "none",
          duration: 0,
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const left = 35 + 15 * progress;
        gsap.to(".revealer", {
          left: `${left}%`,
          ease: "none",
          duration: 0,
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".whitespace",
      start: "top 50%",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + 12 * self.progress;
        gsap.to(".revealer", {
          scale: scale,
          ease: "none",
          duration: 0,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(gsap.ticker.lagSmoothing);
    };
  }, []);

  return (
    <div className="content-container">
      <Section2 />
    </div>
  );
}

const Section2 = () => {
  return (
    <div className="section-container">
      <div className="section-container-inner">
        <h1 className="section-heading" data-aos="fade-up">
          Our Mission
        </h1>
        <p data-aos="fade-up" className="section-container-inner-text">bloom scroll</p>
      </div>

      <section className="header-info">
        <div>
          <p data-aos="fade-up" className="header-text">
            Our mission is to make technology a force for good by nurturing
            personal growth and strengthening our shared sense of community.
            Bloom is like a digital garden, where every interaction is a seed
            planted for something greater—whether that’s gratitude, creativity,
            or connection.
          </p>
        </div>

        <AboutIntro />
      </section>

      
    </div>
  );
};
