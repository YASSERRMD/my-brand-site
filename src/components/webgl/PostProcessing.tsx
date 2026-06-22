"use client";

import { EffectComposer, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <ChromaticAberration
        offset={new Vector2(0.0005, 0.0005)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={1}
      />
      <Vignette
        offset={0.25}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
