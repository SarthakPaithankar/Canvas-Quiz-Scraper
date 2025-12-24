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
        document.getElementById("addKey").addEventListener("click", () => this.handleAddingKey());
    }

    async getTabId() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }

    async handleGenerateQuiz(quizType){
        let tab = await this.getTabId();
        
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
                const factoryInstance = new QuestionFactoryModule.QuestionFactory();

                const activeQuizFlag = document.getElementById("quiz-submission-version-table");

                if(activeQuizFlag){
                    alert("Uh-oh looks like you haven't finished your quiz yet!");
                    return;
                }
                
                if(type === "mcq"){
                    generatorClass = McqGeneratorImport.McqGenerator; 
                }else if(type === "text"){
                    generatorClass = WrittenGeneratorImport.TextGenerator;
                }else{ 
                    generatorClass = FullQuizGeneratorImport.FullQuizGenerator;
                }
                
                const generator = new generatorClass(factoryInstance, builderInstance);
                generator.generateQuiz();  
            }
        });
    }

    async handleAddingKey(){
        const tab = await this.getTabId();
        chrome.scripting.executeScript({
            target: { tabId: tab.id},
            func: async() => {
                const KeycontrollerModule = await import(chrome.runtime.getURL("classes/Controller/KeyController.js"));
                const geminiPage = await import(chrome.runtime.getURL("classes/aiClass/GeminiKeyPage.js"));
                const KeycontrollerObject = new KeycontrollerModule.KeyController();
                const geminiPageObject = new geminiPage.GeminiKeyPage(KeycontrollerObject);
                geminiPageObject.createPage(KeycontrollerObject);
            }
        })
    }
}