export class PracticeQuizController{

    constructor(quizWindow) {
        this.quizWindow = quizWindow;
    }

    initEventListeners() {
        const quizBody = this.quizWindow.document.body;

        quizBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('ask-ai-button')) {
                this.handleAI(event.target);
            }
        });
    }

    async handleAI(element){
        const questionId = element.dataset.questionId;
        const questionContainer = this.quizWindow.document.getElementById(questionId);
        
        const questionText = questionContainer.querySelector(".questionText").textContent;
        const optionsText = questionContainer.querySelector(".options").textContent;

        var aiDiv = this.createDiv(questionContainer);

        const prompt = `Please answer this multiple choice question based on the provided Question ${questionText}. 
                        and options ${optionsText}. Multiple answers may be correct.`;
        this.sendMessage(prompt, aiDiv)
    }

    createDiv(questionContainer){
        let aiDiv = questionContainer.querySelector('.ai-response-box');
        if(!aiDiv){
            aiDiv = this.quizWindow.document.createElement('div');
            aiDiv.className = 'ai-response-box';
            questionContainer.appendChild(aiDiv);
        }
        aiDiv.innerHTML = "<strong>AI is thinking</strong>";
        return aiDiv;
    }

    async sendMessage(prompt, aiDiv){
        try{
            const response = await chrome.runtime.sendMessage({
                action: 'askAI', 
                prompt: prompt
            });

            if(response.success){
                const formattedResult = response.result.replace(/\n/g, '<br>');
                aiDiv.innerHTML = `<strong>AI Hint:</strong><br>${formattedResult}`;
            }else{
                aiDiv.innerHTML = `<strong>Error: ${response.error}</strong>`;
            }

        }catch (error) {
            console.error(error);
            if (aiDiv) aiDiv.innerHTML = `<strong>Could not connect to AI service.</strong>`;
        }
    }
}