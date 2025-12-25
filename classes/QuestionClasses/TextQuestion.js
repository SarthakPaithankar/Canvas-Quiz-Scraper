import { Question } from "./Question.js";
export class TextQuestion extends Question {
  constructor(text, image, id, explanation){
    super(text);
    this.image = image;
    this.questionID = id;
    this.explanation = explanation;
  }
  render() {
    return `
      <div class="question" id="${this.questionID}">
        <p><strong>${this.text}</strong></p>
        ${this.images ? `<img src="${this.image}" alt="">`:""}
        <img ></img>
        <input type="text" name="${this.text}">
        ${(this.image || this.explanation) ? "" : `<button type="button" class="ask-ai-button" data-question-id="${this.questionID}">Ask AI</button>` }
          ${this.explanation ? `
            <button type="button" class="reveal-answer" data-question-id="${this.questionID}">Reveal Answer</button>
            <div class="explanation" style="display: none;">${this.explanation}</div>
        ` : ""}
      </div>
    `;
  }
}