class Cliente {
    id: string;
    fone: string;

    constructor (fone: string, id: string){
        this.fone = fone;
        this.id = id;
    }

    toString(){
        return this.id + " - FONE " + this.fone;
    }

}

class Sala {
    assentos: Map<number,Cliente>;
    
    constructor(){
        this.assentos = new Map<number,Cliente>();
    }

    reservar(cliente: Cliente, assento: number): boolean{
        if(assento >= 40 || assento <= 0){          //numero maximo de cadeiras
            console.log("Assento inválido");
            return false;
        }
        let presente = false;
        let ocupado = false
        for(let [key,value] of this.assentos){
            if(value.id == cliente.id){
                presente = true;
            }
            if(key == assento){
                ocupado = true;
            }
        }
        if(presente){
            console.log("O cliente já fez uma reserva");
            return false;
        } else if(ocupado) {
            console.log("A cadeira já está ocupada");
            return false;
        } else {
            this.assentos.set(assento, cliente);
            return true;
        }
        /*for(let i = 0; i < this.assentos.length; i++){
            if(this.assentos[i]?.id === cliente.id){
                console.log("O cliente já está na sala");
                return false;
            }
        }
        if(this.assentos[assento] != null){
            console.log("A cadeira " + assento + " já está ocupada");
            return false
        } else {
            this.assentos[assento] = cliente;
            return true
        }*/
    }

    cancelar(id: string): void {
        let ausente = true;
        for(let [key, value] of this.assentos){
            if(value.id == id){
                ausente = false;
                this.assentos.delete(key);
            }
        }
        if(ausente == true){
            console.log("Não há reserva com este nome");
        }
        /*let ausente = true;
        for(let i = 0; i < this.assentos.length; i++){
            if(this.assentos[i]?.id == id){
                ausente = false;
            }
        }
        if(ausente == true){
            console.log("Não há reserva com este nome")
        }

        for(let i = 0; i < this.assentos.length; i++){
            if(this.assentos[i]?.id == id){
                this.assentos[i] = null;
            }
        }*/
    }

    toString(): string {
        let str = "Reservas: \n";
        for(let values of this.assentos.values()){
            str += values.toString();
            str += "\n"
        }
        return str;
    }
}
//criar a sala
let sala01 = new Sala;
console.log("" + sala01);


// //reservar
sala01.reservar(new Cliente("3232", "Davi"), 0);
sala01.reservar(new Cliente("3131", "Joao"), 3);
// console.log("" + sala01);

// sala01.reservar(new Cliente("3234", "Rute"), 3);
// console.log(sala01.toString());

sala01.reservar(new Cliente("3235", "Davi"), 2);
// console.log("" + sala01);

// //cancelar
// sala01.cancelar("Davi");
// console.log("" + sala01);

// sala01.cancelar("Rita");
// console.log("" + sala01);

sala01.reservar(new Cliente("3235", "Davi"), 1);
sala01.reservar(new Cliente("3235", "Jorge"), 2);

console.log("" + sala01);