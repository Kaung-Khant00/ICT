import React, { useEffect, useRef } from "react";

// Small utility: linear interpolation
const lerp = (start, end, amt) => start + (end - start) * amt;

const CircleDot = () => {
  const dotRef = useRef(null);
  const rafRef = useRef(null);
  // don't read ref.current during render — initialize independently
  const initialX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const initialY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
  const target = useRef({ x: initialX, y: initialY });
  const pos = useRef({ x: initialX, y: initialY });
  const backdropRef = useRef(null);
  const baseSize = 25; // px (tailwind w-5 ≈ 20px)
  const size = useRef(baseSize);
  const desiredSize = useRef(baseSize);
  const desiredBackdrop = useRef(0);

  // Update target on mouse move / touch
  function handlePointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    target.current.x = clientX;
    target.current.y = clientY;
    try {
      const el = document.elementFromPoint(clientX, clientY);
      if (el && el.closest && el.closest(".hdh")) {
        // increase to ~2.4x the base size
        desiredSize.current = baseSize * 2;
        desiredBackdrop.current = 1;
      } else {
        desiredSize.current = baseSize;
        desiredBackdrop.current = 0;
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    // Animation loop: smooth the dot towards target
    function animate() {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);
      // lerp size
      size.current = lerp(size.current, desiredSize.current, 0.12);
      const el = dotRef.current;
      if (el) {
        // position by left/top and set width/height to visually scale the dot
        const w = Math.max(6, size.current);
        const h = w;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.left = `${pos.current.x - w / 2}px`;
        el.style.top = `${pos.current.y - h / 2}px`;
        el.style.borderRadius = "50%";
      }

      // backdrop invert lerp opacity
      const backdrop = backdropRef.current;
      if (backdrop) {
        const current = parseFloat(backdrop.style.opacity || "0");
        const next = lerp(current, desiredBackdrop.current, 0.12);
        backdrop.style.opacity = String(next);
        backdrop.style.pointerEvents = next > 0.01 ? "auto" : "none";
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    // start listeners
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", () => {
      desiredSize.current = baseSize;
      desiredBackdrop.current = 0;
    });

    // start animation
    rafRef.current = requestAnimationFrame(animate);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="w-5 h-5 bg-secondary rounded-full will-change-transform mix-blend-difference z-1"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transition: "transform 120ms linear",
      }}
    ></div>
  );
};

export default CircleDot;
