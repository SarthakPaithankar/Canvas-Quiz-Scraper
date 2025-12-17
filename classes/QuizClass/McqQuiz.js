import { QuizGenerator } from './BaseQuiz.js';
import { MultipleChoiceQuestion } from '../QuestionClasses/MultipleChoiceQuestion.js';

export class McqGenerator extends QuizGenerator {
    selectFormQuestions(quizObjects) {
        quizObjects.forEach(q => {
                if(q instanceof MultipleChoiceQuestion) {
                    this.builder.addQuestion(q);
                }
            }
        )
        const formHTML = this.builder.addSimilarQuizButton().build();
        return formHTML;
    };
}