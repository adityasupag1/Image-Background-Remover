import { useRef, useState } from "react";
import { FaArrowsAltH } from "react-icons/fa"
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import ComparePreview from "./components/ComparePreview";

function App(){
   return (
    <>
     <Navigation/>
     <Hero/>
     <Steps/>
     <ComparePreview/>
    </>
   )
}
export default App