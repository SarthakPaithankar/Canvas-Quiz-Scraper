export class askAICommand{
    constructor(prompt, action){
        this.prompt = prompt;
        this.AIaction = action;
    }

    async execute(){
        let response;
        try{
            response = await chrome.runtime.sendMessage({
                action: this.AIaction, 
                prompt: this.prompt
            });
        }catch (error) {
            console.log('h1');
            response.success = false;
        }
        return response;
    }
}