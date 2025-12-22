//TEMPLATE PATTERN
import {PracticeQuizController} from "../Controller/PracticeQuizController.js"
export class QuizGenerator{

    constructor(QuestionFactory, FormBuilder){
        console.log("Passed in Parent:", QuestionFactory);
        this.QuestionFactory = QuestionFactory;
        this.builder = FormBuilder;
    }

    generateQuiz(){

        const parsedRawQuiz = this.parse_questions()
       
        const objectifiedQuiz = this.createQuizObjects(parsedRawQuiz)

        const finalQuizHTML = this.selectFormQuestions(objectifiedQuiz)

        const newWindow = this.openWindow(finalQuizHTML)
        
        const pracQuizController = new PracticeQuizController(newWindow);
        pracQuizController.initEventListeners();
    }

    parse_questions(){
        const questionEls = [...document.querySelectorAll(".question")];
        const quizRaw = questionEls.map(question => {
            const qEl = question.querySelector(".question_text");
            const text = qEl.innerText.trim();

            let type = "matching";
            const isEssay = question.classList.contains("essay_question");
            const isMatching = question.classList.contains("matching_question");
            const isDropdown = question.classList.contains("multiple_dropdowns_question");
            const answersEl = question.querySelector(".answers");
            const images = question.querySelector(".question_text.user_content.enhanced img");
            const img_src = images ? images.src : null;
            let options = [];

            if (!isEssay && answersEl) {
                type = "mcq";
                options = answersEl.innerText.trim().split("\n");
            }
            if (isEssay) type = "text";
            if (isMatching || isDropdown) type = "matching"
            return { type, text, options, img_src};
        });
        return quizRaw
    }

    // static parseJsonQuestions(json_obj){
    //     const quizRaw = json_obj.map(question => {
    //         let options = [];
    //         if("opts" in question){
    //             Object.values(question.opts).forEach(value => {
    //                 options.push(value);
    //             });
    //         }
    //         return { type: question.type, text: question.q_text, options: options, img_src:null, ans: question.expl };
    //     });
    //     return quizRaw;
    // }

    createQuizObjects(quizRaw){
        let quizObjects;
        quizObjects = quizRaw.map((q, i) =>
            this.QuestionFactory.create(i, q.type, q.text, q.options, q.img_src)
        );
        return quizObjects;
    }

    selectFormQuestions(quizObjects){
        throw new Error("Method must be implemented by the concrete subclass.");
    }

    openWindow(formHTML){
        const newTab = window.open("", "_blank");
        newTab.document.write(`
            <html>
                <head><title>Retake Quiz</title></head>
                <body>${formHTML}</body>
            </html>
        `);
        newTab.document.close();
        return newTab;
    }

    static createDiv(questionContainer, quizWindow){
        let aiDiv = questionContainer.querySelector('.ai-response-box');
        if(!aiDiv){
            aiDiv = quizWindow.document.createElement('div');
            aiDiv.className = 'ai-response-box';
            questionContainer.appendChild(aiDiv);
        }
        aiDiv.innerHTML = "<strong>AI is thinking</strong>";
        return aiDiv;
    }

    static formatMessage(response, aiDiv){
        if(response.success){
            const formattedResult = response.result.replace(/\n/g, '<br>');
            aiDiv.innerHTML = `<strong>AI Hint:</strong><br>${formattedResult}`;
            return;
        }
        if(response.error){
            aiDiv.innerHTML = `<strong>Error: ${response.error}</strong>`;
        }else{
            if (aiDiv) aiDiv.innerHTML = `<strong>Could not connect to AI service.</strong>`;
        }
    }

}