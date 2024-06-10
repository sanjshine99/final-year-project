// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { logout } from "../services/auth"; // Import the logout function from the auth service

const Navbar = () => {
  const navigate = useNavigate(); // Use navigate for redirection

  // Logout function
  const handleLogout = () => {
    logout(); // Call the logout function to clear the token
    navigate("/login"); // Redirect to the login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Grading System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/projects">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          {" "}
          {/* Add onClick handler */}
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
