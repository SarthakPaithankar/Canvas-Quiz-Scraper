//BUILDER PATTERN
export class FormBuilder {
    constructor() {
      this.html = `<form id="myForm">`;
    }
  
    addQuestion(question) {
      this.html += question.render();
    }
  
    build() {
      return this.html + `<button>Submit</button></form>`;
    }
}