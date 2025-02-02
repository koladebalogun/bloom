import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../../utils/GlobalState";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function BannerHeader() {
  const [currentScene] = useAtom(currentSceneAtom);

  useEffect(() => {
    if (currentScene) {
      CustomEase.create(
        "hop",
        "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
      );

      // Split text into spans for individual animations
      splitTextIntoSpans(".header h1");

      // Animate the hero element

      gsap.to(".header h1 span", {
        y: 0,
        stagger: 0.1,
        ease: "power4.inOut",
        duration: 2,
        delay: -0.5,
        opacity: 1,
      });
    } else {
      gsap.to(".header h1 span", {
        y: 100,
        stagger: 0.1,
        ease: "power4.inOut",
        duration: 2,
        delay: -0.5,
        opacity: 1,
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
    <>
      <div className="header">
        <h1>BLOOm-sCROLL</h1>
      </div>
    </>
  );
}
