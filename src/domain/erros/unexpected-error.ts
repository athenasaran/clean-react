export class UnexpectedError extends Error {
    constructor(){
       super('Algo de errado aconteceu. Tente em breve.')
       this.name = 'UnexpectedError' 
    }
}