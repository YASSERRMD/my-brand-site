uniform vec3 uColorA;  // primary — gold
uniform vec3 uColorB;  // secondary — electric blue
uniform float uTime;

varying float vDistance;
varying float vAlpha;

void main() {
  // Soft circular point
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  // Smooth edge
  float alpha = 1.0 - smoothstep(0.2, 0.5, d);

  // Oscillate between gold and electric based on time + distance
  float blend = sin(uTime * 0.4 + vDistance * 0.15) * 0.5 + 0.5;
  vec3 color = mix(uColorA, uColorB, blend * 0.35);

  // Inner glow
  float glow = 1.0 - smoothstep(0.0, 0.25, d);
  color += uColorA * glow * 0.4;

  gl_FragColor = vec4(color, alpha * vAlpha * 0.65);
}
