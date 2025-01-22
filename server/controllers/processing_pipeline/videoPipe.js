import GoogleGemeni from '../googleGemeniController.js'
import ffmpeg from 'fluent-ffmpeg'
import dotenv from 'dotenv';
dotenv.config();


class VideoPipe {
  static async fetchVideoValidity(req, res) {
    const VIDEO_KEY = process.env.GOOGLE_GEMENI_API_KEY_VIDEO
    console.log(VIDEO_KEY)
    const videoLength = new Promise((resolve, reject) => {
      const videoMeta =ffmpeg.ffprobe(req.file.path, (err, metadata) => {
        if(err){reject('Missing a valid video')}
        else {
          const duration = Math.floor(metadata.format.duration / 60);
          if(duration > 90){reject('Video Length is Greater than 90 Mins.')}
          resolve(duration);
        }
      })
    })
    videoLength.then((duration) => {console.log('Length of video is: ', duration);})
    videoLength.catch((err)=>{console.log(err)})
    const gemeniResponse = await GoogleGemeni.imageUnderstanding(VIDEO_KEY, req.file.path, req.file.originalname, req.file.mimetype);
    res.status(200).json({data:gemeniResponse})
    console.log(req.file)
  }
}

export default VideoPipe;
