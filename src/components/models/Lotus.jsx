import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { currentSceneAtom } from "../../utils/GlobalState";
import { useAtom } from "jotai";

export default function Lotus() {
  const model = useLoader(GLTFLoader, "models/lotus.glb");
  const modelRef = useRef(null);
  const { animations } = model;
  const { actions } = useAnimations(animations, modelRef);
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);

  console.log(currentScene);

  useEffect(() => {
    if (actions) {
      const firstAnimation = actions[Object.keys(actions)[0]]; // Get the first animation
      if (currentScene === 10) {
        firstAnimation.setLoop(THREE.LoopOnce, 1); // Play only once
        firstAnimation.clampWhenFinished = true; // Stop at the last frame
        firstAnimation.play();
      }
    }
  }, [actions, currentScene]);

  return (
    <>
      <mesh position={[0, -3, 1]} scale={1.7} ref={modelRef}>
        <primitive object={model.scene} />
      </mesh>

      {/* <EffectComposer>
        <Bloom
          intensity={0.5} // Adjust bloom intensity
          kernelSize={1} // Adjust kernel size for blur
          luminanceThreshold={0.1} // Adjust luminance threshold
          luminanceSmoothing={0.1} // Adjust luminance smoothing
        />
      </EffectComposer> */}
    </>
  );
}
