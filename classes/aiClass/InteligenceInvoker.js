export class inteligenceInvoker{
    constructor(){}
    async runCommand(command){
        const response = await command.execute();
        return response;
    }
}