import React, { useEffect, useRef } from "react";
import Ipad from "../models/Ipad";
import { OrbitControls, useScroll } from "@react-three/drei";
import { val } from "@theatre/core";
import {
  PerspectiveCamera,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";
import { useAtom } from "jotai";
import { currentPageAtom, currentSceneAtom } from "../../utils/GlobalState";
import { useFrame } from "@react-three/fiber";

export default function BannerScene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);

  const sequenceLength = val(sheet.sequence.pointer.length);

  const currentPageRef = useRef(currentPage);
  const currentSceneRef = useRef(currentScene);

  // Update refs instead of causing re-renders
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
      {/* <OrbitControls /> */}
      <directionalLight intensity={20} position={[-20, -50, 60]} />
      <ambientLight intensity={5} />
      <e.group theatreKey="ipad">
        <Ipad />
      </e.group>

      <PerspectiveCamera
        theatreKey="camera"
        makeDefault
        position={[0, 0, 0]}
        near={0.1}
        far={100}
      />
    </>
  );
}
