import { askAICommand } from "../aiClass/AITextCommand.js"
import { inteligenceInvoker } from "../aiClass/InteligenceInvoker.js";
import { QuizGenerator } from "../QuizClass/BaseQuiz.js"
// import { QuestionFactory } from "../QuestionClasses/QuestionFactory.js";
// import { FormBuilder } from "../FormClasses/FormBuilder.js";
// import { AIQuizGenerator } from "../QuizClass/AIGeneratedQuiz.js";

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
        console.log(quizBody)
        const action = "askAIJson";
        const elements = quizBody.querySelectorAll(`.question`);
        let questions = [];
        let options = [];
        elements.forEach((element, i) => {
            const questionTextEl = element.querySelector(".questionText");
            if (questionTextEl) {
                const text = questionTextEl.textContent;
                questions.push((i, text));
            }
        })
        const questionText = JSON.stringify(questions);

        const prompt = `You are a rigorous educational assistant specializing in generating high-quality, conceptual quiz questions. 
                Generate a quiz based on the following material. Adhere strictly to the provided response schema.
                Here are each of the questions ${questionText}. make them another quiz to help them prepare. The Number as
                Make sure these questions help them gain a DEEPER understanding of the subject. CONSTRAINTS: 1. Generate exactly 1 question. 
                2. The Questions can either be MCQ or a short answer. 3. Every question must have one (1) correct answer and a brief, 
                1-2 sentence explanation of the correct answer.`
         
        const response = await this.askAI(action, prompt);

        // const questionFactory = new QuestionFactory();
        // const formBuilder = new FormBuilder();

        // const aIQuizGenerator = new AIQuizGenerator(questionFactory, formBuilder, response);

        console.log(response);
    }
}

