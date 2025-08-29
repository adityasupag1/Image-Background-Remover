import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Preview from "./components/Preview";
import original from "./assets/original.png";
import processed from "./assets/processed.png";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const LandingPage = () => {
	return (
		<>
			<Navigation />
			<Hero />
			<Steps />
			<div className="pb-10 md:py-20 mx-2">
            <div className=" mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Remove Background With High <br/>
Quality and Accuracy</div>
				{/* <Preview
					original={original}
					processed={processed}
				/> */}
			</div>
         <Testimonials/>
         <Footer/>
		</>
	);
};

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
