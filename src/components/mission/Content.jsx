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
        <p data-aos="fade-up">bloom scroll</p>
      </div>

      <section className="header-info">
        <div>
          <p data-aos="fade-up">
            Our mission is to make technology a force for good by nurturing
            personal growth and strengthening our shared sense of community.
            Bloom is like a digital garden, where every interaction is a seed
            planted for something greater—whether that’s gratitude, creativity,
            or connection.
          </p>
        </div>

        <AboutIntro />
      </section>

      {/* <section className="whitespace"></section> */}

      {/* <section className="pinned">
        <div className="revealer">
          <div className="revealer-1"></div>
          <div className="revealer-2"></div>
        </div>
      </section> */}

      {/* <section className="website-content">
        <div>
          <h1 className="about" data-aos="fade-up">
            Every interaction with technology can help us bloom-
          </h1>

          <div className="about-wrapper">
            <h1 className="about-header" data-aos="fade-up">
              The culture of attention
            </h1>
            <p data-aos="fade-up">
              Our attention has been turned into a commodity, hijacked by
              systems designed to feed on fear, insecurities, and a need for
              validation. These platforms create a cycle of distraction and
              scarcity, leaving us disconnected from our natural flow.
              <br />
              <br />
              Bloom is our attempt to build a rhizomatic space—a platform where
              inspiring ideas, actions, and connections can spread naturally, in
              alignment with the people and communities who use it. Rhizomes are
              horizontal, interconnected, and resilient—the opposite of a
              hierarchical tree, and allowing for organic, collective growth.
            </p>
          </div>

          <div className="about-wrapper">
            <h1 className="about-header" data-aos="fade-up">
              Scrolling, But Different
            </h1>
            <p data-aos="fade-up">
              Bloom is designed to reflect and amplify our interconnectedness,
              serving as a digital ecosystem that nurtures alignment and
              collective growth. Through Bloomscrolling, every interaction
              becomes part of a larger, living network, helping humanity grow
              stronger, more resilient, and more attuned to its highest
              potential.
              <br />
              <br />
              Bloom is not a grid of ads and algorithms but a living, breathing
              network that uplifts everyone it touches. We want the Bloomscroll
              to be a tool for resonance—a way to align with higher states like
              gratitude, creativity, and compassion. Imagine scrolling not to
              escape, but to expand.
            </p>
          </div>

          <div className="about-wrapper">
            <h1 className="about-header" data-aos="fade-up">
              A New Kind of Technology
            </h1>
            <p data-aos="fade-up">
              Bloom is an experiment in what sacred technology could look like.
              It’s rooted in the belief that technology, when designed with
              love, can serve as an extension of the exocortex—a tool for
              externalizing and amplifying our best thoughts, ideas, and
              actions. But it’s also an experiment and a direct challenge to the
              culture of mindless engagement, that asks: what happens when we
              build for resonance instead of clicks? For impact instead of
              endless interaction?
            </p>
          </div>
        </div>
        <div className="indicator-wrapper2">
          <div className="indicator2"></div>
        </div>
      </section> */}
      {/* <Banner /> */}
      {/* <Footer /> */}
    </div>
  );
};
