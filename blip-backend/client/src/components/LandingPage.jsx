import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {navigate('/login');};
    const handleSignUpClick = () => navigate('/signup')
    const handleUpload = () => navigate('/upload')

    return (
        <Card sx={{ maxWidth: 1500, margin: "20px auto", padding: 2, boxShadow: 3 }}>
        <CardContent>
        {/* Buttons for Demo or Expansion */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="contained" color="primary">
        View Demo
        </Button>
        <Button variant="outlined" color="secondary">
        Learn More
        </Button>
        </Box>
        </CardContent>
        </Card>
    );
};
export default LandingPage;
