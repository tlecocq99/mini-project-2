import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FactionsListPage from "./pages/FactionsListPage";
import FactionDetailPage from "./pages/FactionDetailPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/factions" element={<FactionsListPage />} />
      <Route path="/factions/:id" element={<FactionDetailPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  );
}
export default App;
