// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./services/auth";

// Layout component to handle the Navbar visibility and routing
function Layout() {
  const location = useLocation(); // Get the current route

  // Determine whether to show the Navbar
  const showNavbar = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavbar && isAuthenticated() && <Navbar />}{" "}
      {/* Conditionally render Navbar */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects"
          element={isAuthenticated() ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
