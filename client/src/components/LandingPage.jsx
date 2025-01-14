import React from "react";
import { useNavigate } from "react-router-dom";
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

    const handleLoginClick = () => navigate("/login");
    const handleSignUpClick = () => navigate("/signup");
    const handleUpload = () => navigate("/upload");

    return (
        <Box sx={{ maxWidth: 1500, margin: "20px auto", padding: 2 }}>
        {/* Hero Section */}
        <Card sx={{ boxShadow: 3, padding: 4, textAlign: "center", mb: 4 }}>
        <Typography variant="h3" gutterBottom>
        Create Freely, Comply Effortlessly
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
        Your AI-powered compliance partner for worry-free content creation.
        </Typography>
        <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3 }}
        onClick={handleSignUpClick}
        >
        Try Now – It's Free
        </Button>
        </Card>

        {/* Problem Section */}
        <Card sx={{ boxShadow: 2, mb: 4, padding: 3 }}>
        <CardContent>
        <Typography variant="h4" gutterBottom>
        The Problem Content Creators Face
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
        In Q2 2024, YouTube removed approximately 8.4 million videos for community guideline violations. Many creators unknowingly violate platform policies due to restricted keywords, visuals, or imagery. This leads to demonetization, strikes, or even channel bans.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
        <ListItem>
        <ListItemText
        primary="Restricted keywords in audio or text"
        secondary="Flagged content often results in demonetization."
        />
        </ListItem>
        <ListItem>
        <ListItemText
        primary="Inappropriate visuals"
        secondary="Scenes containing violence or nudity can lead to strikes."
        />
        </ListItem>
        </List>
        </CardContent>
        </Card>

        {/* Solution Section */}
        <Card sx={{ boxShadow: 2, mb: 4, padding: 3 }}>
        <CardContent>
        <Typography variant="h4" gutterBottom>
        The Solution: AI Compliance for Content Creators
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
        Our tool empowers creators to focus on creativity while we handle compliance. Analyze your video, identify flagged sections, and clean your content with ease.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
        <ListItem>
        <ListItemText
        primary="AI-powered analysis"
        secondary="Analyze every frame and spoken word for compliance."
        />
        </ListItem>
        <ListItem>
        <ListItemText
        primary="Customizable cleaning options"
        secondary="Blur, mute, or censor flagged sections effortlessly."
        />
        </ListItem>
        </List>
        </CardContent>
        </Card>

        {/* Call-to-Action Section */}
        <Card sx={{ boxShadow: 3, textAlign: "center", padding: 4 }}>
        <Typography variant="h5" gutterBottom>
        Ready to Create Without Worries?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleSignUpClick}>
        Sign Up
        </Button>
        <Button variant="outlined" color="secondary" size="large" onClick={handleLoginClick}>
        Log In
        </Button>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Already have a video?{" "}
        <Button variant="text" color="primary" onClick={handleUpload}>
        Upload Now
        </Button>
        </Typography>
        </Card>
        </Box>
    );
};

export default LandingPage;
