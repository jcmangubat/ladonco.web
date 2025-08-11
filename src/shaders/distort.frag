#define S(a,b,n) smoothstep(a,b,n)

uniform float u_time;
uniform float u_volatility;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec2 u_directionMouse;
uniform vec2 u_textureFactor;
uniform vec2 u_texture2Factor;
uniform float u_alpha;
uniform sampler2D u_text0;
uniform sampler2D u_text1;

varying vec2 vUv;

vec2 centeredAspectRatio(vec2 uvs, vec2 factor){
  return uvs * factor - factor / 2. + 0.5;
}

vec4 applyRGBSplit(sampler2D tex, vec2 uv, vec2 factor, float volatility, float m_color, vec2 dir) {
  vec4 col;
  vec2 offset;

  offset = vec2(
    (sin(uv.y) * m_color * volatility / 100.) * dir.x,
    (sin(uv.x) * m_color * volatility / 100.) * dir.y
  );
  col.r = texture2D(tex, centeredAspectRatio(uv - offset, factor)).r;

  offset = vec2(
    (sin(uv.y) * m_color * volatility / 150.) * dir.x,
    (sin(uv.x) * m_color * volatility / 150.) * dir.y
  );
  col.g = texture2D(tex, centeredAspectRatio(uv - offset, factor)).g;

  offset = vec2(
    (sin(uv.y) * m_color * volatility / 300.) * dir.x,
    (sin(uv.x) * m_color * volatility / 300.) * dir.y
  );
  col.b = texture2D(tex, centeredAspectRatio(uv - offset, factor)).b;

  col.a = 1.0;
  return col;
}

void main(){
  vec2 uv = vUv;
  vec2 st = (gl_FragCoord.xy - .5 * u_res) / min(u_res.x, u_res.y) * vec2(.4, 1.);
  vec2 mouse_normalized = (u_mouse - .5 * u_res) / min(u_res.x, u_res.y) * vec2(.4, 1.);

  float dist = length(mouse_normalized - st);
  float m_color = S(.25, .001, dist * .6);
  float volatility = clamp(u_volatility * .1, -1.0, 1.0);

  vec4 tex0 = applyRGBSplit(u_text0, uv, u_textureFactor, volatility, m_color, u_directionMouse);
  vec4 tex1 = applyRGBSplit(u_text1, uv, u_texture2Factor, volatility, m_color, u_directionMouse);

  gl_FragColor = mix(tex1, tex0, u_alpha);
}