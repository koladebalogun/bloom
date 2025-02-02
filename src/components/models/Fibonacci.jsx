import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Fibonacci() {
  const model = useLoader(GLTFLoader, "models/scene.gltf");
  const modelRef = useRef(null);
  const { animations } = model;
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions) {
      const firstAnimation = actions[Object.keys(actions)[0]]; // Get the first animation
      if (firstAnimation) {
        // firstAnimation.setLoop(THREE.LoopOnce, 1); // Play only once
        // firstAnimation.clampWhenFinished = true; // Stop at the last frame
        firstAnimation.play();
      }
    }
  }, [actions]);

  return (
    <>
      <mesh position={[0, -3, 1]} scale={1.7} ref={modelRef}>
        <primitive object={model.scene} />
      </mesh>

      {/* <EffectComposer>
        <Bloom
          intensity={5} // Adjust bloom intensity
          kernelSize={5} // Adjust kernel size for blur
          luminanceThreshold={0.5} // Adjust luminance threshold
          luminanceSmoothing={1} // Adjust luminance smoothing
        />
      </EffectComposer> */}
    </>
  );
}
