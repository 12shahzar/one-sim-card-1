import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import Home from "./Pages/Home";
import GlobalCoverage from "./Pages/GlobalCoverage";
import EasySIMManagement from "./Pages/EasySIMManagement";
import PremierPartners from "./Pages/PremierPartners";
import OSCARIoTSIMCardManagementPortal from "./Pages/OSCARIoTSIMCardManagementPortal";
import IoTSolutionsFleet from "./Pages/IoTSolutionsFleet";
import IoTSolutions from "./Pages/IoTSolutions";
import ConsumerIOT from "./Pages/ConsumerIOT";
import Layout from "./Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./Components/Common/ScrollToTop/ScrollToTop";

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
          {/* 🏠 Home (no banner example) */}
          <Route path="/" element={<Home />} />

          {/* 🌍 Global Coverage (with banner example) */}
          <Route
            path="/GlobalCoverage"
            element={
              <Layout
                banner={{
                  titleFirst: "Why OneSim",
                  titleLast: "Card",
                  breadcrumb: [
                    { label: "IoT SIM Card Coverage", path: "/IoTSolutions" },
                  ],
                }}
              >
                <GlobalCoverage />
              </Layout>
            }
          />

          <Route
            path="/EasySIMManagement"
            element={
              <Layout
                banner={{
                  titleFirst: "Why OneSim",
                  titleLast: "Card",
                  breadcrumb: [
                    {
                      label: "Manage Unlimited SIM Cards Under One Web Account",
                      path: "/EasySIMManagement",
                    },
                  ],
                }}
              >
                <EasySIMManagement />
              </Layout>
            }
          />

          <Route
            path="/PremierPartners"
            element={
              <Layout
                banner={{
                  titleFirst: "Technolo",
                  titleLast: "gy",
                  breadcrumb: [
                    { label: "Premier Partners", path: "/PremierPartners" },
                  ],
                }}
              >
                <PremierPartners />
              </Layout>
            }
          />

          <Route
            path="/OSCARIoTSIMCardManagementPortal"
            element={
              <Layout
                banner={{
                  titleFirst: "Why OneSim",
                  titleLast: "Card",
                  breadcrumb: [
                    {
                      label: "OSCAR IoT SIM Card Management Portal",
                      path: "/PremierPartners",
                    },
                  ],
                }}
              >
                <OSCARIoTSIMCardManagementPortal />
              </Layout>
            }
          />

          <Route
            path="/IoTSolutionsFleet"
            element={
              <Layout
                banner={{
                  titleFirst: "OneSimCard M2M",
                  titleLast: " for IoT",
                  breadcrumb: [
                    { label: "IoT Solutions", path: "/IoTSolutions" },
                    {
                      label: "Fleet Management Solutions",
                      path: "/IoTSolutionsFleet",
                    },
                  ],
                }}
              >
                <IoTSolutionsFleet />
              </Layout>
            }
          />

          <Route path="/IoTSolutions" element={<IoTSolutions />} />

          <Route
            path="/ConsumerIOT"
            element={
             
                <ConsumerIOT />
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
