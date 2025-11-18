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
import IoTSolutionDetails from "./Pages/IoTSolutionDetails";
import SimPlansSection from "./Pages/SimPlans";
import SimPlans from "./Pages/SimPlans";
import StarterKit from "./Pages/StarterKit";
import CustomQuote from "./Section/CustomQuote/CustomQuote";
import WhyOneSimCard from "./Pages/WhyOneSimCard";
import Rates from "./Pages/Rates";
import AboutUs from "./Pages/AboutUs";
import PressRelease from "./Pages/PressRelease";

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
                    { label: "IoT SIM Card Coverage", path: "/GlobalCoverage" },
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
            path="/Technology"
            element={
              <Layout
                banner={{
                  titleFirst: "Technolo",
                  titleLast: "gy",
                  breadcrumb: [{ label: "Technology", path: "/Technology" }],
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
                      path: "/OSCARIoTSIMCardManagementPortal",
                    },
                  ],
                }}
              >
                <OSCARIoTSIMCardManagementPortal />
              </Layout>
            }
          />

          <Route path="/IoTSolutions" element={<IoTSolutions />} />

          <Route path="/IoTSolutions/:slug" element={<IoTSolutionDetails />} />

          <Route path="/ConsumerIOT" element={<ConsumerIOT />} />
          <Route
            path="/SimPlans"
            element={
              <Layout
                banner={{
                  titleFirst: "OneSim",
                  titleLast: "Card",
                  breadcrumb: [
                    {
                      label: "ConsumerIOT",
                      path: "/ConsumerIOT",
                    },
                    {
                      label: "IoT Track Order",
                      path: "/ConsumerIOT/SimPlans",
                    },
                  ],
                }}
              >
                <SimPlans />
              </Layout>
            }
          />
          <Route
            path="/StarterKit"
            element={
              <Layout
                banner={{
                  titleFirst: "Starter",
                  titleLast: "Kit",
                  breadcrumb: [
                    {
                      label: "Starter Kit",
                      path: "/",
                    },
                  ],
                }}
              >
                <StarterKit />
              </Layout>
            }
          />

          <Route
            path="/CustomQuote"
            element={
              <Layout
                banner={{
                  titleFirst: "Custom Qu",
                  titleLast: "ote",
                  breadcrumb: [
                    {
                      label: "Custom Quote",
                      path: "/",
                    },
                  ],
                }}
              >
                <CustomQuote />
              </Layout>
            }
          />
          <Route
            path="/WhyOneSimCard"
            element={
              <Layout
                banner={{
                  titleFirst: "Why OneSim",
                  titleLast: "Card",
                  breadcrumb: [
                    {
                      label: "Why OneSimCard",
                      path: "/",
                    },
                  ],
                }}
              >
                <WhyOneSimCard />
              </Layout>
            }
          />
            <Route
            path="/rates"
            element={
              <Layout
                banner={{
                  titleFirst: "OneSimCard M2M Data ",
                  titleLast: "Rates ",
                  breadcrumb: [
                    {
                      label: "Data Rates",
                      path: "/",
                    },
                  ],
                }}
              >
                <Rates />
              </Layout>
            }
          />
              <Route
            path="/aboutUs"
            element={ 
              <Layout
                banner={{
                  titleFirst: "Why OneSimCard",
                  titleLast: "Card",
                  breadcrumb: [
                    {
                      label: " IoT SIM Card Coverage",
                      path: "/",
                    },
                  ],
                }}
              >
                <AboutUs />
              </Layout>
            }
          />
           <Route
            path="/pressReleases"
            element={ 
              <Layout
                banner={{
                  titleFirst: "Why OneSimCard",
                  titleLast: "Card",
                  breadcrumb: [
                    {
                      label: "IoT SIM Card Coverage",
                      path: "/",
                    },
                  ],
                }}
              >
                <PressRelease />
              </Layout>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
