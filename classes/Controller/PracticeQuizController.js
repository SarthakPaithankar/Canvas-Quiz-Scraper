import { askAICommand } from "../aiClass/AITextCommand.js"
import { inteligenceInvoker } from "../aiClass/InteligenceInvoker.js";
import { QuizGenerator } from "../QuizClass/BaseQuiz.js"
import { QuestionFactory as qfact } from "../QuestionClasses/QuestionFactory.js";
import { FormBuilder } from "../FormClasses/FormBuilder.js";

export class PracticeQuizController {
    constructor(quizWindow) {
        this.quizWindow = quizWindow;
    }

    initEventListeners() {
        const quizBody = this.quizWindow.document.body;

        quizBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('ask-ai-button')) {
                this.getAIHint(event.target);
            }
        });

        quizBody.addEventListener('click', (event) => {
            if (event.target.classList.contains("similar_quiz")) {
                this.createNewQuiz(quizBody);
            }
        })
    }

    async askAI(action, prompt) {
        const AICommand = new askAICommand(prompt, action);
        const Invoker = new inteligenceInvoker();
        const response = await Invoker.runCommand(AICommand);
        return response;
    }

    async getAIHint(element) {
        const action = "askAIText";
        const questionId = element.dataset.questionId;
        const questionContainer = this.quizWindow.document.getElementById(questionId);
        const questionText = questionContainer.querySelector(".questionText").textContent;
        const optionsText = questionContainer.querySelector(".options").textContent;

        var aiDiv = QuizGenerator.createDiv(questionContainer, this.quizWindow);

        const prompt = `Please answer this multiple choice question based on the provided Question ${questionText}. 
                and options ${optionsText}. Multiple answers may be correct.`;
        
        
        const response = await this.askAI(action, prompt);

        QuizGenerator.formatMessage(response, aiDiv)
    }

    async createNewQuiz(quizBody) {
        const { AIQuizGenerator } = await import("../QuizClass/AIGeneratedQuiz.js");
        const action = "askAIText";
        const elements = quizBody.querySelectorAll(`.question`);
        let questions = [];

        elements.forEach((element, i) => {
            const questionTextEl = element.querySelector(".questionText");
            if (questionTextEl) {
                const text = questionTextEl.textContent;
                questions.push((i, text));
            }
        })
        const questionText = JSON.stringify(questions);

        const prompt = `
            You are a rigorous educational assistant specializing in generating high-quality, conceptual quiz questions. 
            TASK:
            Generate exactly 10 questions based on the following text: ${questionText}. 
            The questions must promote a DEEPER understanding by focusing on the application and analysis of the concepts. Avoid simple recall.

            CONSTRAINTS:
            1. Format: Exactly 2 questions.
            2. Type: Can be MCQ (Multiple Choice) or short answer.
            3. JSON Schema: You MUST return a JSON object with this exact structure:
            {
                "quiz": [
                {
                    "q_text": "string",
                    "opts": ["option A", "option B", "option C", "option D"],
                    "ans": "string",
                    "type": "mcq" | "text",
                    "expl": "string"
                }
                ]
            }
            4. For "short_answer", set "opts" to null.
            5. For "mcq", ensure distractors (wrong answers) represent common student misconceptions.
            6. OUTPUT: Return ONLY the JSON object. No markdown blocks, no preamble, no postamble.
        `
         
        const response = await this.askAI(action, prompt);
        
        const builder = new FormBuilder();
        const generator = new AIQuizGenerator(qfact, builder, response);
        generator.generateQuiz();  
    }
}