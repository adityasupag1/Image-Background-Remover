import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaArrowRight } from "react-icons/fa";

const Navigation = () => {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector("#upload-section");
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
         <div className="w-32 sm:w-44">
            <img src={logo} alt="logo" />
           </div>
        <Link
          to="/login"
          onClick={scrollToUpload}
          className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full hover:bg-zinc-700 transition-colors duration-300"
        >
          <span>Get Started</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
