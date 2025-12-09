// SINGLETON PATTERN
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
    static instance = null;

    constructor(apiKey) {
        if (GeminiService.instance) {
            return GeminiService.instance;
        }
        this.ai = new GoogleGenAI({ apiKey });
        this.modelName = "gemini-2.5-flash";
        GeminiService.instance = this;
    }

    static getInstance(apiKey) {
        if (!GeminiService.instance) {
            GeminiService.instance = new GeminiService(apiKey);
        }
        return GeminiService.instance;
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
