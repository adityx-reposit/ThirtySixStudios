import React, { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, duration, numImages, size, top, left, zIndex } = details;
  const [index, setIndex] = useState(startIndex);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Animate index without causing re-renders
    const gsapAnimation = gsap.to(
      { value: startIndex },
      {
        value: startIndex + numImages - 1,
        duration: duration,
        repeat: -1,
        ease: "linear",
        onUpdate: function () {
          const newIndex = Math.round(this.targets()[0].value);
          setIndex((prev) => (prev !== newIndex ? newIndex : prev)); // Update state only if the index changes
        },
      }
    );

    return () => gsapAnimation.kill(); // Cleanup animation on unmount
  }, [startIndex, numImages, duration]);

  useEffect(() => {
    const scale = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = canvasImages[index];
    img.onload = () => {
      // Set canvas dimensions
      const { offsetWidth, offsetHeight } = canvas;
      canvas.width = offsetWidth * scale;
      canvas.height = offsetHeight * scale;
      canvas.style.width = `${offsetWidth}px`;
      canvas.style.height = `${offsetHeight}px`;

      ctx.scale(scale, scale);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
      ctx.drawImage(img, 0, 0, offsetWidth, offsetHeight);
    };

    img.onerror = () => {
      console.error(`Failed to load image at index ${index}: ${img.src}`);
    };
  }, [index]);

  return (
    <canvas
    data-scroll
    data-scroll-speed={Math.round(Math.random)}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size*1.8}px`,
        height: `${size*1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex
      }}
    ></canvas>
  );
}

export default Canvas;
