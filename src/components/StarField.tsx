"use client";

import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; size: number; speed: number; opacity: number; phase: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / canvas.width - 0.5) * 2;
      mouseY = (e.clientY / canvas.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const parallaxX = mouseX * star.speed * 20;
        const parallaxY = mouseY * star.speed * 20;
        const twinkle = Math.sin(time * 0.001 * star.speed + star.phase) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
