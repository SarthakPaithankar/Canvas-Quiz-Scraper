import { GeminiService } from "./classes/aiClass/gemini.js";
import {PracticeQuizController} from "./classes/Controller/PracticeQuizController.js"
async function testGemini(){
    const GEMINI_API_KEY = "fakeKey"; 
    const ai = GeminiService.getInstance(GEMINI_API_KEY);

    var response = await ai.handleGeminiQuery("Hello");
    console.assert(response.includes("Error: "))
}

testGemini();
