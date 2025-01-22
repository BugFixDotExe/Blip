import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

class GoogleGemeni {

  static async imageUnderstanding(key, filePath, fileName, mime) {
    try {
      let prompt;
      const fileManager = new GoogleAIFileManager(key);
      const genAI = new GoogleGenerativeAI(key);
      console.log(mime)
      const uploadResult = await fileManager.uploadFile(
        `${filePath}`,
        {
          mimeType: mime,
          displayName: `${fileName}`,
        },
      );
      const name = uploadResult.file.name
      let file = await fileManager.getFile(name)
      while (file.state === FileState.PROCESSING) { 
        process.stdout.write('.')
        // sleep for 10 sec
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        // fetch the file from API agai
        file = await fileManager.getFile(name)
      }
      if (file.state === FileState.FAILED) { throw new Error('Video processsing failed'); }
      // When file.state is ACTIVE, the file is ready to be used for inference.
      console.log(`File ${file.displayName} is ready for inference as ${file.uri}`);
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
      if (mime.split('/')[0] === 'image') { prompt=
        `prompt_for_thumbnail_guideline_check:
        "instructions": "Analyze the provided image for both content compliance with YouTube's Community Guidelines. Consider context when evaluating potential violations. Return only a JSON structured response as described below.",
        "input_data": {
          "video_url": "[INSERT_VIDEO_URL_HERE]",
          "or": {
            "video_file": "[BASE64_ENCODED_VIDEO_DATA]"
          }
        },
        "response_format": {
          "visual_violations": [
            {
              "start_time": "[START_TIMESTAMP]",
              "end_time": "[END_TIMESTAMP]",
              "violation_type": "[GUIDELINE_VIOLATED - e.g., Nudity or sexual content, Harmful or dangerous content, etc.]",
              "details": "[DETAILED_EXPLANATION_OF_VIOLATION]",
              "suggestions": ["[SUGGESTIONS_FOR_COMPLIANCE - e.g., Blur or remove visual elements, add context, etc.]"]
            }
          ],
          "compliant_overall": "[BOOLEAN: True if ENTIRE video is compliant, False if ANY violations are found]"
        }
      },`
        }
      if (mime.split('/')[0] === 'video') { prompt=
        `prompt_for_video_community_guidelines": {
        "instructions": "Analyze the provided video for both audio and visual content compliance with YouTube's Community Guidelines. Consider context when evaluating potential violations. Return only a JSON structured response as described below.",
        "input_data": {
        "video_url": "[INSERT_VIDEO_URL_HERE]",
        "or": {
        "video_file": "[BASE64_ENCODED_VIDEO_DATA]"
        }
        },
        "response_format": {
        "audio_violations": [
        {
        "start_time": "[START_TIMESTAMP]",
        "end_time": "[END_TIMESTAMP]",
        "transcript": "[TRANSCRIPT_OF_VIOLATING_AUDIO]",
        "violation_type": "[GUIDELINE_VIOLATED - e.g., Hate speech, Harassment, etc.]",
        "details": "[DETAILED_EXPLANATION_OF_VIOLATION]",
        "suggestions": ["[SUGGESTIONS_FOR_COMPLIANCE - e.g., Remove audio, bleep the words, add context, etc.]"]
        }
        ],
        "visual_violations": [
        {
        "start_time": "[START_TIMESTAMP]",
        "end_time": "[END_TIMESTAMP]",
        "violation_type": "[GUIDELINE_VIOLATED - e.g., Nudity or sexual content, Harmful or dangerous content, etc.]",
        "details": "[DETAILED_EXPLANATION_OF_VIOLATION]",
        "suggestions": ["[SUGGESTIONS_FOR_COMPLIANCE - e.g., Blur or remove visual elements, add context, etc.]"]
        }
        ],
        "compliant_overall": "[BOOLEAN: True if ENTIRE video is compliant, False if ANY violations are found]"
        }
        },
        `}
      // Generate content
      const result = await model.generateContent([
        {
          fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType,
          },
        },
        { text: prompt},
      ]);

      // Log or return the result
      const response  = result.response.text()
      // Step 1: Extract the JSON part using regex
      const jsonMatch = response.match(/```json([\s\S]*?)```/);
      
      if (jsonMatch && jsonMatch[1]) {
        // Step 2: Parse the extracted JSON
        const jsonString = jsonMatch[1].trim();
        try {
          const geminiJSONResponse = JSON.parse(jsonString);
          // Alternatively, you can log individual properties to check their contents:
          console.log('supposed json obj', geminiJSONResponse);
          return geminiJSONResponse
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      } else {
        console.error("JSON not found in the response.");
      }
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }
}

export default GoogleGemeni;
