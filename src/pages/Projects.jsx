// src/components/Projects.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch extracted text from backend
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`, // Set Authorization header
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Exam ID</TableCell>
              <TableCell align="right">Student ID</TableCell>
              <TableCell align="right">Reference Text</TableCell>
              <TableCell align="right">Student Text</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.examId}>
                <TableCell component="th" scope="row">
                  {project.examId}
                </TableCell>
                <TableCell align="right">{project.studentId}</TableCell>
                <TableCell align="right">{project.referenceText}</TableCell>
                <TableCell align="right">{project.studentText}</TableCell>
                <TableCell align="right">{project.grade}</TableCell>
                <TableCell align="right">{project.feedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Projects;
