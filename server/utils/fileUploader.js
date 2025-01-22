import multer from 'multer'

// A configuration of Multer
// In this script i handle the upload and Verfication of each file uploaded
// 
// 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/mariecurie/Desktop/blip/uploads') // folder to store uploaded files
  },
  fileame: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
});


function extentionChecker(file, cb) {
  const ImageFileTypes = /jpeg|jpg|png|gif|heif|heic|webp|/;
  const VideoFileTypes = /mp4|mpeg|mov|avi|x-flv|mpg|webm|wmv|3gpp/;
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000000}
})

export default upload
