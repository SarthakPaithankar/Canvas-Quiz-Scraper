import { QuizGenerator } from "./BaseQuiz.js";

export class AIQuizGenerator extends QuizGenerator{

    constructor(questionFactory, formBuilder, response){
        super(questionFactory, formBuilder);
        this.response = response;
    }

    parse_json(){
        let extracted_json = this.response.result;
        const start = extracted_json.indexOf("{")
        if (start != -1){
            for(let i = extracted_json.length; i > 0; i--){
                if(extracted_json[i] == "}"){
                    extracted_json = extracted_json.substring(start, i+1);
                    break;
                } 
            }
        }
        const json_obj = JSON.parse(extracted_json);
        return json_obj;
    }
    
    parse_questions(){
        const json_obj = this.parse_json();
        const quizRaw = json_obj.map(question => {
            let options = [];
            if("opts" in question && question.opts){
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
        quizObjects = quizRaw.map((q, i) => {
            return this.QuestionFactory.create(i, q.type, q.text, q.options, q.img_src);
        });
        return quizObjects;
    }

    selectFormQuestions(quizObjects){
        quizObjects.forEach(q => this.builder.addQuestion(q));
        const quizHtml = this.builder.addSimilarQuizButton().build();
        return quizHtml;
    }
}
