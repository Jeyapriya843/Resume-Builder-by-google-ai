import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure API_KEY is set in environment

export const generateResumeSummary = async (
  jobTitle: string,
  skills: string[],
  experienceYears: string = "some"
): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key not found. Returning mock response.");
    return `Highly motivated ${jobTitle} with ${experienceYears} years of experience. Proven track record in ${skills.join(', ')}. Committed to delivering high-quality results and driving business success.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";
    const prompt = `Write a professional, ATS-friendly resume summary (approx 50-70 words) for a ${jobTitle} with experience in ${skills.join(', ')}. Use a professional tone.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please try again.";
  }
};