import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import Home from "./Pages/Home";
import GlobalCoverage from "./Pages/GlobalCoverage";
import EasySIMManagement from "./Pages/EasySIMManagement";
import PremierPartners from "./Pages/PremierPartners";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./Components/Common/ScrollToTop/ScrollToTop";
import OSCARIoTSIMCardManagementPortal from "./Pages/OSCARIoTSIMCardManagementPortal";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 }); 
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="overflow-x-hidden">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/GlobalCoverage" element={<GlobalCoverage />} />
          <Route path="/EasySIMManagement" element={<EasySIMManagement />} />
          <Route path="/PremierPartners" element={<PremierPartners />} />
          <Route
            path="/OSCARIoTSIMCardManagementPortal"
            element={<OSCARIoTSIMCardManagementPortal />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
