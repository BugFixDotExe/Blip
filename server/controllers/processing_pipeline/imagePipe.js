import GoogleGemeni from '../googleGemeniController.js'
import 'dotenv/config';


class ImagePipe { 
  static async fetchImageValidity(req, res) {
    console.log(req.headers)
    console.log(process.env)
    const IMAGE_KEY = process.env.GOOGLE_GEMENI_API_KEY_IMAGE
    console.log(IMAGE_KEY)
    const gemeniResponse = await GoogleGemeni.imageUnderstanding(IMAGE_KEY, req.file.path, req.file.originalname, req.file.mimetype);
    console.log(req.file)
    res.status(200).json({data: gemeniResponse})
  }
}

export default ImagePipe;
