import GoogleGemeni from '../googleGemeniController.js'
import 'dotenv/config';


class VideoPipe { 
  static async fetchVideoValidity(req, res) { 
    const VIDEO_KEY = process.env.GOOGLE_GEMENI_API_KEY_VIDEO
    console.log(VIDEO_KEY)
    await GoogleGemeni.imageUnderstanding(VIDEO_KEY, req.file.path, req.file.originalname);
    console.log(req.file)
  }
}

export default VideoPipe;