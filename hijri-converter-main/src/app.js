import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import LanguageSelect from "../components/LanguageSelect"; // ✅ Import LanguageSelect

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* ✅ Use LanguageSelect for Language Switching */}
        <LanguageSelect />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home lang="en" />} />
          <Route path="/arabic" element={<Home lang="ar" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
