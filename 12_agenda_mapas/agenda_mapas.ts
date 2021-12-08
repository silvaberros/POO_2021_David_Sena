// MODO INTERATIVO (instalar localmente)
// npm install readline-sync @types/readline-sync @types/node

//importar o pacote
//const readline = require ("readline-sync");

/* TESTE
console.log("Digite o seu nome:")
let nome = readline.question();
console.log("Ola, meu amigo " + nome);
*/

//criar um função com o readline
//let input = (): string => readline.question();
//let write = (x: any) => process.stdout.write("" + x);

class Fone {
    private label: string;
    private fone: string;

    constructor(label: string, fone: string) {
        this.label = this.setLabel(label);
        this.fone = this.setFone(fone);
    }
    
    public toString(): string {
        return "(" + this.label + ")" + " " + this.fone;
    }

    static validate(fone: string): boolean {
        let ok = "0123456789()-.";
        for(let i = 0; i < fone.length; i++){
            if(ok.indexOf(fone[i]) == -1){
                return false;
            }
        }
        return true;
    }


    //SETs e GETs
    public setLabel(label: string): string {
        return label;
    }

    public setFone(fone: string): string {
        return fone;
    }
    public getLabel(){
        return this.label;
    }
    public getFone(){
        return this.fone;
    }    
}

class Contato {
    private id: string;
    private fones: Array<Fone>;

    constructor (id: string, fones: Array<Fone>){
        this.id = id;
        this.fones = [];
        for(let fone of fones){
            this.addFone(fone);            
        }
    }

    public toString(): string {
        return this.id + ": " + this.fones.join(" / ");
    }

    public addFone(fone: Fone){
        let num = fone.getFone();
        if(!Fone.validate(num)){
            console.log ("Fone inválido");
        } else {
            this.fones.push(fone);
        }
    }

    public rmFone(index: number): void {
        this.fones.splice(index);
    }
    public getId(){
        return this.id;
    }
    public getFone(){
        return this.fones;
    }
}

class Agenda {
    contatos: Map<string,Contato>;

    constructor () {
        this.contatos = new Map<string,Contato>();
    }

    public toString(): string {
        let strg = "Contatos: \n"
        for(let value of this.contatos.values()){
            strg += value.toString();
            strg += "\n"
        }
        return strg;
    }
    
    public addContato(contato: Contato): void {
        let nome = contato.getId();
        if(!this.contatos.has(nome)){
            this.contatos.set(nome, contato);
        } else {
            for(let fone of contato.getFone()){
                let cntt = this.contatos.get(nome);
                cntt!.addFone(fone);
            }
        }
    }
    public rmvContato(nome: string): void {
        if(this.contatos.has(nome)){
            this.contatos.delete(nome);
        } else {
            console.log("Contato inexistente")
        }
    }
    public getContato(nome: string): Contato | null {
        if(this.contatos.has(nome)){
            return this.contatos.get(nome)!;
        } else {
            return null;
        }
    }
    public findByPattern(pattern: string): Array<Contato> {
        let result = new Array<Contato>();
        for(let contato of this.contatos.values()){
            if(contato.getId().includes(pattern)){
                result.push(contato);
            }
        }
        return result;
    }
}

let david = new Contato("David", [new Fone("tim", "9921"), new Fone("casa", "3412")]);
let silva = new Contato("Silva", [new Fone("claro", "9443"), new Fone("tim", "9696")]);

let agenda = new Agenda;
agenda.addContato(david);
agenda.addContato(silva);

let teste = agenda.contatos.get("David");
let teste2 = agenda.contatos.get("Silva");

agenda.rmvContato("Silva");
agenda.rmvContato("Alice");

console.log(agenda.toString());
