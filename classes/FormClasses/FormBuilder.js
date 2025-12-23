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
    this.html += `<button type="button" class="similar_quiz">Make a Similar Quiz</button>`;
    return this;
  }

  build() {
    return this.html + `
        <a href="path_to_file" download="proposed_file_name">Download</a>
      </form>
    `;
  }
}
