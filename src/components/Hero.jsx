import heroImage from "../assets/hero-image.png";
import { RxUpload } from "react-icons/rx";
import { Link } from 'react-router-dom';
 

const Hero = () => {
	
	const scrollToUpload = () => {
		const uploadSection = document.querySelector('#upload-section');
		if (uploadSection) {
			uploadSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	

	return (
		<div>
			<div className="bg-gray-50 flex items-center justify-end max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
				<div className="flex-1">
					<h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold text-neutral-700 leading-tight">
						Remove the <br />
						<span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
							background
						</span>{" "}
						from images for free.
					</h1>
					<p className="my-6 text-[15px] text-gray-500">
						Remove image backgrounds instantly with our free AI tool. Upload any photo and get a transparent PNG in seconds. Perfect for ecommerce, social media, or creative projects, it delivers clean and professional results with no skills required. Simple, fast, and free—transform your photos effortlessly and achieve studio-quality edits with just one click.
					</p>
					<div className="mt-6">
						<div 
							onClick={scrollToUpload}
							className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium hover:scale-105 transition-all duration-700 justify-center items-center"
						>
							{/* <RxUpload className="text-[24px]"/> */}
							<div className="text-[14px]">Remove Background</div>
						</div>
					</div>
				</div>
				<div className="flex-1 max-w-md flex justify-center">
					<img 
						src={heroImage} 
						alt="Background removal example" 
						className="max-w-full h-auto rounded-lg shadow-xl"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;