varying vec2 vUv;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;

uniform float dispPower;
uniform float intensity;

void main() {
  vec2 uv = vUv;

  vec4 disp = texture2D(disp, uv);
  //vec2 dispVec = vec2(disp.x, disp.y); // 斜め方向の変化
  //vec2 dispVec = vec2(disp.r, 0.0); // 横方向の
  vec2 dispVec = vec2(0.0, disp.g); // 縦方向の変化

  vec2 distPos1 = uv + (dispVec * intensity * dispPower);
  vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));

  vec4 _texture1 = texture2D(texture1, distPos1);
  vec4 _texture2 = texture2D(texture2, distPos2);

  gl_FragColor = mix(_texture1, _texture2, dispPower);
}