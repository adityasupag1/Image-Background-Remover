import heroImage from "../assets/hero-image.png";
import { RxUpload } from "react-icons/rx";
import { Link } from "react-router-dom";

const Hero = () => {
	const scrollToUpload = () => {
		const uploadSection = document.querySelector("#upload-section");
		if (uploadSection) {
			uploadSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div>
			<div className="flex items-center justify-end max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
				{/* Left Section */}
				<div className="flex-1">
					<h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold text-neutral-700 leading-tight">
						Remove the <br />
						<span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
							background
						</span>{" "}
						from images for free.
					</h1>
					<p className="my-6 text-[15px] text-gray-500">
				Remove the background from images instantly with our free tool. It is designed to deliver accurate and smooth results without effort. Trusted by users worldwide, it simplifies the editing process, allowing you to focus on creativity while saving time and improving productivity.
					</p>
					<div className="mt-6">
						<Link
							to="/login"
							onClick={scrollToUpload}
							className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium hover:scale-105 transition-all duration-700 justify-center items-center"
						>
							
							<div className="text-[14px]">Login/SignUp</div>
						</Link>
					</div>
				</div>

				{/* Right Section */}
				<div className="flex-1 max-w-md">
					<img src={heroImage} alt="Hero section" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
