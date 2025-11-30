//OBSERVER PATTERN
export class QuizAppController {
    constructor(quizGeneratorClass, dependencies) {
        this.GeneratorClass = quizGeneratorClass;
        this.dependencies = dependencies; 
    }

    
    initEventListeners() {
        document.getElementById("run").addEventListener("click", () => this.handleGenerateQuiz('all'));
        document.getElementById("runMcq").addEventListener("click", () => this.handleGenerateQuiz('mcq'));
        document.getElementById("runText").addEventListener("click", () => this.handleGenerateQuiz('text'));
    }

    async handleGenerateQuiz(quizType) {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const quizRegex = /https:\/\/canvas.*\.edu\/courses\/\d+\/quizzes\/\d+/;

        if (!quizRegex.test(tab.url)) {
            alert("This is not a Canvas quiz page.");
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            args: [quizType], 
            func: async (type) => { 
                const QuestionFactoryModule = await import(chrome.runtime.getURL("classes/QuestionClasses/QuestionFactory.js"));
                const FormBuilderModule = await import(chrome.runtime.getURL("classes/FormClasses/FormBuilder.js"));
                const FullQuizGeneratorImport = await import(chrome.runtime.getURL("classes/QuizClass/FullQuiz.js"));
                const McqGeneratorImport = await import(chrome.runtime.getURL("classes/QuizClass/McqQuiz.js"));
                const WrittenGeneratorImport = await import(chrome.runtime.getURL("classes/QuizClass/WrittenQuiz.js"));
                
                let generatorClass;
                
                const builderInstance = new FormBuilderModule.FormBuilder();
                
                if(type === "mcq"){
                    generatorClass = McqGeneratorImport.McqGenerator; 
                } else if(type === "text"){
                    generatorClass = WrittenGeneratorImport.TextGenerator;
                }else { 
                    generatorClass = FullQuizGeneratorImport.FullQuizGenerator;
                }
                
                const generator = new generatorClass(QuestionFactoryModule, builderInstance);
                generator.generateQuiz();
                
            }
        });
    }
}