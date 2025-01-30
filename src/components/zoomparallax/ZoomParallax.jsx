import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Mission from "../mission/Mission";
import AboutIntro from "../about-us/AboutIntro"

export default function ZoomParallax() {
  const [isInView, setIsInView] = useState(false);
  const boxRef = useRef(null);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: "/images/img12.jpg",
      scale: scale4,
    },
    {
      src: "/images/img2.jpg",
      scale: scale5,
    },
    {
      src: "/images/img9.jpg",
      scale: scale6,
    },
    {
      src: "/images/img4.jpg",
      scale: scale5,
    },
    {
      src: "/images/img11.jpg",
      scale: scale6,
    },
    {
      src: "/images/img10.jpg",
      scale: scale8,
    },
    {
      src: "/images/img13.jpg",
      scale: scale9,
    },
  ];

  return (
    <>
      <div ref={container} className="mission_container">
        <div className="sticky">
          {pictures.map(({ src, scale }, index) => {
            return (
              <motion.div key={index} style={{ scale }} className="el">
                <div className="mission_image_container">
                  <img src={src} fill alt="image" placeholder="blur" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Mission />

    </>
  );
}
