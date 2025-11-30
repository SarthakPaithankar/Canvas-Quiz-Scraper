import { QuizAppController } from "./classes/Controller/QuizAppController.js";

document.addEventListener('DOMContentLoaded', () => {

    const controller = new QuizAppController(null, null); 

    controller.initEventListeners(); 

});
