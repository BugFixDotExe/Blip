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

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value}
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            })
            if (response.ok){console.log('sign in success')}
            else{console.log('sign in failed')}
        } catch (err){console.log(err)}
    }
    return (
        <Card sx={{ maxWidth: 700, margin: "20px auto", padding: 2, boxShadow: 3 }}>
        <CardContent>
        <form onSubmit={handleSubmit} method="POST">
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
        <button type="submit">Sign In</button>
        </form>
        </CardContent>
        </Card>
    );
};

export default Login;
