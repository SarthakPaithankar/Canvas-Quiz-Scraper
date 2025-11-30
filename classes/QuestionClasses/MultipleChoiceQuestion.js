import { Question } from "./Question.js";
export class MultipleChoiceQuestion extends Question {
    constructor(text, options) {
      super(text);
      this.options = options;
    }
  
    render() {
      return `
        <div class="question">
          <p><strong>${this.text}</strong></p>
          ${this.options.map(o => `
            <label><input type="radio" name="${this.text}" value="${o}">${o}</label><br>
          `).join("")}
        </div>
      `;
    }
}