import { GoogleGenAI } from "@google/genai";
import { GeminiService } from "./classes/aiClass/gemini";

const GEMINI_API_KEY = "xxxx"; 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const ai = GeminiService.getInstance(GEMINI_API_KEY);
    if (request.action === 'askAI') {
        const isAsync = true;

        ai.handleGeminiQuery(request.prompt).then(response => {
            sendResponse({ success: true, result: response });
        }).catch(error => {
            sendResponse({ success: false, error: error.message });
        });

        return isAsync;
    }
});