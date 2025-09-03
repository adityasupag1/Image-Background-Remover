import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Steps from "./components/Steps";
import ComparePreview from "./components/ComparePreview";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Preview from './components/Preview';
import original from './assets/original.png'
import processed from './assets/processed.png'
import Testimonials from './components/Testimonials';
import Footer from './components/Footer'

const LandingPage = () => {
  return (
  <div className='bg-gray-50'>
    <Navigation/>
      <Hero />
      <Steps/>
      <Preview original={original} processed={processed}/>
      <ComparePreview/>
      <Testimonials/>
      <Footer/>
  </div>
  );
};

function App(){
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