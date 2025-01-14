import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/v1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("Signup successful! Welcome aboard!");
                setFormData({ username: "", email: "", password: "" }); // Clear the form
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred during signup. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 700, margin: "200px auto", padding: 2, boxShadow: 3 }}>
        <CardContent>
        <Typography variant="h5" gutterBottom>
        Sign Up
        </Typography>
        <form onSubmit={handleSubmit} method="POST">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        required
        />
        <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        />
        <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        />
        <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        </Box>
        </form>
        {successMessage && (
            <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
            {successMessage}
            </Typography>
        )}
        {errorMessage && (
            <Typography variant="body1" color="error.main" sx={{ marginTop: 2 }}>
            {errorMessage}
            </Typography>
        )}
        </CardContent>
        </Card>
    );
};

export default SignupForm;
