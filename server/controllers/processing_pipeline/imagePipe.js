import GoogleGemeni from '../googleGemeniController.js'
import 'dotenv/config';


class ImagePipe { 
  static async fetchImageValidity(req, res) {
    const IMAGE_KEY = process.env.GOOGLE_GEMENI_API_KEY_IMAGE
    console.log(IMAGE_KEY)
    await GoogleGemeni.imageUnderstanding(IMAGE_KEY, req.file.path, req.file.originalname, req.file.mimetype);
    console.log(req.file)
  }
}

export default ImagePipe;