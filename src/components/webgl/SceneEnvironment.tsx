"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { DynamicLighting } from "./DynamicLighting";
import { PostProcessing } from "./PostProcessing";
import { useMousePosition } from "@/hooks/useMousePosition";
import * as THREE from "three";

export function SceneEnvironment() {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Subtle camera drift on mouse
    cameraTarget.current.x += (mouse.normalizedX * 0.3 - cameraTarget.current.x) * 0.03;
    cameraTarget.current.y += (mouse.normalizedY * 0.2 - cameraTarget.current.y) * 0.03;
    camera.position.x += (cameraTarget.current.x - camera.position.x) * 0.05;
    camera.position.y += (cameraTarget.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <DynamicLighting />
      <ParticleField count={2500} spread={9} />
      <PostProcessing />
    </>
  );
}
