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

    gsap.fromTo(
      background.current,
      { clipPath: "inset(20%)" },
      {
        clipPath: "inset(-30%)",
        ease: "none",
        scrollTrigger: {
          trigger: background.current,
          start: "top top",
          end: "+=500px",
          scrub: 1,
          markers: true,
        },
      }
    );

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
        <img src={"/images/img12.jpg"} alt="background image" />
      </div>
      <div className="banner_intro">
        <div
          ref={introImage}
          data-scroll
          data-scroll-speed="0.3"
          className="introImage"
        >
          <img src={"/images/img12.jpg"} alt="intro image" />
        </div>
        <h1 data-scroll data-scroll-speed="0.7" ref={text}>
          Bloom Scroll
        </h1>
      </div>
    </div>
  );
}
