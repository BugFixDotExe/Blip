import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";

const FileUpload = ({ token }) => {
  if (!token) {
    return res.status(401).json({error: 'Unauthroized access'})
  }
  console.log('file upload token', token)
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0); // 0 for Thumbnail, 1 for Video
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Clear previous messages
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    try {
      const endpoint =
      tabIndex === 0
      ? "http://localhost:5000/api/v1/upload/thumbnail"
      : "http://localhost:5000/api/v1/upload/video";

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });

      setMessage(response.data.message || "File uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue); // Switch between Thumbnail and Video tabs
  };

  return (
    <Card sx={{ maxWidth: 700, margin: "50px auto", padding: 2, boxShadow: 3 }}>
    <CardContent>
    <Typography variant="h5" gutterBottom>
    File Upload
    </Typography>

    {/* Tabs for Thumbnail and Video */}
    <Tabs value={tabIndex} onChange={handleTabChange} centered>
    <Tab label="Thumbnail" />
    <Tab label="Video" />
    </Tabs>

    {/* Thumbnail Upload Section */}
    {tabIndex === 0 && (
      <form onSubmit={handleUpload}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button variant="outlined" component="label" fullWidth>
      Choose Thumbnail
      <input
      type="file"
      hidden
      accept="image/*"
      onChange={handleFileChange}
      />
      </Button>
      {file && (
        <Typography variant="body2" color="textSecondary">
        Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </Typography>
      )}
      <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading || !file}
      fullWidth
      >
      {loading ? <CircularProgress size={24} /> : "Upload Thumbnail"}
      </Button>
      </Box>
      </form>
    )}

    {/* Video Upload Section */}
    {tabIndex === 1 && (
      <form onSubmit={handleUpload}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button variant="outlined" component="label" fullWidth>
      Choose Video
      <input
      type="file"
      hidden
      accept="video/*"
      onChange={handleFileChange}
      />
      </Button>
      {file && (
        <Typography variant="body2" color="textSecondary">
        Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </Typography>
      )}
      <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading || !file}
      fullWidth
      >
      {loading ? <CircularProgress size={24} /> : "Upload Video"}
      </Button>
      </Box>
      </form>
    )}

    {/* Message */}
    {message && (
      <Typography
      variant="body1"
      color={message.includes("Error") ? "error.main" : "success.main"}
      sx={{ marginTop: 2 }}
      >
      {message}
      </Typography>
    )}
    </CardContent>
    </Card>
  );
};

export default FileUpload;
