
import { GoogleGenAI, Modality } from "@google/genai";

export async function removeBackground(base64ImageData: string, mimeType: string): Promise<string> {
  // Do not instantiate this outside of the function, in case the API key is rotated.
  // This is especially important for long-lived apps.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: 'Remove the background from this image. The output should be a PNG with a transparent background.',
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });
  
  // The API returns a single image part in the first candidate's content.
  const imagePart = response.candidates?.[0]?.content?.parts?.[0];

  if (imagePart && imagePart.inlineData) {
    return imagePart.inlineData.data;
  }

  throw new Error("Could not extract image data from Gemini response.");
}
