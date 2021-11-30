
// MODO INTERATIVO (instalar localmente)
// npm install readline-sync @types/readline-sync @types/node

//importar o pacote
const readline = require ("readline-sync");

/* TESTE
console.log("Digite o seu nome:")
let nome = readline.question();
console.log("Ola, meu amigo " + nome);
*/

//criar um função com o readline
let input = (): string => readline.question();
let write = (x: any) => process.stdout.write("" + x);


class Pet {
    private nome: string = "";
    private energia: number;
    private energiaMax: number;
    private saciedade: number;
    private saciedadeMax: number;
    private isAlive: boolean = true;


    constructor(nome: string, energiaMax: number, saciedadeMax: number){
        this.setNome(nome);
        this.energia = energiaMax;
        this.energiaMax = energiaMax;
        this.saciedade = saciedadeMax;
        this.saciedadeMax = saciedadeMax;
    }

    public toString(){
        if(this.isAlive){
            return this.nome + "| E: " + this.energia + "/" + this.energiaMax + ", S: " + this.saciedade + "/" + this.saciedadeMax;
        } else {
            return "RIP"
        }
    }

    public brincar(): void {
        if(!this.isAlive) {
            write("Com pet morto não se brinca\n")
            return;
        }
        this.setSaciedade(this.getSaciedade() - 2);
        this.setEnergia(this.getEnergia() - 1);
    }

    public comer(): void {
        if(!this.isAlive) {
            write("Pet morto não come\n")
            return;
        }
        this.setSaciedade(this.getSaciedade() + 1)
        this.setEnergia(this.getEnergia() + 1);
    }
    
    // FUNÇÕES SET E GET
    public setNome(nome: string){
        if (nome.length <= 0){
            this.nome = "bichinho"
        } else {
            this.nome = nome;
        }        
    }
    public getNome(){
        return this.nome;
    }

    public setEnergia(energia: number){
        if (this.energia < 1){
            this.energia = 0;
            this.isAlive = false;
        } else if (energia > this.energiaMax){
            this.energia = this.energiaMax;
            if (this.isAlive){
                write("Seu pet está ansioso pra fazer alguma coisa\n")
            }
        } else {
            this.energia = energia;
        }
    }
    public getEnergia(){
        return this.energia;
    }

    public setSaciedade(saciedade: number){
        if (this.saciedade < 1){
            this.saciedade = 0;
            this.isAlive = false;
            write("Morreu de fome, o pobe.\n")
        } else if (saciedade > this.saciedadeMax){
            this.saciedade = this.saciedadeMax;
            this.isAlive = false;
            write("Comeu até papocar!\n");
        } else {
            this.saciedade = saciedade;
        }
    }
    public getSaciedade(){
        return this.saciedade;
    }

}

class IO {
    
    criar_pet() {
        write("Digite o nome do pet: ");
        let nome = input();
        write("Digite o máximo de energia: ");
        let energiaMax = +input();        
        write("Digite o máximo de saciedade: ");
        let saciedadeMax = +input() //o "+" serve para converter o input em number
        let pet = new Pet(nome, energiaMax, saciedadeMax);
        console.log("" + pet);
        return pet
    }
    help() {
        write("Comandos:\n");
        write(" init <nome> <maxenergia> <maxsaciedade>: cria um novo pet\n");
        write(" show: mostra o pet\n");
        write(" play: para brincar com o pet\n");
        write(" eat: para alimnentar o pet\n");
        write(" end: para sair do programa\n");
    }
    shell() {
        let pet = new Pet("", 0, 0);//this.criar_pet();
        this.help();
        while(true) {
            let line = input();
            let words = line.split(" ");
            if (words[0] == "end") {
                break;
            } else if (words[0] == "show") {
                write("" + pet + "\n");
            } else if (words[0] == "help") {
                this.help();
            } else if (words[0] == "init") {
                pet = new Pet(words[1], +words[2], +words[3]);
            } else if (words[0] == "play") {
                pet.brincar();
            } else if (words[0] == "eat") {
                pet.comer();
            } else {
                console.log("Comando inválido")
            }
        }
    }
}

let io = new IO();
io.shell();

