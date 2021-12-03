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
    protected prefix = "-";

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
     private contatos: Array<Contato>;

    constructor () {
        this.contatos = new Array<Contato>();
    }

    toString(): string {
        return this.contatos.join("\n");
    }
    
    private posNome(nome: string): any {
        for(let i = 0; i < this.contatos.length; i++){
            if(this.contatos[i].getId() == nome){
                return i;
            } else {
                return -1;
            }
        }
    }

    public addContato(contato: Contato): void{
        let i: number = this.posNome(contato.getId());
        if(i == -1){
            this.contatos.push(contato);
            this.contatos.sort((a, b) => a.getId().localeCompare(b.getId()))
        } else {
            for(let num of contato.getFone()){
                this.contatos[i].addFone(num);
            }            
        }
    }
    public rmvContato(nome: string): void {
        let i: number = this.posNome(nome);
        if (i != -1){
            this.contatos.splice(i);
        } else {
            console.log("Contato inexistente")
        }
    }
    public getContato(nome: string): Contato | null {
        let i = this.posNome(nome);
        if(i != -1){
            return this.contatos[i];
        } else {
            return null;
        }
    }
}

//TESTES

let fone = new Fone("tim", "9921");
//console.log("" + fone + "\n");

let fones = Array<Fone>();
fones.push(fone);


let david = new Contato("David", fones)
david.addFone(new Fone("oi", "8811"));
//console.log("" + david + "\n");
david.rmFone(1);
//console.log("" + david + "\n");

let john = new Contato("John", [new Fone("tim", "9621"), new Fone("casa", "3412")])

let agenda = new Agenda;

agenda.addContato(david);
agenda.addContato(john);

console.log("" + agenda);

