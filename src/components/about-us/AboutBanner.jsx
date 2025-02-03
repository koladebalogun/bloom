import React, { useEffect, useState, useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const imageDetails = {
  width: 524,
  height: 640,
};

const firstName = {
  initial: { y: 0 },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  initial: { y: 0 },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: { y: 400 },
  animate: { y: 0, transition: { duration: 1, ...transition } },
};

export default function AboutBanner() {
  const [windowWidth, setWindowWidth] = useState(null);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [isInView, setIsInView] = useState(false);
  const boxRef = useRef(null);

  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the box is in view
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [canScroll]);

  useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="maincon">
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className="single"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container fluid">
          <div className="row center top-row">
            <div className="top">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="details"
              ></motion.div>

              <motion.div className="model">
                <motion.span className="first" variants={firstName}>
                  <motion.span variants={letter}>B</motion.span>
                  <motion.span variants={letter}>L</motion.span>
                  <motion.span variants={letter}>O</motion.span>
                  <motion.span variants={letter}>O</motion.span>
                  <motion.span variants={letter}>M</motion.span>
                </motion.span>
                <motion.span className="last" variants={lastName}>
                  <motion.span variants={letter}>S</motion.span>
                  <motion.span variants={letter}>C</motion.span>
                  <motion.span variants={letter}>R</motion.span>
                  <motion.span variants={letter}>O</motion.span>
                  <motion.span variants={letter}>L</motion.span>
                  <motion.span variants={letter}>L</motion.span>
                </motion.span>
              </motion.div>
            </div>
          </div>
          <div className="row bottom-row">
            <div className="bottom">
              <motion.div className="image-container-single">
                <motion.div
                  initial={{
                    y: "-50%",
                    width: imageDetails.width,
                    height: imageDetails.height,
                  }}
                  animate={{
                    y: -100,
                    width: "100%",
                    height: windowWidth && windowWidth > 1440 ? 900 : 600,
                    transition: { delay: 0.2, ...transition },
                  }}
                  className="thumbnail-single"
                >
                  <motion.div
                    className="frame-single"
                    whileHover="hover"
                    transition={transition}
                  >
                    <motion.img
                      src="/images/img8.jpg"
                      alt="an image"
                      style={{ scale: scale }}
                      initial={{ scale: 1.0 }}
                      animate={{
                        scale: 1.1, // Slightly scale up the image
                        transition: { delay: 0.2, ...transition },
                      }}
                      whileHover={{
                        scale: 1.2, // Scale up more on hover
                        transition: { duration: 0.3 },
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          ref={boxRef}
          className={`detailed-information ${isInView ? "in-view" : ""}`}
        >
          <div className="container">
            <div className="detailed-information-text" data-aos="fade-up">
              <p>
                Bloom is a new kind of digital platform designed to help people
                feel more connected, inspired, and aligned in their daily lives.
                Instead of the typical social media experience that often leaves
                people feeling drained or distracted, Bloom focuses on creating
                moments of growth and positivity. Imagine scrolling through your
                phone and, instead of seeing random or stressful content, you're
                engaging with ideas, stories, and tools that uplift you and
                encourage you to take meaningful actions—both online and in the
                real world.
                <br />
                <br />
                Our mission is to make technology a force for good by nurturing
                personal growth and strengthening our shared sense of community.
                Bloom is like a digital garden, where every interaction is a
                seed planted for something greater—whether that’s gratitude,
                creativity, or connection. We’re reimagining how technology can
                serve humanity, helping people not just stay connected, but
                truly thrive.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
