import { useState, useRef, useEffect } from "react";

const Preview = ({ original, processed }) => {
	const [position, setPosition] = useState(50); // percentage
	const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
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

	const handleDrag = (e) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		let newPos = ((e.clientX - rect.left) / rect.width) * 100;
		newPos = Math.max(0, Math.min(100, newPos));
		setPosition(newPos);
	};

	if (!imgSize.width || !imgSize.height) {
		return (
			<div className="text-center text-gray-500">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-gray-100">
			<div
				ref={containerRef}
				className="relative overflow-hidden rounded-2xl cursor-ew-resize select-none bg-black"
				style={{
					width: `${imgSize.width}px`,
					height: `${imgSize.height}px`,
				}}
				onMouseMove={(e) =>
					e.buttons === 1 && handleDrag(e)
				}
				onMouseDown={handleDrag}
				onTouchMove={(e) => handleDrag(e.touches[0])}
			>
				{/* Background (processed image) */}
				<img
					src={processed}
					alt="Processed"
					className="absolute inset-0 w-full h-full object-contain z-0 border-2 border-red-500"
					onLoad={() =>
						console.log(
							"✅ Processed loaded"
						)
					}
				/>

				{/* Foreground (original, clipped) */}
				<img
					src={original}
					alt="Original"
					className="absolute inset-0 w-full h-full object-contain z-10"
					style={{
						clipPath: `inset(0 ${
							100 - position
						}% 0 0)`,
					}}
				/>

				{/* Slider Line */}
				<div
					className="absolute top-0 bottom-0 w-1 bg-white shadow-md"
					style={{
						left: `${position}%`,
						transform: "translateX(-50%)",
					}}
				/>

				{/* Slider Handle */}
				<div
					className="absolute top-1/2 w-8 h-8 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center shadow cursor-grab active:cursor-grabbing"
					style={{
						left: `${position}%`,
						transform: "translate(-50%, -50%)",
					}}
				>
					<span className="text-gray-600">{`<>`}</span>
				</div>
			</div>
		</div>
	);
};

export default Preview;
