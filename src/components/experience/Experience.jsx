import { Canvas } from "@react-three/fiber";
import React from "react";
import { SRGBColorSpace, ACESFilmicToneMapping } from "three";
import BannerScene from "../scene/BannerScene";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../utils/GlobalState";
import { getProject } from "@theatre/core";
import { SheetProvider, editable as e } from "@theatre/r3f";
import { Center, ScrollControls, Text } from "@react-three/drei";
import ipad from "../../utils/ipad.json";
import BannerHeader from "../banner-info/headers/BannerHeader";
import BannerHeader2 from "../banner-info/headers/BannerHeader2";
import InfoOne from "../banner-info/contents/InfoOne";
import InfoTwo from "../banner-info/contents/InfoTwo";
import InfoThree from "../banner-info/contents/InfoThree";
import BannerHeader3 from "../banner-info/headers/BannerHeader3";
import Headers from "../banner-info/headers/Headers";
import SceneInfo from "../banner-info/contents/SceneInfo";

export default function Experience() {
  const [currentScene] = useAtom(currentSceneAtom);
  const sheet = getProject("Fly Through", { state: ipad }).sheet("Scene");

  console.log(currentScene);
  return (
    <div>
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
        }}
      >
        <ScrollControls pages={4} maxSpeed={0.1}>
          <SheetProvider sheet={sheet}>
            <BannerScene />

            {currentScene && (
              <e.group theatreKey="text">
                <Center>
                  <Text
                    position={[17, 4, -30]}
                    color="white"
                    fontSize={28}
                    font="fonts/Blanquotey.ttf"
                  >
                    BLOOM SCROLL
                  </Text>
                </Center>
              </e.group>
            )}
          </SheetProvider>
        </ScrollControls>
      </Canvas>

      <Headers />
      <SceneInfo />

      <div className="indicator-wrapper">
        <p>Scroll Down</p>
        <div className="indicator"></div>
      </div>
    </div>
  );
}
