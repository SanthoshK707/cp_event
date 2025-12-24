'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const SPEED = 0.2; 
  const RADIUS = 12; 

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      const distX = mouse.current.x - pos.current.x;
      const distY = mouse.current.y - pos.current.y;

      pos.current.x += distX * SPEED;
      pos.current.y += distY * SPEED;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
          translate(-50%, -50%)
          scale(${isMouseDown ? 0.8 : 1})
        `;
      }

      if (dotRef.current) {
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance > 1) {
          const limit = Math.min(distance, RADIUS);
          const moveX = (distX / distance) * limit;
          const moveY = (distY / distance) * limit;

          dotRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        } else {
          dotRef.current.style.transform = `translate3d(0px, 0px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        !!t.closest('a,button') ||
        t.getAttribute('role') === 'button'
      );
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', () => setIsMouseDown(true));
    window.addEventListener('mouseup', () => setIsMouseDown(false));
    document.body.addEventListener('mouseenter', () => setIsVisible(true));
    document.body.addEventListener('mouseleave', () => setIsVisible(false));

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [isVisible, isMouseDown]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        input, textarea, select, [contenteditable] {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] mix-blend-difference will-change-transform"
      >
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div
            className={`
              absolute border border-white transition-all duration-300
              ${isHovering ? 'w-12 h-12 opacity-100 rotate-90' : 'w-6 h-6 opacity-50'}
            `}
            style={{ borderRadius: isHovering ? '0%' : '50%' }}
          />

          {/* Core dot */}
          <div
            ref={dotRef}
            className={`
              bg-white transition-[width,height] duration-200
              ${isHovering ? 'w-1 h-1' : 'w-2 h-2'}
            `}
          />
        </div>
      </div>
    </>
  );
}
