// src/components/Home.js
import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [referenceFile, setReferenceFile] = useState(null);
  const [studentFile, setStudentFile] = useState(null);

  const handleReferenceChange = (event) => {
    setReferenceFile(event.target.files[0]);
  };

  const handleStudentChange = (event) => {
    setStudentFile(event.target.files[0]);
  };

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("examId", "exampleExamId"); // Replace with actual exam ID

    const url =
      type === "reference" ? "/api/uploads/reference" : "/api/uploads/student";

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`${type} file uploaded successfully`, response.data);
    } catch (error) {
      console.error(`Error uploading ${type} file`, error);
    }
  };

  const handleGrading = () => {
    // Call the backend to start the grading process
    console.log("Grading and feedback generation started");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Grid container spacing={2}>
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
