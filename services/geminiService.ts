
import { GoogleGenAI, Type } from "@google/genai";
import { BrainstormResult } from "../types";

export const brainstormProblem = async (problem: string): Promise<BrainstormResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview";
  
  const prompt = `Act as the GetLiteHub Research Assistant. A user has a research problem: "${problem}". 
  Generate a professional research plan including an innovative solution, a list of technologies to leverage, 
  and a step-by-step collaborative roadmap.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            problem: { type: Type.STRING },
            suggestedSolution: { type: Type.STRING },
            technologies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            collaborativeSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["problem", "suggestedSolution", "technologies", "collaborativeSteps"],
          propertyOrdering: ["problem", "suggestedSolution", "technologies", "collaborativeSteps"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from model");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Request Failed:", error);
    throw error;
  }
};

export const suggestTopics = async (interests: string): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const prompt = `Based on the following interests: "${interests}", suggest 5 unique, modern, and specific research topics. 
  Return the result as a simple JSON array of strings. Each string should be a compelling research title.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Topic Suggestion Failed:", error);
    return [];
  }
};

export const generateFramework = async (problem: string): Promise<{methodology: string, phases: {title: string, details: string}[]}> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview";
  
  const prompt = `Provide a structured research methodology framework for the problem: "${problem}". 
  Include a high-level methodology description and 4 distinct phases with titles and specific details.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            methodology: { type: Type.STRING },
            phases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  details: { type: Type.STRING }
                },
                required: ["title", "details"]
              }
            }
          },
          required: ["methodology", "phases"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");
    return JSON.parse(text);
  } catch (error) {
    console.error("Framework Generation Failed:", error);
    throw error;
  }
};
