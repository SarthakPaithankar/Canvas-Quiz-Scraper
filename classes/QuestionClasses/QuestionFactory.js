//Factory Pattern
import { MatchingQuestion } from "./MatchingQuestion.js";
import { TextQuestion } from "./TextQuestion.js"
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion.js"

export class QuestionFactory {
    static create(i, type, text, options, images) {
        switch(type){
            case "text":
                return new TextQuestion(text)
            case "matching":
                return new MatchingQuestion(text)
            case "mcq":
                return new MultipleChoiceQuestion(i, text, options, images)
            default:
                return new MatchingQuestion(text)
        }
    }
}