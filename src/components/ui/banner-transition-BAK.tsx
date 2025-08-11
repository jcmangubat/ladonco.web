// BannerTransition.tsx
import React, { useEffect, useRef, useState } from "react";
import transitions from "@/assets/gl-transitions.json";

import crosswarpFrag from "@/shaders/crosswarp.glsl?raw"; // The `?raw` tells Vite to import as text

type Props = {
  from: string;
  to: string;
  progress: number; // 0..1
  width?: number; // optional override
  height?: number;
};

const vertexSrc = `
  attribute vec2 a_position;
  attribute vec2 a_texcoord;
  varying vec2 v_texcoord;
  void main() {
    v_texcoord = a_texcoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile error: " + log);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsrc: string, fsrc: string) {
  const v = createShader(gl, gl.VERTEX_SHADER, vsrc);
  const f = createShader(gl, gl.FRAGMENT_SHADER, fsrc);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error("Program link error: " + log);
  }
  return prog;
}

function createTexture(gl: WebGLRenderingContext, img: HTMLImageElement) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // clamp to edge to avoid wrapping artifacts
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return tex;
}

export const BannerTransition: React.FC<Props> = ({ from, to, progress, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const texARef = useRef<WebGLTexture | null>(null);
  const texBRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef<number | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // get the frag shader for 'fade' fallback if not found
  const frag = transitions.find((t: any) => t.name === "fade")?.glsl || transitions[0]?.glsl || `
    precision mediump float;
    varying vec2 v_texcoord;
    uniform sampler2D fromTex;
    uniform sampler2D toTex;
    uniform float progress;
    void main() {
      vec4 a = texture2D(fromTex, v_texcoord);
      vec4 b = texture2D(toTex, v_texcoord);
      gl_FragColor = mix(a, b, progress);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = canvas.getContext("webgl");
    if (!gl) {
      // try webgl experimental
      gl = canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    }
    if (!gl) {
      setWebglSupported(false);
      return;
    }
    glRef.current = gl;

    // build program
    let program: WebGLProgram;
    try {
      program = createProgram(gl, vertexSrc, frag);
    } catch (err) {
      console.error("Shader compile/link failed:", err);
      setWebglSupported(false);
      return;
    }
    progRef.current = program;

    // fullscreen quad data
    const posLoc = gl.getAttribLocation(program, "a_position");
    const texLoc = gl.getAttribLocation(program, "a_texcoord");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // two triangles covering clipspace
    const positions = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
      -1,  1, 0, 1,
       1, -1, 1, 0,
       1,  1, 1, 1
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // enable attributes
    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 16, 8);

    // uniforms
    const uFrom = gl.getUniformLocation(program, "fromTex");
    const uTo = gl.getUniformLocation(program, "toTex");
    const uProg = gl.getUniformLocation(program, "progress");

    // set texture units
    gl.uniform1i(uFrom, 0);
    gl.uniform1i(uTo, 1);

    // handle canvas size
    function resize() {
      const w = width ?? canvas.clientWidth;
      const h = height ?? canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      const cw = Math.max(1, Math.floor(w * dpr));
      const ch = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    // load images to textures
    let imgA = new Image();
    let imgB = new Image();
    let destroyed = false;
    imgA.crossOrigin = "anonymous";
    imgB.crossOrigin = "anonymous";

    const loadAndCreate = (img: HTMLImageElement, url: string, assign: (tex: WebGLTexture) => void) =>
      new Promise<void>((resolve, reject) => {
        img.onload = () => {
          if (destroyed) return resolve();
          try {
            const tex = createTexture(gl!, img);
            assign(tex);
            resolve();
          } catch (e) {
            reject(e);
          }
        };
        img.onerror = (e) => reject(e);
        img.src = url;
      });

    Promise.all([
      loadAndCreate(imgA, from, (t) => (texARef.current = t)),
      loadAndCreate(imgB, to, (t) => (texBRef.current = t)),
    ]).then(() => {
      if (destroyed) return;
      // render loop
      const render = () => {
        if (!gl || !progRef.current) return;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(progRef.current);

        // bind textures
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texARef.current);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texBRef.current);

        // set progress uniform
        gl.uniform1f(uProg, progress);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // we don't continuously animate here unless progress changes;
        // but to ensure updates when progress prop changes we keep requestAnimationFrame
        rafRef.current = requestAnimationFrame(render);
      };

      render();
    }).catch((err) => {
      console.error("Failed to load images for BannerTransition:", err);
      setWebglSupported(false);
    });

    return () => {
      destroyed = true;
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        if (texARef.current) gl.deleteTexture(texARef.current);
        if (texBRef.current) gl.deleteTexture(texBRef.current);
        if (progRef.current) gl.deleteProgram(progRef.current);
      } catch (e) {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, frag, width, height]); // frag stable because transitions loaded at build time

  // re-render when progress changes (update uniform)
  useEffect(() => {
    const gl = glRef.current;
    const prog = progRef.current;
    if (!gl || !prog) return;
    const uProg = gl.getUniformLocation(prog, "progress");
    gl.useProgram(prog);
    gl.uniform1f(uProg, progress);
    // force one draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [progress]);

  // If no webgl -> fallback to CSS crossfade
  if (!webglSupported) {
    // simple fallback markup
    return (
      <div style={{ position: "relative", width: width ?? "100%", height: height ?? "100%", overflow: "hidden" }}>
        <img src={from} alt="from" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 1 - progress, transition: "opacity 150ms linear" }} />
        <img src={to} alt="to" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: progress, transition: "opacity 150ms linear" }} />
      </div>
    );
  }

  // WebGL canvas
  return <canvas ref={canvasRef} style={{ width: width ?? "100%", height: height ?? "100%", display: "block" }} />;
};

export default BannerTransition;
