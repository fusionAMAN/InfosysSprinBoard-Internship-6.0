import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./styles/Layout.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />

        {/* Protected Dashboard Layout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app">
                <Sidebar />
                <div className="main">
                  <Navbar />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
