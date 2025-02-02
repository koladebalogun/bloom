import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { SRGBColorSpace, ACESFilmicToneMapping } from "three";
import BannerScene from "../scene/BannerScene";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../utils/GlobalState";
import { getProject } from "@theatre/core";
import { SheetProvider, editable as e } from "@theatre/r3f";
import { Center, ScrollControls, Text } from "@react-three/drei";
import checkroll from "../../utils/checkroll.json";
import Headers from "../banner-info/headers/Headers";
import SceneInfo from "../banner-info/contents/SceneInfo";
import ZoomParallax from "../zoomparallax/ZoomParallax";
import intro2 from "../../utils/intro2.json";
import BannerHeader from "../banner-info/headers/BannerHeader";
import gsap from "gsap";

export default function Experience() {
  const [currentScene] = useAtom(currentSceneAtom);
  const sheet = getProject("Fly Through", { state: intro2 }).sheet("Scene");
  const textRef = useRef()

  console.log(currentScene);

  useEffect(() => {
    gsap.to(textRef.current, {
      y:-50,
      ease: 'bounce'
    })
  },[])

  return (
    <>
      <div className="canvas">
        <Canvas
          shadows
          gl={{
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: SRGBColorSpace,
          }}
          style={{
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "black",
          }}
        >
          <ScrollControls pages={10} maxSpeed={0.1}>
            <SheetProvider sheet={sheet}>
              <BannerScene />

              {currentScene > 1 && (
                <>
                  <e.group theatreKey="text" ref={textRef}>
                    <Center>
                      <Text
                        position={[17, 4, -40]}
                        color="white"
                        fontSize={28}
                        font="fonts/Blanquotey.ttf"
                      >
                        BLOOm sCROLL
                      </Text>
                    </Center>
                  </e.group>
                </>
              )}
            </SheetProvider>
          </ScrollControls>
        </Canvas>

        {/* <Headers /> */}
        {/* <SceneInfo /> */}
        {/* {currentScene === 5 && <BannerHeader />} */}

        <div className="indicator-wrapper">
          <p>Scroll Down</p>
          <div className="indicator"></div>
        </div>
      </div>

      {/* <ZoomParallax /> */}
    </>
  );
}
