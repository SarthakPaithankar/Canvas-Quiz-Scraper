//BUILDER PATTERN
export class FormBuilder {
  constructor() {
    this.html = `<form id="myForm">`;
  }

  addQuestion(question){
    this.html += question.render();
    return this;
  }

  addSimilarQuizButton(){
    const blob = new Blob([this.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this.html += `
      <a href="${url}" download="quiz_export.html">Download File</a>
      <button type="button" class="similar_quiz">Make a Similar Quiz</button>
    `;
    return this;
  }

  build() {
    return this.html + `</form>`;
  }
}
