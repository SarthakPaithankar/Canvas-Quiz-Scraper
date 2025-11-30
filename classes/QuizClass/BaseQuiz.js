//TEMPLATE PATTERN
export class QuizGenerator{

    constructor(QuestionFactory, FormBuilder){
        this.QuestionFactory = QuestionFactory;
        this.builder = FormBuilder;
    }

    generateQuiz(){

        const parsedRawQuiz = this.parse_questions()
       
        const objectifiedQuiz = this.createQuizObjects(parsedRawQuiz)

        const finalQuizHTML = this.selectFormQuestions(objectifiedQuiz)

        this.openWindow(finalQuizHTML)

    }

    parse_questions(){
        const questionEls = [...document.querySelectorAll(".question")];
        const quizRaw = questionEls.map(question => {
            const qEl = question.querySelector(".question_text");
            const text = qEl.innerText.trim();

            let type = "matching";
            const isEssay = question.classList.contains("essay_question");
            const isMatching = question.classList.contains("matching_question");
            const answersEl = question.querySelector(".answers");

            let options = [];

            if (!isEssay && answersEl) {
                type = "mcq";
                options = answersEl.innerText.trim().split("\n");
            }
            if (isEssay) type = "text";
            if (isMatching) type = "matching";

            return { type, text, options };
        });
        return quizRaw
    }

    createQuizObjects(quizRaw){
        let quizObjects;
        
        quizObjects = quizRaw.map(q =>
            this.QuestionFactory.QuestionFactory.create(q.type, q.text, q.options)
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
    }

}