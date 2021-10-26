class Moto {
    pessoa: Pessoa | null;
    gas: number;
    tempo: number;
    
    constructor(gas: number) {
        this.gas = gas;
        this.pessoa = null;
        this.tempo = 0;
    }

    comprar(tempo: number) {
        this.tempo += tempo;

    }

    dirigir(tempo: number) {
        if(this.tempo == 0){
            console.log("Sem tempo, irmão!")
        } else {
            if(this.tempo < tempo){
                console.log("Andou " + this.tempo + " e acabou o tempo");
                this.tempo = 0;
            } else {
                this.tempo -= tempo;
            }
        }

    }

    buzina() {
        if(this.pessoa == null){
            console.log("Moto vazia!");
        } else {
            let buzina: string = "Pib"
            for(let i: number = 0; i < this.gas; i++){
                buzina += "i";
            }
            console.log(buzina + "ti!");
        }

    }

    subir(pessoa: Pessoa) {
        if (this.pessoa != null) {
            console.log("Já tem gente");
            //return false;
        }
        if (this.pessoa == null){
            this.pessoa = pessoa;
            console.log("Nome: " + pessoa.nome + ", idade: " + pessoa.idade)
            //return true;
        }
        if(pessoa.idade >= 10){
            console.log ("Grande demais pra andar de motinha!")
        }
    }

    descer() {
        if (this.pessoa == null) {
            console.log ("Não tem ninguém");
        } else {
            this.pessoa = null;
        }

    }

    toString(): string {
        return "Gasosa: " + this.gas + ", tempo: " + this.tempo + " [Pessoa: " + this.pessoa + "].";
    }
}

class Pessoa {
    idade: number;
    nome: string;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    toString(): string {
        return "nome: " + this.nome + ", idade: " + this.idade;
    }
}

let motoca: Moto = new Moto(3);
let sujeito: Pessoa = new Pessoa("Rafael", 5);
let sujeito2: Pessoa = new Pessoa("Marina", 7);

// console.log(motoca.toString());
// console.log();

// motoca.buzina();
// console.log(motoca.toString());
// console.log();

// motoca.subir(sujeito);
// console.log(motoca.toString());
// console.log();

// motoca.buzina();
// console.log(motoca.toString());
// console.log();

// motoca.subir(sujeito2);
// console.log(motoca.toString());
// console.log();

// motoca.descer();
// console.log(motoca.toString());
// console.log();

// motoca.subir(new Pessoa("Hugo", 4))
// console.log(motoca.toString());
// console.log();

// motoca.dirigir(10);
// console.log(motoca.toString());
// console.log();

// motoca.comprar(20);
// motoca.dirigir(10);
// console.log(motoca.toString());
// console.log();

// motoca.descer();
// motoca.subir(new Pessoa("Joana", 26));
// console.log(motoca.toString());
// console.log();

// motoca.dirigir(15);
// console.log(motoca.toString());
// console.log();

// motoca.dirigir(5);
// console.log(motoca.toString());
// console.log();
