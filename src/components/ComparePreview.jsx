import { useRef, useState } from "react";
import { FaArrowsAltH } from "react-icons/fa";

const ComparePreview = ({ original, removed }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);

  const handleMove = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  };

  const handleMouseMove = (e) => e.buttons === 1 && handleMove(e.clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-[600px] h-[400px] overflow-hidden rounded-xl shadow-xl cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onClick={(e) => handleMove(e.clientX)}
      onTouchMove={handleTouchMove}
    >
      {/* 1. Transparency grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkered-pattern.png')] bg-repeat"></div>

      {/* 2. Background removed image (always visible) */}
      <img
        src={removed}
        alt="Removed Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 3. Original image (partially clipped) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={original}
          alt="Original"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 h-full border-l-2 border-white"
        style={{ left: `${position}%` }}
      />

      {/* Handle button */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center shadow-md"
        style={{ left: `calc(${position}% - 20px)` }}
      >
        <FaArrowsAltH className="text-gray-600" />
      </div>
    </div>
  );
};

export default ComparePreview;
