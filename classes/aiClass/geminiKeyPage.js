
export class GeminiKeyPage{
    constructor(keyController){
        this.keyControllerObject = keyController;
    }
    createPage(){
        console.log("creating page");
        const geminiTab = window.open("", "_blank");
        const geminUrl = "https://aistudio.google.com/welcome";
        geminiTab.document.write(`
            <html>
                <form>
                    <label for="key">Enter Gemini Key</label><br>
                    <input type="text" id="key">
                    <button class="set" type="button">Set</button>
                </form>
                <a href="${geminUrl}">Click here to get your Free Key</a>
                <p>Your key is stored locally within Chrome and cleared when the extension is removed.</p>
            </html>
        `)
        geminiTab.document.close();
        this.keyControllerObject.initEventListener(geminiTab);
    }
}