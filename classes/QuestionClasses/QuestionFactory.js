import { MatchingQuestion } from "./MatchingQuestion.js";
import { TextQuestion } from "./TextQuestion.js"
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion.js"

export class QuestionFactory {
    create(i, type, text, options, images, explanation) {
        switch(type){
            case "text":
                return new TextQuestion(text, images, i, explanation)
            case "matching":
                return new MatchingQuestion(text)
            case "mcq":
                return new MultipleChoiceQuestion(i, text, options, images, explanation)
            default:
                return new MatchingQuestion(text)
        }
    }
}