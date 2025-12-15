import { GoogleGenAI } from "@google/genai";
import { GeminiService } from "./classes/aiClass/gemini";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background:", request); // Check if this hits

    if(request.type === "SAVE_GEMINI_KEY"){
        try{
            chrome.storage.local.set({ geminiApiKey: request.apiKey }, () => {
                console.log(request.apiKey);
                sendResponse({ status: "success" });
            });
        }catch{
            console.log("couldn't save");
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