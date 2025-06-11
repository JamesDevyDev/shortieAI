import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    const body = await req.json()

    const { tone, genre, sceneCount, imageStyle } = body

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const contents = `Create a ${tone} ${genre} story with ${sceneCount} scenes. The image style should be "${imageStyle}".

The main character should have consistent visual features across all scenes, including short brown hair, green eyes, and wearing a red jacket and jeans. Each image prompt must describe the character with these traits consistently, maintaining the same style, colors, and outfit.

Each scene should be one concise paragraph, around 2-3 sentences max, suitable for short video captions or reels.

Return the response as a valid JSON object structured like this:

{
  "title": "Story Title",
  "scenes": [
    {
      "sceneNumber": 1,
      "text": "Short, impactful paragraph for scene 1.",
      "imagePrompt": "A vivid but concise visual description for scene 1, perfect for AI image generation in 9:16 vertical format, high resolution."
    },
    {
      "sceneNumber": 2,
      "text": "Short, impactful paragraph for scene 2.",
      "imagePrompt": "A vivid but concise visual description for scene 2, optimized for high-res vertical videos."
    }
    // ... continue for remaining scenes
  ]
}

Strict instructions:
- Each 'text' should be short and engaging (2-3 sentences).
- Each 'imagePrompt' must describe a clear visual, suitable for high-resolution AI image generation.
- Images should be optimized for 9:16 vertical aspect ratio (like TikTok/Instagram Shorts), mobile screen, and visually striking.
- Avoid explanations, Markdown, or long narratives.
- Return raw, valid JSON only.`;

        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: contents }] }],
        });

        const storyText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!storyText) throw new Error("No story generated");

        const cleaned = storyText.replace(/```json\n?|```/g, "").trim();
        let storyData;

        try {
            storyData = JSON.parse(cleaned);
        } catch (error) {
            throw new Error("Failed to parse JSON from model");
        }
        const origin = req.headers.get("origin");

        // Fetch an image for each scene
        const imageFetchPromises = storyData.scenes.map(async (scene: any) => {
            try {
                const res = await fetch(`${origin}/api/gen-img`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ prompt: scene.imagePrompt })
                });

                if (res.ok) {
                    const { imageUrl } = await res.json();
                    scene.image = imageUrl;
                } else {
                    scene.image = null;
                    console.error(`Failed to fetch image for scene ${scene.sceneNumber}`);
                }
            } catch (err) {
                scene.image = null;
                console.error(`Error fetching image for scene ${scene.sceneNumber}:`, err);
            }
        });

        await Promise.all(imageFetchPromises);


        return NextResponse.json(storyData);
    } catch (error) {
        console.error("Error generating story:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
