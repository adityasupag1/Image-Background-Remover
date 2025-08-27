import { FaArrowRight } from "react-icons/fa";
const Navigation = () =>{
  return (
    <div>
         <div className=" flex items-center justify-between mx-4 py-3 lg:mx-44">
           <div className="w-32 sm:w-44">
            <img src="/src/assets/logo.svg" alt="" />
           </div>
           <div className="  bg-zinc-800  text-white  flex  items-center  gap-4  px-4  py-2  sm:px-8  sm:py-3  text-sm  rounded-full">
            <button>Get Started</button>
           <FaArrowRight />
           </div>
         </div>
    </div>
  )
}
export default Navigation;