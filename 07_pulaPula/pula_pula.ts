class Mirim {
    nome: string;
    idade: number;


    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }

    public toString(){
        return this.nome;
    }
}

class Trampolim {
    esperando: Array<Mirim>;
    pulando: Array<Mirim>;
    
    constructor(){
        this.pulando = [];
        this.esperando = [];
    }
    chegarMirim(mirim: Mirim): void {
        this.esperando.push(mirim);
    }
    in(): void {
        this.pulando.push(this.esperando[0])
        this.esperando.shift();
    }
    out(): void {
        this.esperando.push(this.pulando[0]);
        this.pulando.shift();       
    }
    remover(nome: string) {
        for(let i = 0; i< this.esperando.length; i++) {
            if (this.esperando[i].nome == nome) {
                this.esperando.splice(i, 1);
            }
        }
        for(let i = 0; i< this.pulando.length; i++) {
            if (this.pulando[i].nome == nome) {
                this.pulando.splice(i, 1);
            }
        }
    }
    public toString(){
        let str = "Estão na fila: "
        if(this.esperando.length < 1){
            str += "ninguém"
        } else {
            for (let mirim of this.esperando){
                str += mirim.toString() + "; "
            }
        }
        
        str += "\nE estão pulando: "
        if(this.pulando.length < 1){
            str += "ninguém"
        } else {
            for(let mirim of this.pulando){
                str += mirim.toString() + "; "
            }
        }
        str += "\n"
        return str;
    }      
}

let trampo = new Trampolim();

trampo.chegarMirim(new Mirim("Mario", 5));
trampo.chegarMirim(new Mirim("Livia", 4));
trampo.chegarMirim(new Mirim("Luana", 3));

//entrando e saindo
console.log(trampo.toString());
trampo.in();
console.log(trampo.toString());


trampo.out();
console.log();
console.log("STATUS DO PULA-PULA")
console.log(trampo.toString());
console.log();

//indo embora
trampo.remover("Luana");
trampo.remover("Livia");


console.log();
console.log("STATUS DO PULA-PULA")
console.log(trampo.toString());
console.log();
