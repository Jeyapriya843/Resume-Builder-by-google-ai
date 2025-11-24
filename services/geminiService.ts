import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData, initialResumeState } from "../types";

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

export const parseResumeFromText = async (text: string): Promise<Partial<ResumeData>> => {
  if (!apiKey) {
    console.warn("API Key not found. Cannot parse resume.");
    return {};
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model,
      contents: `Parse the following resume text into a structured JSON format. 
      
      Resume Text:
      ${text}
      
      Return a JSON object with this schema:
      {
        "firstName": "string",
        "lastName": "string",
        "jobTitle": "string",
        "email": "string",
        "phone": "string",
        "city": "string",
        "country": "string",
        "summary": "string",
        "experience": [
          {
            "id": "string (unique)",
            "jobTitle": "string",
            "employer": "string",
            "startDate": "string",
            "endDate": "string",
            "location": "string",
            "description": "string (full description)"
          }
        ],
        "education": [
          {
            "id": "string (unique)",
            "school": "string",
            "degree": "string",
            "fieldOfStudy": "string",
            "startDate": "string",
            "endDate": "string",
            "location": "string"
          }
        ],
        "skills": ["string"],
        "projects": [
           {
             "id": "string (unique)",
             "title": "string",
             "link": "string",
             "description": "string",
             "technologies": ["string"]
           }
        ]
      }`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const jsonText = response.text;
    if (!jsonText) return {};
    
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    return {};
  }
};