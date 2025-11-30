//Factory Pattern
import { MatchingQuestion } from "./MatchingQuestion.js";
import { TextQuestion } from "./TextQuestion.js"
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion.js"

export class QuestionFactory {
    static create(type, text, options) {
        switch(type){
            case "text":
                return new TextQuestion(text)
            case "matching":
                return new MatchingQuestion(text)
            case "mcq":
                return new MultipleChoiceQuestion(text, options)
            default:
                return new MatchingQuestion(text)
        }
    }
}