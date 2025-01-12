import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful signup (e.g., display success message)
                console.log('Signup successful!');
            } else {
                // Handle signup errors
                const errorData = await response.json();
                console.error('Signup failed:', errorData);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <Card sx={{ maxWidth: 700, margin: "200px auto", padding: 2, boxShadow: 3 }}>
        <CardContent>
        <form onSubmit={handleSubmit} method="POST">
        <div>
        <label htmlFor="username">Username:</label>
        <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        />
        </div>
        <div>
        <label htmlFor="email">Email:</label>
        <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        />
        </div>
        <div>
        <label htmlFor="password">Password:</label>
        <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        />
        </div>
        <button type="submit">Sign Up</button>
        </form>
        </CardContent>
        </Card>
    );
};

export default SignupForm;
