import React, { useEffect, useState, useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

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

  const [canScroll, setCanScroll] = useState(true);

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
                  <motion.span variants={letter}>A</motion.span>
                  <motion.span variants={letter}>R</motion.span>
                  <motion.span variants={letter}>O</motion.span>
                  <motion.span variants={letter}>N</motion.span>
                </motion.span>
                <motion.span className="last" variants={lastName}>
                  <motion.span variants={letter}>E</motion.span>
                  <motion.span variants={letter}>V</motion.span>
                  <motion.span variants={letter}>E</motion.span>
                  <motion.span variants={letter}>N</motion.span>
                  <motion.span variants={letter}>T</motion.span>
                  <motion.span variants={letter}>S</motion.span>
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
                    y: 50,
                    width: "100%",
                    height: windowWidth && windowWidth > 1440 ? 800 : 400,
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
        <div className="detailed-information">
          <div className="container">
            <div className="text">
              {/* <p>
                Baron Inc Entertainment is dynamic music company established in
                2019 that specializes in the discovery, development, and
                promotion of Afrobeats & Francophone artists. We are also
                actively involved in the production and promotion of musical
                concerts across the UK, hosting notable Afrobeats stars. Baron
                Inc Entertainment prides itself on identifying promising talent
                and nurturing them through every step of their artistic journey.
                The company’s touring and A&R experts actively scout emerging
                and established musicians, providing them with creative
                direction and industry insights to help refine their sound and
                stand out in a crowded market, also providing them with the
                structure to tour across UK & Europe.
                <br />
                <br />
                At Baron-inc Events, we’re driven by a passion for delivering
                unparalleled experiences in entertainment. From curating
                unforgettable events to nurturing top-tier talents, we’re here to
                bring your visions to life and help you achieve your goals.
                Every project we undertake is thoughtfully crafted with
                precision and creativity, ensuring that you feel empowered,
                celebrated, and at the center of the action. Our team is
                dedicated to providing exceptional support, whether you’re an
                entertainer, or enthusiast. At Baron-inc, it’s about creating a
                legacy worth remembering.
              </p> */}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
