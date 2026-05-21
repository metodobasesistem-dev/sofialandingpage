import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LGPDPage from "./pages/LGPD";
import DemoPage from "./pages/DemoPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demonstracao" element={<DemoPage />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
        <Route path="/termos-de-uso" element={<TermsOfService />} />
        <Route path="/lgpd" element={<LGPDPage />} />
      </Routes>
    </Router>
  );
}
