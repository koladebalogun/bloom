import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Ipad() {
    const model = useLoader(GLTFLoader, "models/ipad_pro.glb");

  return (
    <mesh position={[0, 0, 20]} scale={0.5}>
      <primitive object={model.scene} scale={1} />
    </mesh>
  )
}
