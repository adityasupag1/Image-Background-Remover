import { useState, useRef, useEffect } from "react";

const Preview = ({ original, processed }) => {
  const [position, setPosition] = useState(50); // percentage
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Load natural size of original image
  useEffect(() => {
    const img = new Image();
    img.src = original;
    img.onload = () => {
      setImgSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
  }, [original]);

  // Calculate responsive container size
  useEffect(() => {
    if (!imgSize.width || !imgSize.height) return;

    const calculateSize = () => {
      const maxWidth = Math.min(window.innerWidth - 80, 800); // Max width of 800px
      const maxHeight = Math.min(window.innerHeight - 300, 600); // Max height of 600px
      
      const aspectRatio = imgSize.width / imgSize.height;
      let width = maxWidth;
      let height = width / aspectRatio;
      
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      
      setContainerSize({ width, height });
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [imgSize]);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e) => {
    if (!containerRef.current || !isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    if (!clientX) return;
    
    let newPos = ((clientX - rect.left) / rect.width) * 100;
    newPos = Math.max(0, Math.min(100, newPos));
    setPosition(newPos);
  };

  // Add event listeners for mouse and touch events
  useEffect(() => {
    const handleMouseMove = (e) => handleDrag(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e) => {
      e.preventDefault();
      handleDrag(e);
    };
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  if (!imgSize.width || !imgSize.height || containerSize.width === 0) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading image preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full rounded-xl max-sm:mt-16 sm:mt-17 lg:mt-30">
    	{/* Heading */}
			<h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4  font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">
				Remove Background With High <br className="max-sm:hidden"/> Quality and Accuracy
			</h1>
      
      <div className="relative overflow-hidden rounded-xl shadow-xl mx-auto max-sm:mt-16 sm:mt-17 lg:mt-24">
        {/* Container for the comparison slider with fixed size */}
        <div
          ref={containerRef}
          className="relative overflow-hidden select-none mx-auto cursor-ew-resize"
          style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Background layer with checkerboard pattern for transparency */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23f3f4f6' fill-opacity='1' fill-rule='evenodd'%3e%3cpath d='m0 0h10v10h-10z'/%3e%3c/g%3e%3c/svg%3e")`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Processed image (background removed) - full container */}
          <div className="absolute inset-0 z-10">
            <img
              src={processed}
              alt="Background removed"
              className="w-full h-full object-contain"
              style={{
                width: `${containerSize.width}px`,
                height: `${containerSize.height}px`,
              }}
            />
          </div>

          {/* Original image overlay (clipped) */}
          <div 
            className="absolute inset-0 z-20"
            style={{
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            <img
              src={original}
              alt="Original"
              className="w-full h-full object-contain"
              style={{
                width: `${containerSize.width}px`,
                height: `${containerSize.height}px`,
              }}
            />
          </div>

          {/* Slider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-30 pointer-events-none"
            style={{
              left: `${position}%`,
              transform: "translateX(-50%)",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)"
            }}
          />

          {/* Slider Handle */}
          <div
            className="absolute top-1/2 w-12 h-12 bg-white border-2 border-violet-600 rounded-full flex items-center justify-center shadow-lg cursor-ew-resize z-40 hover:scale-110 transition-transform"
            style={{
              left: `${position}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <svg 
              className="w-6 h-6 text-violet-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
 
         
     
        </div>
      </div>

      {/* Instructions */}
     

      {/* Download buttons */}
    
    </div>
  );
};

export default Preview;