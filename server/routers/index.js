import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import ImagePipe from '../controllers/processing_pipeline/imagePipe.js'
import VideoPipe from '../controllers/processing_pipeline/videoPipe.js'
import UserController from '../controllers/UserController.js'
import upload from '../utils/fileUploader.js'
/**
All routes to the backend are
to be loaded and handled from here,
in the server.js file
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
/* MiddleWare Start here */
app.use(express.static("uploads"))

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/dist')));
/* MiddleWare Ends here */


/** EndPoints definition or routes handling starts here */

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})


app.post('/api/v1/upload/thumbnail', upload.single("file"), ImagePipe.fetchImageValidity)
app.post('/api/v1/upload/video', upload.single("file"), VideoPipe.fetchVideoValidity)
app.post('/api/v1/users', UserController.postNew)
app.post('/api/v1/user/login', UserController.getUserLogin)

app.get('/connect')
app.get('/disconnect')
/** EndPoints definition or routes handling ends here */

export default app;
