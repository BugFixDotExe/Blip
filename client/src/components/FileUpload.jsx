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
} from "@mui/material";
import { useAuth } from "./AuthContext";

const FileUpload = () => {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log('token',token)
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
      const response = await axios.post(
        "http://localhost:5000/api/v1/upload/thumbnail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        }
      );

      setMessage(response.data.message || "File uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 700, margin: "200px auto", padding: 2, boxShadow: 3 }}>
    <CardContent>
    <Typography variant="h5" gutterBottom>
    File Upload
    </Typography>
    <form onSubmit={handleUpload}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Button
    variant="outlined"
    component="label"
    fullWidth
    >
    Choose File
    <input
    type="file"
    hidden
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
    {loading ? <CircularProgress size={24} /> : "Upload"}
    </Button>
    </Box>
    </form>
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
