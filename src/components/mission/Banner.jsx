"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Banner() {
  const background = useRef(null);
  const introImage = useRef(null);
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the background image
    gsap.fromTo(
      background.current,
      { clipPath: "inset(20%)" }, // Starting state
      {
        clipPath: "inset(-30%)", // Ending state
        ease: "none", // Linear easing
        scrollTrigger: {
          trigger: background.current,
          start: "top top", // Start when the top of the trigger hits the top of the viewport
          end: "+=500px", // End after scrolling 500px
          scrub: 1, // Smooth scrubbing (1 second delay for smoother transitions)
          markers: true, // Debugging markers (remove in production)
        },
      }
    );

    // Animation for the inner image
    gsap.fromTo(
      introImage.current,
      { scaleY: 1, y: -50 },
      {
        scaleX: 1,
        y: 10,
        ease: "none",
        scrollTrigger: {
          trigger: background.current,
          start: "top top",
          end: "+=500px",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      text.current,
      { y: -50 },
      {
        y: 300,
        ease: "none",
        scrollTrigger: {
          trigger: background.current,
          start: "top top",
          end: "+=500px",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div className="homeHeader">
      <div className="backgroundImage" ref={background}>
        <img src={"/images/img1.jpg"} alt="background image" />
      </div>
      <div className="banner_intro">
        <div
          ref={introImage}
          data-scroll
          data-scroll-speed="0.3"
          className="introImage"
        >
          <img src={"/images/img1.jpg"} alt="intro image" />
        </div>
        <h1 data-scroll data-scroll-speed="0.7" ref={text}>
          Our Catalyst
        </h1>
      </div>
    </div>
  );
}
