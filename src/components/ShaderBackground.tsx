"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

/**
 * Slow domain-warped noise in the brand's ivory / sage / olive tones, with a
 * soft glow that follows the pointer. Fades to ivory at the bottom so the next
 * section joins seamlessly.
 */
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1.0, 0.0)), f.x), mix(h(i + vec2(0.0, 1.0)), h(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * n(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = uv * vec2(r.x / r.y, 1.0) * 1.5;
  float tt = t * 0.075;
  vec2 q = vec2(fbm(p + tt), fbm(p + vec2(5.2, 1.3) - tt));
  vec2 w = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + tt * 1.5), fbm(p + 3.0 * q + vec2(8.3, 2.8) - tt * 1.2));
  float f = fbm(p + 3.6 * w);
  float d = distance(uv, m);
  f += 0.24 * exp(-d * d * 7.0);
  f = (f - 0.5) * 1.35 + 0.5;
  vec3 ivory = vec3(0.961, 0.957, 0.929);
  vec3 sage  = vec3(0.800, 0.829, 0.737);
  vec3 pale  = vec3(0.690, 0.760, 0.580);
  vec3 olive = vec3(0.349, 0.392, 0.278);
  vec3 c = mix(ivory, sage, smoothstep(0.22, 0.65, f));
  c = mix(c, pale, smoothstep(0.35, 0.95, length(q)) * 0.5);
  c = mix(c, olive, smoothstep(0.62, 1.05, f) * 0.3);
  c = mix(c, ivory, (1.0 - smoothstep(0.0, 0.32, uv.y)));
  // Bloom in slowly: starts as plain ivory and grows into the full pattern.
  c = mix(ivory, c, smoothstep(0.0, 6.0, t));
  gl_FragColor = vec4(c, 1.0);
}`;

export default function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return; // CSS gradient behind the canvas remains as the fallback

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "r");
    const uT = gl.getUniformLocation(prog, "t");
    const uM = gl.getUniformLocation(prog, "m");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.7, y: 0.6 };
    const mouse = { x: 0.7, y: 0.6 };
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6; // soft shader: low res is fine
      const w = Math.max(2, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(2, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (time: number) => {
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, time);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!canvas.classList.contains("is-ready")) canvas.classList.add("is-ready");
    };

    const frame = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      target.x = Math.min(Math.max((e.clientX - b.left) / b.width, 0), 1);
      target.y = 1 - Math.min(Math.max((e.clientY - b.top) / b.height, 0), 1);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(20);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("pointermove", onMove, { passive: true });

    if (reduce) draw(20);
    else {
      // Start the clock after the intro so the bloom is actually seen.
      kick();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="shader-bg" aria-hidden="true" />;
}
