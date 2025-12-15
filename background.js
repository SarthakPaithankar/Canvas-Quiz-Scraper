import { GoogleGenAI } from "@google/genai";
import { GeminiService } from "./classes/aiClass/gemini";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type === "SAVE_GEMINI_KEY"){
        try{
            chrome.storage.local.set({ geminiApiKey: request.apiKey }, () => {
                console.log(request.apiKey);
                sendResponse({ status: "Success" });
            });
        }catch{
            console.log("Failed to dave the API KEY");
            sendResponse({ status: "Failed", message: "Failed to save the API Key :(" });
        }
        return true;
    }

    if(request.action === 'askAI'){
        chrome.storage.local.get("geminiApiKey", async ({ geminiApiKey }) => {
            if(!geminiApiKey){
                sendResponse({ success: false, error: "No API Key found." });
                return;
            }
            try{
                const ai = GeminiService.getInstance(geminiApiKey);
                const response = await ai.handleGeminiQuery(request.prompt);
                sendResponse({ success: true, result: response });
            }catch (error){
                sendResponse({ success: false, error: error.message });
            }
        });
        return true;
    }
});