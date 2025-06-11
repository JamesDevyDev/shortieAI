import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided." }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    if (!response?.candidates || response.candidates.length === 0) {
      return NextResponse.json({ error: "No candidates returned by the model." }, { status: 500 });
    }

    const parts = response.candidates[0].content?.parts || [];

    let base64Image = null;

    for (const part of parts) {
      if (part.inlineData?.data) {
        base64Image = part.inlineData.data;
        break;
      }
    }

    if (!base64Image) {
      return NextResponse.json({ error: "Image generation failed." }, { status: 500 });
    }

    // Upload base64 image to Cloudinary WITHOUT specifying public_id
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: "gemini-images",
        overwrite: true,
        resource_type: "image",
      }
    );

    return NextResponse.json({ imageUrl: uploadResponse.secure_url });

  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
