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

  // Drift motion: subtle organic movement
  float t = uTime * 0.25 + aOffset * 6.28318;
  pos.x += sin(t + aVelocity.x * 3.0) * 0.08;
  pos.y += cos(t * 0.7 + aVelocity.y * 2.0) * 0.06;
  pos.z += sin(t * 0.5 + aVelocity.z * 4.0) * 0.05;

  // Repel from mouse
  vec2 dir = pos.xy - uMouse * 4.0;
  float dist = length(dir);
  if (dist < 1.5) {
    pos.xy += normalize(dir) * (1.5 - dist) * 0.3;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * aScale * (250.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vDistance = -mvPosition.z;
  vAlpha = smoothstep(8.0, 2.0, vDistance) * aScale;
}
