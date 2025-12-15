import { Question } from "./Question.js";
export class TextQuestion extends Question {
  constructor(text, image){
    super(text);
    this.image = image;
  }
  render() {
    return `
      <div class="question">
        <p><strong>${this.text}</strong></p>
        ${this.images ? `<img src="${this.image}" alt="">`:""}
        <img ></img>
        <input type="text" name="${this.text}">
      </div>
    `;
  }
}