import React, { Suspense, useEffect, useRef } from "react";
import { Environment, OrbitControls, useScroll } from "@react-three/drei";
import { val } from "@theatre/core";
import {
  PerspectiveCamera,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";
import { useAtom } from "jotai";
import { currentPageAtom, currentSceneAtom } from "../../utils/GlobalState";
import { useFrame } from "@react-three/fiber";
import Fibonacci from "../models/Fibonacci";
import Lotus from "../models/Lotus";

export default function BannerScene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);

  const sequenceLength = val(sheet.sequence.pointer.length);

  const currentPageRef = useRef(currentPage);
  const currentSceneRef = useRef(currentScene);

  useEffect(() => {
    currentPageRef.current = currentPage;
    currentSceneRef.current = currentScene;
  }, [currentPage, currentScene]);

  const logCurrentPage = () => {
    const page = Math.floor(scroll.offset * scroll.pages) + 1;
    const positionWithinPage = (scroll.offset * scroll.pages) % 1;
    const scene = (page - 1) * 1 + Math.floor(positionWithinPage * 1) + 1;

    if (currentPageRef.current !== page) setCurrentPage(page);
    if (currentSceneRef.current !== scene) setCurrentScene(scene);
  };

  useFrame(() => {
    if (!scroll || !sheet) return;

    logCurrentPage();
    sheet.sequence.position = scroll.offset * sequenceLength;
  });
  return (
    <>
      <Suspense fallback={null}>
        {/* Lazy load the HDR environment map */}
        <Environment files={"/env/map.hdr"} />
      </Suspense>

      <directionalLight intensity={0.5} position={[5, 10, 7]} />
      <ambientLight intensity={1} />

      <e.group theatreKey="fibonacci">
        <Fibonacci />
      </e.group>

      <e.group theatreKey="lotus">
        <Lotus />
      </e.group>

      <PerspectiveCamera
        theatreKey="camera"
        makeDefault
        position={[2, 0, 0]}
        near={0.1}
        far={100}
      />
    </>
  );
}
