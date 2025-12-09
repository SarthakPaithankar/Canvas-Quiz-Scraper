import { GoogleGenAI } from "@google/genai";
export class GeminiService {
    constructor(apiKey) {
        this.ai = new GoogleGenAI({ apiKey: apiKey });
        this.modelName = "gemini-2.5-flash";
    }

    async handleGeminiQuery(prompt) {
        try {
            const response = await this.ai.models.generateContent({
                model: this.modelName,
                contents: prompt,
            });
            return response.text;
        } catch (error) {
            console.error("Gemini Background API Error:", error);
            return `Error: ${error.message}`;
        }
    }
}