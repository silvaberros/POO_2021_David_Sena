class Grafite {
    calibre: number;
    dureza: string;
    tamanho: number;
    constructor(calibre: number, dureza: string, tamanho: number) {
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString(): string {
        //return "Grafite: " + this.calibre + ":" + this.dureza + ":" + this.tamanho;
        return `Grafite ${this.calibre}:${this.dureza}:${this.tamanho}`;
    }
}

//agregação
class Lapiseira {
    calibre: number;
    private grafite: Grafite | null;

    constructor(calibre: number) { //é a lapiseira que cria o grafite?
        this.calibre = calibre;
        this.grafite = null;
    }

    setGrafite(grafite: Grafite): boolean {
        if (this.grafite != null) {
            console.log("A lapiseira já possui um grafite");
            return false;
        }
        if (grafite.calibre != this.calibre) {
            console.log("O grafite não é compatível com a lapiseira");
            return false;
        }
        this.grafite = grafite;
        return true;
    }

    removerGrafite(): Grafite | null {
        if (this.grafite == null) {
            console.log("A lapiseira não possui um grafite");
            return null;
        }
        let grafite = this.grafite;
        this.grafite = null;
        return grafite;
    }

    escrever(folhas: number): boolean {
        //verificar se existe grafite
        if (this.grafite == null) {
        console.log ("Sem grafite");
        return false
        }

        let gasto: number = folhas * this.grafite.gastoPorFolha();
        if (gasto <= this.grafite.tamanho) {
            console.log("Escrita concluída");
            this.grafite.tamanho -= gasto;
            return true
        }
        if (this.grafite.tamanho == 0) {
            this.grafite = null;
            return false
            
        } else {
            let realizado = this.grafite.tamanho / this.grafite.gastoPorFolha()
            console.log("Escrita parcial: " + realizado + " folhas");
            this.grafite.tamanho = 0;
            return true
        }        
    }
}


let pentel = new Lapiseira(0.5);
pentel.setGrafite(new Grafite(0.5, "HB", 40));
pentel.escrever(10);
pentel.escrever(40);
console.log(pentel);