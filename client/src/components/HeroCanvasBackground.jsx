import React, { useEffect, useRef } from 'react';

/**
 * Ultra-lightweight, 60fps HTML5 Canvas constellation background for the Hero section.
 * - Zero external WebGL/Three.js bundle overhead.
 * - Adaptive density & DPR cap for smooth mobile performance.
 * - Automatically pauses when scrolled out of view or tab is hidden.
 * - Respects `prefers-reduced-motion: reduce`.
 */
export default function HeroCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user reduced motion preference (WCAG 2.3.3)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let particles = [];

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const mouse = { x: -9999, y: -9999, active: false };

    const initParticles = () => {
      const isMobile = width < 768;
      const count = isMobile ? 24 : 50;
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.32),
        vy: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.32),
        radius: Math.random() * 1.6 + 0.9,
        // Alternate subtly between brand teal and sky blue
        color: i % 3 === 0 ? '56, 189, 248' : '20, 184, 166',
        alpha: Math.random() * 0.4 + 0.22
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      const maxDist = width < 768 ? 105 : 135;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle pointer interaction on desktop
        if (isFinePointer && mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150 && dist > 1) {
            const force = (150 - dist) / 150;
            p.x -= (dx / dist) * force * 0.45;
            p.y -= (dy / dist) * force * 0.45;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Draw subtle connecting lines to nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resize();

    // Pause animation when Hero scrolls off-screen to save battery/CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = window.requestAnimationFrame(draw);
        } else if (!isVisible && animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        isVisible = true;
        if (!animationFrameId) {
          animationFrameId = window.requestAnimationFrame(draw);
        }
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (isFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (isFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-80"
    />
  );
}
