"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

export function DynamicLighting() {
  const goldLightRef = useRef<THREE.PointLight>(null);
  const blueLightRef = useRef<THREE.PointLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Gold light follows mouse with lag
    if (goldLightRef.current) {
      goldLightRef.current.position.x += (mouse.normalizedX * 4 - goldLightRef.current.position.x) * 0.04;
      goldLightRef.current.position.y += (mouse.normalizedY * 3 - goldLightRef.current.position.y) * 0.04;
      goldLightRef.current.intensity = 1.5 + Math.sin(t * 0.8) * 0.3;
    }

    // Blue ambient light pulses on orbit
    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(t * 0.3) * 6;
      blueLightRef.current.position.y = Math.cos(t * 0.2) * 4;
      blueLightRef.current.position.z = Math.sin(t * 0.4) * 3;
      blueLightRef.current.intensity = 0.6 + Math.cos(t * 0.5) * 0.2;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.05} color="#050510" />
      <pointLight
        ref={goldLightRef}
        position={[0, 0, 3]}
        intensity={1.5}
        color="#C9A84C"
        distance={12}
        decay={2}
      />
      <pointLight
        ref={blueLightRef}
        position={[6, 4, -2]}
        intensity={0.6}
        color="#00BFFF"
        distance={15}
        decay={2}
      />
      <pointLight
        position={[-8, -4, -4]}
        intensity={0.3}
        color="#0A0A1A"
        distance={20}
        decay={2}
      />
    </>
  );
}
