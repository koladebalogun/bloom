import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../../utils/GlobalState";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function InfoThree() {
  const [currentScene] = useAtom(currentSceneAtom);

  useEffect(() => {
    if (currentScene === 4) {
      gsap.fromTo(
        ".containerOne",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          ease: "power1.inOut",
          duration: 1.2,
          delay:1
        }
      );

      CustomEase.create(
        "hop",
        "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
      );

      splitTextIntoSpans(".header h1");

      gsap.to(".hero", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 2,
        ease: "hop",
        onStart: () => {
          gsap.to(".hero", {
            transform: "scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 0.25,
          });

          gsap.to(".overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 2,
            ease: "hop",
            delay: 3,
          });

          gsap.to(".hero-img img", {
            transform: "scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 3.5,
          });

          gsap.to(".header h1 span", {
            y: 0,
            stagger: 0.1,
            ease: "power4.inOut",
            duration: 2,
            delay: 0.75,
            opacity: 1,
          });

          gsap.to(".content", {
            y: 0,
            stagger: 0.1,
            ease: "power4.inOut",
            duration: 2,
            delay: 4,
            opacity: 1,
          });
        },
      });
    }
  }, [currentScene]);

  function splitTextIntoSpans(selector) {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      let text = element.innerText;
      let splitText = text
        .split("")
        .map(function (char) {
          return `<span>${char === "" ? "&nbsp;&nbsp;" : char}</span>`;
        })
        .join("");

      element.innerHTML = splitText;
    });
  }

  return (
    <div>
      {currentScene === 4 && (
        <div className="containerOne">
          <div className="hero">
            <div className="overlay"></div>
            <div className="header">

              <p className="content">
                Hi there! I’m Kolade Balogun, a front-end developer from Lagos,
                Nigeria with over 4 years of experience building websites and
                applications that feel both intuitive and engaging. I love the
                process of taking ideas and turning them into interactive
                experiences that look and work great across devices.
              </p>
            </div>

            <div className="hero-img">
              <img src="/images/img11.jpg" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
