export class KeyController{
    constructor(){}
    
    initEventListener(geminiWindow){
        console.log("setting listener");
        const keyWindowBody = geminiWindow.document.body;
        keyWindowBody.addEventListener('click', (event) => {
            if(event.target.classList.contains('set')){
                console.log("found a event");
                this.setKey(geminiWindow);
            }
        });
    }

    setKey(geminiWindow){
        const keyField = geminiWindow.document.getElementById("key");
        const key = keyField.value.trim();
        chrome.runtime.sendMessage({
            type: "SAVE_GEMINI_KEY",
            apiKey: key
        }, (response) => {
            if(response.status == "Success"){
                geminiWindow.alert("Success! You can close the window now");
            }else{
                geminiWindow.alert("Failed to save the API Key");
            }
        });

    }
}