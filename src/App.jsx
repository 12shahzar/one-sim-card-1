import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import Home from "./Pages/Home";
import GlobalCoverage from "./Pages/GlobalCoverage";
import EasySIMManagement from "./Pages/EasySIMManagement";
import PremierPartners from "./Pages/PremierPartners";
import OSCARIoTSIMCardManagementPortal from "./Pages/OSCARIoTSIMCardManagementPortal";
import IoTSolutions from "./Pages/IoTSolutions";
import ConsumerIOT from "./Pages/ConsumerIOT";
import Layout from "./Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./Components/Common/ScrollToTop/ScrollToTop";
import IoTSolutionDetails from "./Pages/IoTSolutionDetails";
import SimPlans from "./Pages/SimPlans";
import StarterKit from "./Pages/StarterKit";
import CustomQuote from "./Section/CustomQuote/CustomQuote";
import WhyOneSimCard from "./Pages/WhyOneSimCard";
import Rates from "./Pages/Rates";
import AboutUs from "./Pages/AboutUs";
import PressRelease from "./Pages/PressRelease";
import BusinessOppotunities from "./Pages/BusinessOppotunities";
import M2mDistributorRegistration from "./Pages/M2mDistributorRegistration";
import BlogPage from "./Pages/BlogPage";
import BuyNow from "./Pages/BuyNow";
import FaqPage from "./Pages/FaqPage";
import M2MSupportForm from "./Pages/M2MSupportForm";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="overflow-x-clip">
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
                    { label: "IoT SIM card coverage", path: "/GlobalCoverage" },
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
                      label: "Manage Unlimited IoT SIM cards Under One Web Account",
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
                      label: "OSCAR IoT SIM card management portal",
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
                      label: " IoT SIM card coverage",
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
                      label: "IoT SIM card coverage",
                      path: "/",
                    },
                  ],
                }}
              >
                <PressRelease />
              </Layout>
            }
          />
          <Route
            path="/businessOppotunities"
            element={
              <Layout
                banner={{
                  titleFirst: "Business Opportuni",
                  titleLast: "ties",
                  breadcrumb: [
                    {
                      label:
                        "IoT SIM card business opportunities for distributors and resellers ",
                      path: "/",
                    },
                  ],
                }}
              >
                <BusinessOppotunities />
              </Layout>
            }
          />
          <Route
            path="/m2mDistributorRegistration"
            element={
              <Layout
                banner={{
                  titleFirst: "M2M/IoT Distributor",
                  titleLast: "Registration",
                  breadcrumb: [
                    {
                      label: "OneSimCard M2M/IoT Distributor Registration ",
                      path: "/",
                    },
                  ],
                }}
              >
                <M2mDistributorRegistration />
              </Layout>
            }
          />
          <Route
            path="/BuyNow"
            element={
              <Layout
                banner={{
                  titleFirst: "Buy ",
                  titleLast: "Now",
                  breadcrumb: [
                    {
                      label: "BuyNow",
                      path: "/",
                    },
                  ],
                }}
              >
                <BuyNow />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout
                banner={{
                  titleFirst: "OneSimCard IoT ",
                  titleLast: "Blog",
                  breadcrumb: [
                    {
                      label: "OneSimCard IoT Blog",
                      path: "/",
                    },
                  ],
                }}
              >
                <BlogPage />
              </Layout>
            }
          />
          <Route
            path="/Faq"
            element={
              <Layout
                banner={{
                  titleFirst: "OneSimCard M2M Que",
                  titleLast: "stions",
                  bgColor: "#ffffff",
                  searchBar: true,
                  breadcrumb: [
                    {
                      label: "FAQs",
                      path: "/",
                    },
                  ],
                }}
              >
                <FaqPage />
              </Layout>
            }
          />
          <Route
            path="/M2MSupportForm"
            element={
              <Layout
                banner={{
                  titleFirst: "Contact Sup",
                  titleLast: "port",
                  bgColor: "#ffffff",
                  breadcrumb: [
                    {
                      label: "Contact Support",
                      path: "/",
                    },
                  ],
                }}
              >
                <M2MSupportForm />
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
