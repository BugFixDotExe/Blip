import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import {
    Card,
    CardContent,
    Button,
    TextField,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { Google as GoogleIcon, Apple as AppleIcon } from "@mui/icons-material";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { setToken } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/user/login",
                formData
            );
            if (response) {
                setToken(response.data.token);
                setError("");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.");
            console.error(err);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    const handleAppleLogin = () => {
        window.location.href = "http://localhost:5000/auth/apple";
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
            maxWidth: 400,
            padding: 4,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        >
        <CardContent>
        <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: 2, color: "#3f51b5" }}
        >
        Welcome Back
        </Typography>
        <Typography
        variant="body1"
        sx={{
            textAlign: "center",
            marginBottom: 3,
            color: "#555",
        }}
        >
        Focus on creating. We'll handle the rest.
        </Typography>
        <form onSubmit={handleSubmit} method="POST">
        <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        />
        <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        />
        {error && (
            <Typography
            variant="body2"
            sx={{ color: "red", marginBottom: 2 }}
            >
            {error}
            </Typography>
        )}
        <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
            padding: "10px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
        }}
        >
        Sign In
        </Button>
        </form>
        <Divider sx={{ marginY: 2 }}>OR</Divider>
        <Button
        onClick={handleGoogleLogin}
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{
            marginBottom: 1,
            color: "#DB4437",
            borderColor: "#DB4437",
            "&:hover": {
                backgroundColor: "rgba(219, 68, 55, 0.1)",
            },
        }}
        >
        Sign in with Google
        </Button>
        <Button
        onClick={handleAppleLogin}
        variant="outlined"
        fullWidth
        startIcon={<AppleIcon />}
        sx={{
            color: "#000",
            borderColor: "#000",
            "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
        }}
        >
        Sign in with Apple
        </Button>
        <Typography
        variant="body2"
        sx={{ textAlign: "center", marginTop: 3, color: "#777" }}
        >
        Don't have an account?{" "}
        <a
        href="/signup"
        style={{ textDecoration: "none", color: "#3f51b5" }}
        >
        Sign up here
        </a>
        </Typography>
        </CardContent>
        </Card>
        </motion.div>
        </Box>
    );
};

export default Login;
