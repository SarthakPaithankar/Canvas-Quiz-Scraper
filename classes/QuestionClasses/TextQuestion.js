import { Question } from "./Question.js";
export class TextQuestion extends Question {
    render() {
      return `
        <div class="question">
          <p><strong>${this.text}</strong></p>
          <input type="text" name="${this.text}">
        </div>
      `;
    }
}