import { QuizGenerator } from "./BaseQuiz.js";

export class AIQuizGenerator extends QuizGenerator{

    constructor(questionFactory, formBuilder, json_obj){
        super(questionFactory, formBuilder);
        this.json_obj = json_obj;
    }

    parse_questions(){
        let options = [];
        let type;
        let text;
        let img_src;
        try{
            type = this.json_obj.question_type;
            text = this.json_obj.question_text;
            img_src = null;
            if("options" in this.json_obj){
                Object.values(this.json_obj.options).forEach(value => {
                    options.push(value);
                });
            }
        }catch (error){
            console.log(`Error: ${error}`);
        }
        
        return [{ type, text, options, img_src }];
    }

    createQuizObjects(quizRaw){
        let quizObjects;
        quizObjects = quizRaw.map((q, i) => {
            return this.QuestionFactory.create(i, q.type, q.text, q.options, q.img_src);
        });
        return quizObjects;
    }

    selectFormQuestions(quizObjects){
        quizObjects.forEach(q => this.builder.addQuestion(q));
        const quizHtml = this.builder.build();
        // const quizHtml = this.builder.addSimilarQuizButton().build();
        return quizHtml;
    }
}