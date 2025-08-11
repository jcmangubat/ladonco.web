import React, { useEffect, useRef, useState } from "react";
import shaderFrag from "@/shaders/fluid.glsl?raw";

type Props = {
  from: string;
  to: string;
  progress: number; // 0..1
  width?: number;
  height?: number;
};

const vertexSrc = `
  attribute vec2 a_position;
  attribute vec2 a_texcoord;
  varying vec2 vUv;
  void main() {
    vUv = a_texcoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error("Shader compile error: " + gl.getShaderInfoLog(shader));
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
    throw new Error("Program link error: " + gl.getProgramInfoLog(prog));
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
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return tex;
}

export const BannerTransition: React.FC<Props> = ({
  from,
  to,
  progress,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const texARef = useRef<WebGLTexture | null>(null);
  const texBRef = useRef<WebGLTexture | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext);

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    glRef.current = gl;

    let program: WebGLProgram;
    try {
      program = createProgram(gl, vertexSrc, shaderFrag);
    } catch (err) {
      console.error(err);
      setWebglSupported(false);
      return;
    }
    progRef.current = program;
    gl.useProgram(program);

    // Look up attributes
    const posLoc = gl.getAttribLocation(program, "a_position");
    const texLoc = gl.getAttribLocation(program, "a_texcoord");

    // Create quad with interleaved position + texcoord
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        // x, y, u, v
        -1, -1, 0, 0,
        1, -1, 1, 0,
        -1, 1, 0, 1,
        -1, 1, 0, 1,
        1, -1, 1, 0,
        1, 1, 1, 1,
      ]),
      gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 16, 8);

    // Look up uniforms (match GLSL names)
    const uFrom = gl.getUniformLocation(program, "currentImage");
    const uTo = gl.getUniformLocation(program, "nextImage");
    const uDisp = gl.getUniformLocation(program, "dispFactor");
    const uDir = gl.getUniformLocation(program, "direction");

    gl.uniform1i(uFrom, 0);
    gl.uniform1i(uTo, 1);
    gl.uniform2f(uDir, 1.0, 0.0); // horizontal transition by default

    // Resize handler
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

    // Load images
    let destroyed = false;
    const imgA = new Image();
    const imgB = new Image();

    Promise.all([
      new Promise<void>((resolve, reject) => {
        imgA.onload = () => resolve();
        imgA.onerror = reject;
        imgA.src = from;
      }),
      new Promise<void>((resolve, reject) => {
        imgB.onload = () => resolve();
        imgB.onerror = reject;
        imgB.src = to;
      }),
    ])
      .then(() => {
        if (destroyed) return;
        texARef.current = createTexture(gl, imgA);
        texBRef.current = createTexture(gl, imgB);
        setImagesLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setWebglSupported(false);
      });

    return () => {
      destroyed = true;
      window.removeEventListener("resize", resize);
      if (texARef.current) gl.deleteTexture(texARef.current);
      if (texBRef.current) gl.deleteTexture(texBRef.current);
      if (progRef.current) gl.deleteProgram(progRef.current);
    };
  }, [from, to, width, height]);

  // Draw when progress changes
  useEffect(() => {
    if (!imagesLoaded || !glRef.current || !progRef.current) return;
    const gl = glRef.current;
    const program = progRef.current;

    const uDisp = gl.getUniformLocation(program, "dispFactor");
    gl.useProgram(program);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texARef.current);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texBRef.current);

    gl.uniform1f(uDisp, progress);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [progress, imagesLoaded]);

  if (!webglSupported) {
    return (
      <div style={{ position: "relative", width: width ?? "100%", height: height ?? "100%" }}>
        <img
          src={from}
          alt="from"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1 - progress,
          }}
        />
        <img
          src={to}
          alt="to"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: progress,
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: width ?? "100%", height: height ?? "100%", display: "block" }}
    />
  );
};

export default BannerTransition;
