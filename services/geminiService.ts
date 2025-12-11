
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData, AnalysisResult } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

// Helper to ensure arrays are arrays and not null/undefined
const sanitizeResumeData = (data: Partial<ResumeData>): Partial<ResumeData> => {
  if (!data) return {};
  return {
    ...data,
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
  };
};

// Sub-schemas
const EXPERIENCE_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      jobTitle: { type: Type.STRING },
      employer: { type: Type.STRING },
      startDate: { type: Type.STRING },
      endDate: { type: Type.STRING },
      location: { type: Type.STRING },
      description: { type: Type.STRING },
    },
  },
};

const EDUCATION_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      school: { type: Type.STRING },
      degree: { type: Type.STRING },
      fieldOfStudy: { type: Type.STRING },
      startDate: { type: Type.STRING },
      endDate: { type: Type.STRING },
      location: { type: Type.STRING },
    },
  },
};

const PROJECTS_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING },
      link: { type: Type.STRING },
      description: { type: Type.STRING },
      technologies: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
  },
};

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER, description: "A score from 0-100 based on ATS completeness" },
    summary: { type: Type.STRING, description: "A short critique of the resume" },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    }
  }
};

// Combined Schema
const PARSE_AND_ANALYZE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    resumeData: {
      type: Type.OBJECT,
      properties: {
        firstName: { type: Type.STRING },
        lastName: { type: Type.STRING },
        jobTitle: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        city: { type: Type.STRING },
        country: { type: Type.STRING },
        summary: { type: Type.STRING },
        experience: EXPERIENCE_SCHEMA,
        education: EDUCATION_SCHEMA,
        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
        projects: PROJECTS_SCHEMA,
      },
    },
    analysis: ANALYSIS_SCHEMA
  }
};

export const generateResumeSummary = async (
  jobTitle: string,
  skills: string[],
  experienceYears: string = "some"
): Promise<string> => {
  try {
    const ai = getAiClient();
    if (!ai) return "AI service unavailable (Missing API Key).";

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

export const parseResumeFromText = async (text: string): Promise<{ resumeData: Partial<ResumeData>, analysis: AnalysisResult } | null> => {
  try {
    const ai = getAiClient();
    if (!ai) {
      console.warn("No API Key found, skipping AI parsing.");
      return null;
    }

    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model,
      contents: `Parse the following resume text into a structured JSON format and provide an ATS analysis (score, strengths, weaknesses, suggestions).
      Resume Text:
      ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: PARSE_AND_ANALYZE_SCHEMA,
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    
    const parsed = JSON.parse(jsonText);
    if (parsed && parsed.resumeData) {
      parsed.resumeData = sanitizeResumeData(parsed.resumeData);
    }
    return parsed;
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    return null;
  }
};

export const parseResumeFromImage = async (base64Image: string, mimeType: string): Promise<{ resumeData: Partial<ResumeData>, analysis: AnalysisResult } | null> => {
  try {
    const ai = getAiClient();
    if (!ai) {
      console.warn("No API Key found, skipping AI parsing.");
      return null;
    }

    const model = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Parse this resume image into a structured JSON format and provide an ATS analysis (score, strengths, weaknesses, suggestions). Extract all visible text fields including contact info, experience, education, and skills."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: PARSE_AND_ANALYZE_SCHEMA,
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;

    const parsed = JSON.parse(jsonText);
    if (parsed && parsed.resumeData) {
      parsed.resumeData = sanitizeResumeData(parsed.resumeData);
    }
    return parsed;
  } catch (error) {
    console.error("Gemini Image Parse Error:", error);
    return null;
  }
};
