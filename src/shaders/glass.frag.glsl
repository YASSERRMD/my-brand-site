uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uTintColor;
uniform float uTintStrength;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Subtle distortion for liquid glass feel
  float wave = sin(uv.x * 8.0 + uTime * 0.5) * 0.002
             + cos(uv.y * 6.0 + uTime * 0.3) * 0.002;
  uv += wave;

  // Refracted background sample
  vec4 bg = texture2D(uTexture, uv);

  // Glass surface gradient
  float fresnel = pow(1.0 - dot(vec3(0.0, 0.0, 1.0), vec3(vUv - 0.5, 1.0)), 2.0);
  vec3 tint = uTintColor * uTintStrength;

  // Edge highlight (gold rim)
  float rim = smoothstep(0.4, 0.5, length(vUv - 0.5));
  vec3 rimColor = vec3(0.788, 0.659, 0.298) * rim * 0.3; // gold

  vec3 finalColor = bg.rgb + tint + rimColor;
  float alpha = 0.06 + fresnel * 0.08;

  gl_FragColor = vec4(finalColor, alpha);
}
