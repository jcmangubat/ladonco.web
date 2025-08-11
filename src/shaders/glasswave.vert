attribute vec2 a_position;
attribute vec2 a_texcoord;
varying vec2 vUv;
void main() {
  vUv = a_texcoord;
  gl_Position = vec4(a_position, 0.0, 1.0);
}