import { Question } from "./Question.js";
export class MultipleChoiceQuestion extends Question {
    constructor(questionNumber, text, options) {
      super(text);
      this.options = options;
      this.questionID = questionNumber;
    }
  
    render() {
      return `
        <div class="question" id=${this.questionID}>
          <p class="questionText"><strong>${this.text}</strong></p>
          <div class="options">
            ${this.options.map(o => `
              <label><input type="checkbox" name="${this.text}" value="${o}">${o}</label><br>
            `).join("")}
          </div>
          <button type="button" class="ask-ai-button" data-question-id=${this.questionID}>Ask AI</button>
        </div>
      `;
    }
}