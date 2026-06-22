"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

const VERT = `
uniform float uTime;
uniform float uSize;
uniform vec2 uMouse;
attribute float aScale;
attribute vec3 aVelocity;
attribute float aOffset;
varying float vDistance;
varying float vAlpha;
void main() {
  vec3 pos = position;
  float t = uTime * 0.25 + aOffset * 6.28318;
  pos.x += sin(t + aVelocity.x * 3.0) * 0.08;
  pos.y += cos(t * 0.7 + aVelocity.y * 2.0) * 0.06;
  pos.z += sin(t * 0.5 + aVelocity.z * 4.0) * 0.05;
  vec2 dir = pos.xy - uMouse * 4.0;
  float dist = length(dir);
  if (dist < 1.5) { pos.xy += normalize(dir) * (1.5 - dist) * 0.3; }
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * aScale * (250.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  vDistance = -mvPosition.z;
  vAlpha = smoothstep(8.0, 2.0, vDistance) * aScale;
}
`;

const FRAG = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
varying float vDistance;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.2, 0.5, d);
  float blend = sin(uTime * 0.4 + vDistance * 0.15) * 0.5 + 0.5;
  vec3 color = mix(uColorA, uColorB, blend * 0.35);
  float glow = 1.0 - smoothstep(0.0, 0.25, d);
  color += uColorA * glow * 0.4;
  gl_FragColor = vec4(color, alpha * vAlpha * 0.65);
}
`;

interface ParticleFieldProps {
  count?: number;
  spread?: number;
}

export function ParticleField({ count = 2000, spread = 8 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useMousePosition();

  const { positions, scales, velocities, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = spread * Math.cbrt(Math.random());

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      scales[i] = 0.2 + Math.random() * 0.8;
      velocities[i3] = (Math.random() - 0.5) * 2;
      velocities[i3 + 1] = (Math.random() - 0.5) * 2;
      velocities[i3 + 2] = (Math.random() - 0.5) * 2;
      offsets[i] = Math.random();
    }

    return { positions, scales, velocities, offsets };
  }, [count, spread]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 2.5 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#C9A84C") },
      uColorB: { value: new THREE.Color("#00BFFF") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aVelocity"
          args={[velocities, 3]}
          count={count}
          array={velocities}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          args={[offsets, 1]}
          count={count}
          array={offsets}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
