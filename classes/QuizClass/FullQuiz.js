import { QuizGenerator } from './BaseQuiz.js';

export class FullQuizGenerator extends QuizGenerator {
    selectFormQuestions(quizObjects) {
        quizObjects.forEach(q => this.builder.addQuestion(q));
        const formHTML = this.builder.addSimilarQuizButton().build();
        return formHTML;
    }
}
