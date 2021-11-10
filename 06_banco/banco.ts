class Pessoa {
    nome: string;
    constructor(nome: string) {
        this.nome = nome;
    }
    public toString() {
        return this.nome;
    }
}

class Banco {
    caixas: Array<Pessoa | null>;
    espera: Array<Pessoa>;

    constructor(qtdCaixas: number) {
        this.caixas = []; //length 0
        for (let i = 0; i < qtdCaixas; i++) {
            this.caixas.push(null);
        }
        this.espera = [];
    }

    //coloca a pessoa na fila de espera
    chegarPessoa(pessoa: Pessoa): void {
        this.espera.push(pessoa);
    }

    //se o caixa estiver vazio, pega a primeira pessoa da fila de espera
    chamarNoCaixa(caixa: number): boolean {
        if(this.caixas[caixa] != null){
            console.log("Ainda tem gente no caixa " + caixa);
            return false;
        } else {
            this.caixas[caixa] = this.espera[0];
            this.espera.shift();
            return true;
        }
    }

    //se o caixa estiver ocupado, retira a pessoa do caixa
    finalizarAtendimento(caixa: number): boolean {
        if(this.caixas[caixa] == null){
            console.log("Não tem ninguém no caixa " + caixa)
            return false;
        } else {
            this.caixas[caixa] = null;
            return true;
        }
    }

    public toString() {
        let str = "caixas: | ";
        for (let i = 0; i < this.caixas.length; i++) {
            let pessoa = this.caixas[i];
            str += i + ": ";
            //str += pessoa !== null ? pessoa.toString : "----";
            if (pessoa == null) {
                str += "vazio";
            } else {
                str += pessoa.toString();
            }
            str += " |";
        }
        str += "\nespera: ";
        for (let pessoa of this.espera) {
            str += pessoa.toString() + " ";
        }
        return str;
    }
}

let banco = new Banco(3);
console.log("" + banco);
console.log();

// pessoas na espera
banco.chegarPessoa(new Pessoa("Amanda"));
banco.chegarPessoa(new Pessoa("Carlos"));
banco.chegarPessoa(new Pessoa("Jorge"));
banco.chegarPessoa(new Pessoa("Lilian"));

console.log("" + banco);
console.log();

//chamando pros caixas
banco.chamarNoCaixa(0);
banco.chamarNoCaixa(1);
banco.chamarNoCaixa(1);

console.log("" + banco);
console.log();

banco.chamarNoCaixa(2);
console.log("" + banco);
console.log();

// finalizando atendimento
banco.finalizarAtendimento(0);
banco.finalizarAtendimento(1);
banco.finalizarAtendimento(1);

console.log("" + banco);
console.log();

