import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
// import HomePage from "./pages/homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
