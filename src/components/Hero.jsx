import { RxUpload } from "react-icons/rx";
const Hero = () => {
	return (
		<div>
			<div className="flex items-center justify-end max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
				{/* Left Section */}
				<div className="flex-1">
					<div className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 
                leading-[48px] xl:leading-[48px] 2xl:leading-[60px]">
						Remove the <br className="max-md:hidden"/> <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">background</span> from <br className="max-sm:hidden"/> images for free.
					</div>

					<div className="my-6 text-[15px] text-gray-500 ">
						<p>
							Lorem Ipsum is simply
							dummy text of the
							printing and typesetting
							industry.
						</p>
						<p>
							Lorem Ipsum has been the
							industry's standard
							dummy text ever.
						</p>
					</div>

					<div className="mt-6">
						<button className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium hover:scale-105 transition-all duration-700 justify-center items-center">
            <RxUpload className="text-[24px]"/>
						 <div className="text-[14px]">Upload your image</div>
						</button>
					</div>
				</div>

				{/* Right Section */}
				<div className="w-full max-w-md flex-1">
					<img
						src="https://drive.google.com/file/d/1SbZXLS7z5nOGygafeUrNEITLKF7WyBsU/view?usp=sharing"
						alt="Hero"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
