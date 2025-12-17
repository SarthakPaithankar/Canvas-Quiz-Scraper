import { GeminiService } from "./classes/aiClass/gemini.js";
import { QuizGenerator } from "./classes/QuizClass/BaseQuiz.js"; 
async function testGemini(){
    const GEMINI_API_KEY = "fakeKey"; 
    const ai = GeminiService.getInstance(GEMINI_API_KEY);

    var response = await ai.handleGeminiQuery("Hello");
    console.assert(response.includes("Error: "))
}

function testJson(){
    const obj3 = {
        "text": "{\n  \"quiz\": [\n    \"{\\\"question_type\\\": \\\"MCQ\\\", \\\"question_text\\\": \\\"An AI agent is considered rational if it performs the 'right' action to achieve its goals. Which of the following statements best elaborates on what 'right' means for a rational agent?\\\", \\\"options\\\": {\\\"A\\\": \\\"The action that guarantees the absolute best possible outcome, regardless of any uncertainty or incomplete information.\\\", \\\"B\\\": \\\"The action that maximizes its expected performance measure, based on its current percepts and internal knowledge.\\\", \\\"C\\\": \\\"The action that is most logically sound and adheres to predefined rules, even if it doesn't lead to the best practical outcome.\\\", \\\"D\\\": \\\"The action that requires the least computational effort, ensuring fast decision-making.\\\"}, \\\"correct_answer\\\": \\\"B\\\", \\\"explanation\\\": \\\"Rationality in AI agents means choosing actions that maximize their expected utility or performance measure, given the information they have access to at the moment. It does not imply omniscience or the ability to guarantee the best outcome in uncertain environments, but rather making the best possible decision under current circumstances.\\\"}\"\n  ]\n}"
    }
    const json_obj = JSON.parse(obj3.text);
    const json_question = JSON.parse(json_obj.quiz[0]);
    QuizGenerator.parseJsonQuestions(json_question);
}
testJson();
// testGemini();
