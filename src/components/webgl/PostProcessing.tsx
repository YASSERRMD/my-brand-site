"use client";

import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.0008, 0.0008)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={1}
      />
      <Vignette
        offset={0.3}
        darkness={0.75}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
