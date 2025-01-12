import multer from 'multer'

// A configuration of Multer
// In this script i handle the upload and Verfication of each file uploaded
// 
// 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/mariecurie/Desktop/blip/blip-backend/uploads') // folder to store uploaded files
  },
  fileame: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
});
const upload = multer({ storage })