import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Card, CardContent, Button, TextField } from "@mui/material";

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
            const response = await axios.post("http://localhost:5000/api/v1/user/login", formData);
            if (response) {
                console.log('in login',response.data.token)
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

    return (
        <Card sx={{ maxWidth: 700, margin: "20px auto", padding: 2, boxShadow: 3 }}>
        <CardContent>
        <form onSubmit={handleSubmit} method="POST">
        <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        />
        <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign In
        </Button>
        </form>
        </CardContent>
        </Card>
    );
};

export default Login;
