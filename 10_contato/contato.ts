class Fone {
    private label: string;
    private fone: string;

    constructor(label: string, fone: string) {
        this.label = this.setLabel(label);
        this.fone = this.setFone(fone);
    }
    
    public toString(): string {
        return this.label + "_" + this.fone;
    }

    static validate(fone: string): boolean {
        let ok = "0123456789()-.";
        for(let i = 0; i < fone.length; i++){
            if(ok.indexOf(fone[i]) == -1){ //indexOf procura o indice de um elemento semelhante a fone[i] em "ok". não encontrando, retorna -1.
                return false;
            }
        }
        return true;
    }
    
    public isValid(fone: string): boolean{
        if(Fone.validate(fone)){
            return true;
        } else {
            return false;
        }
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

    public addFone(fone: Fone): void | string {
        let num = fone.getFone();
        if(!fone.isValid(num)){
            console.log ("Fone inválido");
        } else {
            this.fones.push(fone);
        }
    }

    public rmFone(index: number): void {
        if(index < 0 || index > this.fones.length){
            console.log("Index inválido");
        }
        this.fones.splice(index);
    }
}

let fones = [
    new Fone("oi", "8592"),
    new Fone("tim", "998a5"),
    new Fone("casa", "3412")]


let david = new Contato("David",fones);
console.log("" + david);

david.rmFone(2);
console.log("" + david);