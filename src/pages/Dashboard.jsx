// src/components/Dashboard.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        User details and summary information would be displayed here.
      </Typography>
    </Box>
  );
};

export default Dashboard;
