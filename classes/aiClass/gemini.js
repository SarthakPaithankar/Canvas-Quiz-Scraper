// SINGLETON PATTERN
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

    async handleGeminiTextQuery(prompt) {
        console.log("here1");
        try {
            const response = await this.ai.models.generateContent({
                model: this.modelName,
                contents: prompt,
            });
            return response.text;
        }catch(error){
            return `Error: ${error.message}`;
        }
    }

    async handleGeminiJsonQuery(prompt){
        const quizSchema = z.array(z.object({
            qtext: z.string().describe("Text of question"),
            opts: z.array(z.string()).nullable().describe("List of options. Null if type is saq"),
            ans: z.array(z.union([z.string(), z.number()])).describe("Array containing indices or answer text"),
            type: z.preprocess((val) => {
                const lowCaseVal = val.toLowerCase();
                if(lowCaseVal.includes("short") || lowCaseVal.includes("saq")) return "text";
                if(lowCaseVal.includes("multiple") ||  lowCaseVal.includes("mcq")) return "mcq";
                return lowCaseVal;
            }, z.enum(["mcq", "saq"])),
            expl: z.string().describe("1-2 sentence explanation.")
        }));
        try{
            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseJsonSchema: zodToJsonSchema(quizSchema),
                },
            });
            return response;
        }catch(error){
            if (error instanceof z.ZodError) {
                console.error("Zod Validation Error Details:", error);
            } else {
                console.error("Gemini/Execution Error:", error);
            }
            return `Error: ${error}$`;
        }
    }
}
