import { FaArrowRight } from "react-icons/fa";
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";

const Navigation = () => {



	return (
		<div>
			{/* <div className=" flex items-center justify-between mx-4 py-3 lg:mx-44 bg-white shadow-sm border-b">
				<div className="w-32 sm:w-44">
					<img src={logo} alt="logo" />
				</div>
				<Link
				 to="/login"
         className="cursor-pointer  bg-zinc-800  text-white  flex  items-center  gap-4  px-4  py-2  sm:px-8  sm:py-3  text-sm  rounded-full hover:scale-[105%] transition-all duration-500 hover:bg-violet-600 ">
						Login
					<FiLogIn />
				</Link>
			</div> */}


         <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8   ">
          <div className="flex justify-between items-center h-16 gap-x-4">
            <div className="flex items-center gap-3">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg"></div> */}
              <img src={logo} alt="logo" />
            </div>
            
           	<Link
				 to="/login"
         className="cursor-pointer  bg-zinc-800  text-white  flex  items-center  gap-4  px-4  py-2  sm:px-8  sm:py-3  text-sm  rounded-full hover:scale-[105%] transition-all duration-500 hover:bg-violet-600 ">
						Login
					<FiLogIn />
				</Link>
          </div>
        </div>
      </header>
		</div>
	);
};

export default Navigation;
