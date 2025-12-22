import { QuizGenerator } from "./BaseQuiz.js";

export class AIQuizGenerator extends QuizGenerator{

    constructor(questionFactory, formBuilder, json_obj){
        super(questionFactory, formBuilder);
        this.json_obj = json_obj;
    }

    
    parse_questions(){
        const quizRaw = this.json_obj.map(question => {
            let options = [];
            if("opts" in question){
                Object.values(question.opts).forEach(value => {
                    options.push(value);
                });
            }
            return { type: question.type, text: question.q_text, options: options, img_src:null, ans: question.expl };
        });
        return quizRaw;
    }
    

    createQuizObjects(quizRaw){
        let quizObjects;
        console.log(typeof(this.QuestionFactory));
        console.log(typeof(this.builder));
        quizObjects = quizRaw.map((q, i) => {
            return this.QuestionFactory.create(i, q.type, q.text, q.options, q.img_src);
        });
        return quizObjects;
    }

    selectFormQuestions(quizObjects){
        quizObjects.forEach(q => this.builder.addQuestion(q));
        // const quizHtml = this.builder.build();
        const quizHtml = this.builder.addSimilarQuizButton().build();
        return quizHtml;
    }
}
