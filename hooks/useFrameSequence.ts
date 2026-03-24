"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
export const TOTAL_FRAMES = 192;

/** Zero-padded frame path: 1 → /frames/ezgif-frame-001.png */
export const framePath = (index: number): string =>
  `/frames/ezgif-frame-${String(index).padStart(3, "0")}.png`;

// ─── Easing helpers ───────────────────────────────────────────────────────────

/** Smooth ease-in-out cubic — removes robotic linearity */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Clamp a value between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FrameSequenceState {
  loadProgress: number; // 0–100
  isReady: boolean;
}

export interface FrameSequenceRefs {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useFrameSequence(): FrameSequenceState & FrameSequenceRefs {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  // Loaded image objects — stored in ref to avoid re-renders
  const framesRef = useRef<HTMLImageElement[]>([]);

  // Animation state — all in refs so RAF loop never stales
  const currentFrameRef = useRef<number>(0); // interpolated (float)
  const targetFrameRef  = useRef<number>(0); // desired (integer)
  const rafRef          = useRef<number>(0);
  const isReadyRef      = useRef<boolean>(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady]           = useState(false);

  // ── Canvas resize via ResizeObserver (crisp on all DPRs) ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      // Rescale context for high-DPI screens
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // ── Draw a single frame with zoom + alpha effects ──────────────────────────
  const drawFrame = useCallback(
    (frameIndex: number, rawProgress: number) => {
      const canvas = canvasRef.current;
      const img    = framesRef.current[frameIndex];
      if (!canvas || !img?.complete || !img.naturalWidth) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr    = window.devicePixelRatio || 1;
      const W      = canvas.offsetWidth;
      const H      = canvas.offsetHeight;

      ctx.clearRect(0, 0, W * dpr, H * dpr);

      // ── Subtle zoom: 1.0 at start → 1.06 at end ──────────────────────────
      const zoom = 1 + rawProgress * 0.06;

      ctx.globalAlpha = 1;

      // ── Cover-fit the image inside canvas ─────────────────────────────────
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgRatio    = imgW / imgH;
      const canvasRatio = W / H;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        // Image wider than canvas — fit height, crop width
        drawH = H * zoom;
        drawW = drawH * imgRatio;
      } else {
        // Image taller than canvas — fit width, crop height
        drawW = W * zoom;
        drawH = drawW / imgRatio;
      }

      // Center the (zoomed) image
      drawX = (W - drawW) / 2;
      drawY = (H - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  // ── RAF animation loop — lerps current toward target ──────────────────────
  const animate = useCallback(() => {
    if (!isReadyRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth lerp factor — higher = snappier, lower = more cinematic lag
    const LERP = 0.12;
    currentFrameRef.current +=
      (targetFrameRef.current - currentFrameRef.current) * LERP;

    const frameIndex  = clamp(Math.round(currentFrameRef.current), 0, TOTAL_FRAMES - 1);
    const rawProgress = currentFrameRef.current / (TOTAL_FRAMES - 1);

    drawFrame(frameIndex, rawProgress);

    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  // ── Scroll → target frame mapping ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop    = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const viewportH     = window.innerHeight;

      const scrollable   = sectionHeight - viewportH;
      const scrolled     = window.scrollY - sectionTop;
      const rawProgress  = clamp(scrolled / scrollable, 0, 1);

      // Apply easing so the animation feels organic, not mechanical
      const easedProgress = easeInOutCubic(rawProgress);

      targetFrameRef.current = Math.round(easedProgress * (TOTAL_FRAMES - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Preload all frames in parallel with priority batching ─────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    /**
     * Load in priority batches:
     *  – batch 1 (frames 1-10)  : immediate, critical for first paint
     *  – batch 2 (frames 11-60) : high priority
     *  – batch 3 (rest)         : background load
     */
    const loadBatch = (start: number, end: number, delay: number) => {
      setTimeout(() => {
        for (let i = start; i <= Math.min(end, TOTAL_FRAMES); i++) {
          const img = new window.Image();
          img.decoding = "async";

          img.onload = img.onerror = () => {
            loaded++;
            const progress = Math.round((loaded / TOTAL_FRAMES) * 100);
            setLoadProgress(progress);

            if (loaded === TOTAL_FRAMES) {
              framesRef.current = images;
              isReadyRef.current = true;
              setIsReady(true);
            }
          };

          img.src = framePath(i);
          images[i - 1] = img;
        }
      }, delay);
    };

    loadBatch(1,  10,   0);   // Critical — load immediately
    loadBatch(11, 60,  50);   // High priority — tiny delay
    loadBatch(61, 192, 150);  // Background — slight delay

    return () => {
      // Abort pending loads by clearing src
      images.forEach((img) => {
        if (img && !img.complete) img.src = "";
      });
    };
  }, []);

  // ── Start RAF loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return { loadProgress, isReady, sectionRef, canvasRef };
}
