// src/components/Home.js
import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [examId, setExamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [referenceFile, setReferenceFile] = useState(null);
  const [studentFile, setStudentFile] = useState(null);
  const [sessionId, setSessionId] = useState(uuidv4()); // Generate a session ID for this session
  const [referenceId, setReferenceId] = useState(null); // To store the referenceId returned from the server

  const handleReferenceChange = (event) => {
    setReferenceFile(event.target.files[0]);
  };

  const handleStudentChange = (event) => {
    setStudentFile(event.target.files[0]);
  };

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("examId", examId);
    formData.append("sessionId", sessionId);

    if (type === "student") {
      formData.append("studentId", studentId);
      formData.append("referenceId", referenceId); // Include referenceId for student answer upload
    }

    const url =
      type === "reference"
        ? "http://localhost:5000/api/uploads/reference"
        : "http://localhost:5000/api/uploads/student";

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
      console.log(`${type} file uploaded successfully`, response.data);

      if (type === "reference") {
        setReferenceId(response.data.referenceId); // Store the referenceId for later use
      }
    } catch (error) {
      console.error(`Error uploading ${type} file`, error);
    }
  };

  const handleGrading = async () => {
    console.log("Grading started");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Exam ID"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px dashed grey", p: 2, textAlign: "center" }}>
            <Typography variant="h6">Upload Reference Answer Sheet</Typography>
            <input type="file" onChange={handleReferenceChange} />
            <Button
              onClick={() => handleUpload(referenceFile, "reference")}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Upload Reference
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px dashed grey", p: 2, textAlign: "center" }}>
            <Typography variant="h6">Upload Student Answer Sheet</Typography>
            <input type="file" onChange={handleStudentChange} />
            <Button
              onClick={() => handleUpload(studentFile, "student")}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Upload Student
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button onClick={handleGrading} variant="contained" sx={{ mt: 4 }}>
            Start Grading and Feedback
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
