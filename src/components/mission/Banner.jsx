"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Banner() {
  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for the background image
    gsap.fromTo(
      background.current,
      { clipPath: "inset(20%)" }, // Starting state
      {
        clipPath: "inset(0%)", // Ending state
        ease: "none", // Linear easing
        scrollTrigger: {
          trigger: background.current,
          start: "top top", // Start when the top of the trigger hits the top of the viewport
          end: "+=500px", // End after scrolling 500px
          scrub: true, // Smoothly scrub through the animation
          markers: true, // Debugging markers (remove in production)
        },
      }
    );

    // Animation for the inner image
    gsap.fromTo(
      introImage.current,
      { scaleY: 1 }, // Starting state
      {
        scaleY: 1.5, // Ending state
        ease: "none", // Linear easing
        scrollTrigger: {
          trigger: background.current,
          start: "top top", // Start when the top of the trigger hits the top of the viewport
          end: "+=500px", // End after scrolling 500px
          scrub: true, // Smoothly scrub through the animation
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
        <h1 data-scroll data-scroll-speed="0.7">
          Our Catalyst
        </h1>
      </div>
    </div>
  );
}