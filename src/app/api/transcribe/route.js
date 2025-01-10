"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const formData = await request.formData();
  const audioFile = formData.get("audio"); //Le name est le seul formData

  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY
  );

  // Initialize a Gemini model appropriate for your use case.
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  try {
    // Generate content using a prompt and the metadata of the uploaded file.
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/wav", //wav est le type dans le Frontend
          data: audioFile,
        },
      },
      { text: "Please transcribe the audio." },
    ]);

    return Response.json({ result: result.response.text() });
  } catch (error) {
    return Response.json({ error });
  }
}
