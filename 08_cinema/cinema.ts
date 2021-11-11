class Cliente {
    id: string;
    fone: string;

    constructor (fone: string, id: string){
        this.fone = fone;
        this.id = id;
    }

    toString(){
        return this.id + ", " + this.fone;
    }

}

class Sala {
    assentos: Array< Cliente | null >;
    
    constructor(capacidade: number){
        this.assentos = [];
        for (let i = 0; i < capacidade; i++){
            this.assentos.push(null);
        }
    }

    reservar(cliente: Cliente, assento: number): boolean{      
        for(let i = 0; i < this.assentos.length; i++){
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
        }
    }

    cancelar(id: string) {
        let ausente = true;
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
        }
    }

    toString(){
        return this.assentos;
    }
}
//criar a sala
let sala01 = new Sala(5)
console.log(sala01.toString());

//reservar
sala01.reservar(new Cliente("3232", "Davi"), 0);
sala01.reservar(new Cliente("3131", "Joao"), 3);
console.log(sala01.toString());

sala01.reservar(new Cliente("3234", "Rute"), 0);
console.log(sala01.toString());

sala01.reservar(new Cliente("3235", "Davi"), 2);
console.log(sala01.toString());

//cancelar
sala01.cancelar("Davi");
console.log(sala01.toString());

sala01.cancelar("Rita");
console.log(sala01.toString());
