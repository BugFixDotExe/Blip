import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
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
                navigate('/login')

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
        <Box
        sx={{
            background: "linear-gradient(to bottom, #f5f7fa, #c3cfe2)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        >
        <Card
        sx={{
            maxWidth: 500,
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        >
        <CardContent>
        <Typography
        variant="h4"
        sx={{
            textAlign: "center",
            marginBottom: 2,
            color: "#3f51b5",
        }}
        >
        Create an Account
        </Typography>
        <Typography
        variant="body1"
        sx={{
            textAlign: "center",
            marginBottom: 3,
            color: "#555",
        }}
        >
        Join us and start your journey!
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
        variant="outlined"
        required
        />
        <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        required
        />
        <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        required
        />
        <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        sx={{
            padding: "10px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
        }}
        >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        </Box>
        </form>
        <Divider sx={{ marginY: 2 }} />
        {successMessage && (
            <Typography
            variant="body2"
            sx={{
                color: "green",
                textAlign: "center",
                marginTop: 2,
            }}
            >
            {successMessage}
            </Typography>
        )}
        {errorMessage && (
            <Typography
            variant="body2"
            sx={{
                color: "red",
                textAlign: "center",
                marginTop: 2,
            }}
            >
            {errorMessage}
            </Typography>
        )}
        <Typography
        variant="body2"
        sx={{
            textAlign: "center",
            marginTop: 3,
            color: "#777",
        }}
        >
        Already have an account?{" "}
        <a
        href="/login"
        style={{
            textDecoration: "none",
            color: "#3f51b5",
        }}
        >
        Sign in here
        </a>
        </Typography>
        </CardContent>
        </Card>
        </motion.div>
        </Box>
    );
};

export default SignupForm;
