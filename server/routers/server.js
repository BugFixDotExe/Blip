import express from 'express'
import path from 'path' // The Node.js path module provides utilities for working with file and directory paths
import { fileURLToPath } from 'url'
import cors from 'cors'
import multer from 'multer'
import ImagePipe from '../controllers/processing_pipeline/imagePipe.js'
import VideoPipe from '../controllers/processing_pipeline/videoPipe.js'
import UserController from '../controllers/UserController.js'
import dbClient from '../utils/dbClient.js'

/**
All routes to the backend are
to be loaded and handled from here,
in the server.js file
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
/* MiddleWare Start here */
app.use(cors())
app.use(express.json())
app.use(express.static("uploads"))

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/dist')));
/* MiddleWare Ends here */

// A configuration of Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/mariecurie/Desktop/blip/uploads') // folder to store uploaded files
  },
  fileame: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
});
const upload = multer({ storage })
await dbClient.run()

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
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT)
})
