import { QuizGenerator } from './BaseQuiz.js';
import { TextQuestion } from '../QuestionClasses/TextQuestion.js';

export class TextGenerator extends QuizGenerator {
    selectFormQuestions(quizObjects) {
        quizObjects.forEach(q => {
                if(q instanceof TextQuestion) {
                    this.builder.addQuestion(q);
                }
            }
        )
        const formHTML = this.builder.addSimilarQuizButton().build();
        return formHTML;
    };
}