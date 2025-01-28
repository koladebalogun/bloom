import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Banner from "./Banner";

export default function Content() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Pin the .pinned section
    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Pin the .header-info section
    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Rotate the .revealer element
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

    // Animate the clip-path of .revealer-1 and .revealer-2
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

    // Move the .revealer element horizontally
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

    // Scale the .revealer element
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
        <h1 className="section-heading">Our Mission</h1>
        <p>bloom scroll</p>
      </div>

      <section className="header-info">
        <p>
          Welcome to Duke n Earls, where fashion meets class. We are the epitome
          of African fashion, blending tradition and innovation seamlessly. We
          strive to be the go-to brand for those who appreciate the richness of
          African culture and the allure of high-class fashion.
        </p>
      </section>

      <section className="whitespace"></section>

      <section className="pinned">
        <div className="revealer">
          <div className="revealer-1"></div>
          <div className="revealer-2"></div>
        </div>
      </section>

      <section className="website-content">
        <div>
          <h1 className="about">About us</h1>
          <p>
            At Duke n Earl, we're passionate about creating a fashion experience
            that goes beyond just clothing. From the moment you explore our
            collections to the moment you wear our designs, we want you to feel
            confident, valued, and proud of your choice. Every piece we offer is
            thoughtfully crafted with quality and style in mind, so you can
            express yourself with ease. Our team is always here to help, whether
            you need advice on styling or have questions about your order. We’re
            dedicated to making your journey with us memorable, because at Duke
            n Earl, it’s not just about fashion it’s about how you feel wearing
            it.
          </p>
        </div>
      </section>
      <Banner />
    </div>
  );
};