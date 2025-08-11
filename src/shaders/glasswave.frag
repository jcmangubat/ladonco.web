precision mediump float;

varying vec2 vUv;

uniform sampler2D currentImage;
uniform sampler2D nextImage;
uniform float dispFactor;

const float smoothness = 0.5;
const vec2 center = vec2(0.5, 0.5);
const vec2 direction = vec2(1.0, 0.0); // Made this a constant since it wasn't being used

vec4 getFromColor(vec2 uv) {
  return texture2D(currentImage, uv);
}

vec4 getToColor(vec2 uv) {
  return texture2D(nextImage, uv);
}

vec4 transition(vec2 uv) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(
    -smoothness,
    0.0,
    v.x * uv.x + v.y * uv.y - (d - 0.5 + dispFactor * (1.0 + smoothness))
  );
  return mix(
    getFromColor((uv - 0.5) * (1.0 - m) + 0.5),
    getToColor((uv - 0.5) * m + 0.5),
    m
  );
}

void main() {
  gl_FragColor = transition(vUv);
}