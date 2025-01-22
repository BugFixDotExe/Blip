import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Button, Box, CircularProgress, Modal, Divider } from '@mui/material';

const Dashboard = ({ videoList, gemeniResponse, tabIndex }) => {
    // State to track processing state of each video
    const [processingState, setProcessingState] = useState({});
    // State to track the video whose details are being viewed
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Function to handle processing the video
    const handleProcessVideo = (video) => {
        setProcessingState(prevState => ({
            ...prevState,
            [video.id]: { processing: true, complete: false },
        }));

        // Simulate AI processing (e.g., network request, computation, etc.)
        setTimeout(() => {
            setProcessingState(prevState => ({
                ...prevState,
                [video.id]: { processing: false, complete: true },
            }));
        }, 3000); // Simulate a 3-second processing time
    };

    return (
        <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
        Your Upload(s)
        </Typography>
        <Grid container spacing={3}>
        {videoList.map((video) => {
            const isProcessing = processingState[video.id]?.processing;
            const isComplete = processingState[video.id]?.complete;

            return (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                component="img"
                alt={video.title}
                height="140"
                image={video.thumbnail}
                sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="div">
                {video.name}
                </Typography>
                </CardContent>
                {/* Process Video button or View Video Details button */}
                {isProcessing ? (
                    <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: 2 }}
                    disabled
                    >
                    <CircularProgress size={24} sx={{ color: "white" }} />
                    </Button>
                ) : isComplete ? (
                    <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: 2 }}
                    onClick={() => setSelectedVideo(video)}
                    >
                    Show Details
                    </Button>
                ) : (
                    <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: 2 }}
                    onClick={() => handleProcessVideo(video)}
                    >
                    Process Upload
                    </Button>
                )}
                </Card>
                </Grid>
            );
        })}
        </Grid>

        {/* Modal to show video details */}
        {selectedVideo && (
            <Modal
            open={Boolean(selectedVideo)}
            onClose={() => setSelectedVideo(null)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
            <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: 400 }}>
            <Typography variant="h5" gutterBottom>
            {selectedVideo.name} Detail
            </Typography>
            {/* Show the details of the selected video */}
            <Typography variant="body1">Title: {selectedVideo.name}</Typography>
              <Divider sx={{border: 2, bgcolor: 'white'}} />
            <Typography variant="body1">Compliant: {String(gemeniResponse.data.compliant_overall)}</Typography>
              <Divider sx={{border: 2, bgcolor: 'white'}} />
            <Typography variant="body1">Violation: {
                gemeniResponse.data.visual_violations.map((item, index) => (
                    <Box key={index} sx={{ marginBottom: 1}}>
                {tabIndex === 1 &&
                    (
                        <>
                    <Typography variant="body1">Start Time: {
                        item.start_time
                    }
                    </Typography>

                    <Typography variant="body1">End Time: {
                        item.end_time
                    }
                    </Typography>
                    </>
                    )
                }


                <Divider sx={{border: 2, bgcolor: 'white'}} />
                <Typography variant="body1">Details: {
                    item.details
                }
                </Typography>
                <Divider sx={{border: 2, bgcolor: 'white'}} />

                <Typography variant="body1">Suggestions: {
                    item.suggestions.map((suggestion, position) =>(
                        <Box key={position} sx={{ marginLeft: 2, marginBottom: 1 }}>
                        <Typography variant="body2">Reason: {suggestion}</Typography>
                        </Box>
                    ))
                }
                </Typography>
              <Divider sx={{border: 2, bgcolor: 'white'}} />
              <Typography variant="body1">Violation Type: {
                  item.violation_type
              }
              </Typography>
                            <Divider sx={{border: 2, bgcolor: 'white'}} />
                </Box>
                )
                )
            }
            </Typography>

            <Typography variant="body2" color="text.secondary">Uploaded on: {new Date().toLocaleDateString()}</Typography>
            <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={() => setSelectedVideo(null)}
            >
            Close
            </Button>
            </Box>
            </Modal>
        )}
        </Box>
    );
};

export default Dashboard;
