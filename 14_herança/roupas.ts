abstract class Roupa {
    peça: string = "";
    corpo: number;

    constructor(peça: string, corpo: number) {
        this.peça = peça;
        this.corpo = corpo;
    }
    chave(): number{
        return this.corpo;
    }
    toString(): string{
        return this.peça;
    }
    abstract qntVeste(): number;

}

class Cueca extends Roupa {
    private veste: number = 5;
    constructor(){
        super("Cueca", 1);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Short extends Roupa {
    private veste: number = 30;
    constructor(){
        super("Short", 2);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Calça extends Roupa {
    private veste: number = 45;
    constructor(){
        super("Calça", 2);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Camiseta extends Roupa {
    private veste: number = 30;
    constructor(){
        super("Camiseta", 3);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Camisa extends Roupa {
    private veste: number = 30;
    constructor(){
        super("Camisa", 3);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Meias extends Roupa {
    private veste: number = 5;
    constructor(){
        super("Meias", 4);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Tenis extends Roupa {
    private veste: number = 15;
    constructor(){
        super("Tenis", 5);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Chinela extends Roupa {
    private veste: number = 10;
    constructor(){
        super("Chinela", 5);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Bone extends Roupa {
    private veste: number = 10;
    constructor(){
        super("Bone", 6);
    }

    qntVeste(): number {
        return this.veste;
    }
}
class Chapeu extends Roupa {
    private veste: number = 10;
    constructor(){
        super("Chapéu", 6);
    }

    qntVeste(): number {
        return this.veste;
    }
}

class Pessoa {
    private nome: string;
    private corpo: number = 0;
    private look: Map<number,Roupa>;

    constructor(nome: string){
        this.nome = nome;
        this.look = new Map<number, Roupa>();
    }

    vestir(roupa: Roupa){
        if(this.corpo >= 100){
            console.log("Já tá muito bem vestido já, já tá bom.")
        }
        let chave = roupa.chave();
        if(this.look.has(chave)){
            console.log("Já há uma peça de roupa aí")
        } else {
            this.look.set(chave, roupa);
            this.corpo += roupa.qntVeste();
        }
    }
    despir(chave: number){
        if(this.look.has(chave)){
            this.look.delete(chave);
        } else {
            console.log("Não há o que despir")
        }
    }

    toString(): string {
        let str = this.nome;
        str += " está vestindo: "
        for(let i = 1; i<7; i++){
            if(this.look.has(i)){
                str += this.look.get(i);
                str += "; "
            }
        }
        return str;
    }
}

//VESTINDO
let silva = new Pessoa("Silva");
silva.vestir(new Cueca);
console.log(silva + "\n");

//ROUPA REPETIDA
silva.vestir(new Calça);
silva.vestir(new Short);
console.log(silva + "\n");

//LOOK COMPLETO
silva.vestir(new Meias);
silva.vestir(new Tenis);
silva.vestir(new Camisa);
silva.vestir(new Chapeu);
console.log(silva + "\n");

//TIRANDO ROUPA
silva.despir(3)
console.log(silva + "\n");
silva.despir(2);
silva.despir(1);
silva.despir(3);
console.log(silva + "\n");