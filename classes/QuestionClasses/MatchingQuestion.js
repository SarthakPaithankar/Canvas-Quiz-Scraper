import { Question } from "./Question.js";
export class MatchingQuestion extends Question{
    render() {
        return `
          <div class="question">
            <p><strong>MATCHING QUESTIONS ARE NOT Supported</strong></p><br>
          </div>
        `;
      }
}