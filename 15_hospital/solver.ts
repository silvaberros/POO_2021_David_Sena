interface IPaciente {
    getId(): string;
    addMedico(medico: IMedico): void;
    rmvMedico(idMedico: string): void;
    getMedicos(): Map<string, IMedico>;
    getDiagnostico(): string;
}

interface IMedico {
    getId(): string;
    addPaciente(paciente: IPaciente): void;
    rmvPaciente(idPaciente: string): void;
    getPacientes(): Map<string, IPaciente>;
    getEspecialidade(): string;
}

class Medico implements IMedico{
    nome: string;
    especialidade: string;
    pacientes: Map<string, IPaciente> = new Map();

    constructor(nome: string, especialidade: string){
        this.nome = nome;
        this.especialidade = especialidade;
    }

    public getId(): string {
        return this.nome;
    }

    public addPaciente(paciente: IPaciente): void {
        let chave = paciente.getId();
        if(this.pacientes.has(chave))
            return;
        this.pacientes.set(chave, paciente);
        paciente.addMedico(this);
    }

    public rmvPaciente(idPaciente: string): void {
        let paciente: undefined | IPaciente = this.pacientes.get(idPaciente);
        if(paciente !== undefined){
            this.pacientes.delete(idPaciente);
            paciente.rmvMedico(this.getId());
        }
    }

    public getEspecialidade(): string {
        return this.especialidade;
    }
    public getPacientes(): Map<string, IPaciente> {
        return this.pacientes
    }
    public toString(): string {
        let keys = this.pacientes.keys();
        return this.nome + ":" + this.especialidade + " - Pacs:[" + [...keys].join(", ") + "]";
    }
}

class Paciente implements IPaciente{
    protected nome: string;
    protected diagnostico: string;
    protected medicos: Map<string, IMedico> = new Map();
    
    constructor(nome: string, diagnostico: string){
        this.nome = nome;
        this.diagnostico = diagnostico;
    }

    public getId(): string {
        return this.nome;
    }

    public addMedico(medico: IMedico): void {
        let chave = medico.getId();
        if(this.medicos.has(chave))
            return;
        
        let esp = medico.getEspecialidade();
        for(let doc of this.medicos.values()){
            if(esp === doc.getEspecialidade()){
                console.log("O paciente já possui um médico dessa especialidade");
                return;
            }
        }
    
        this.medicos.set(chave, medico);
        medico.addPaciente(this);
    }

    public rmvMedico(idMedico: string): void {
        let medico: undefined | IMedico = this.medicos.get(idMedico);
        if(medico !== undefined){
            this.medicos.delete(idMedico);
            medico.rmvPaciente(this.getId());
        }
    }

    public getDiagnostico(): string {
        return this.diagnostico;
    }
    public getMedicos(): Map<string, IMedico> {
        return this.medicos;
    }
    public toString(): string {
        let keys = this.medicos.keys();
        return this.nome + ":" + this.diagnostico + " - Meds:[" + [...keys].join(", ") + "]";
    }
}

class Hospital {
    private medicos: Map<string, IMedico> = new Map<string, IMedico>();
    private pacientes: Map<string, IPaciente> = new Map<string, IPaciente>();

    public rmvPaciente(idPaciente: string): void {
        for(let docs of this.medicos.values()){
            docs.rmvPaciente(idPaciente);
        }
        this.pacientes.delete(idPaciente);        
    }
    public rmvMedico(idMedico: string): void {
        for(let paciente of this.pacientes.values()){
            paciente.rmvMedico(idMedico);
        }
        this.medicos.delete(idMedico);
    }
    public addPaciente(paciente: IPaciente): void {
        let chave = paciente.getId();
        if(this.pacientes.has(chave))
            return;
        this.pacientes.set(chave, paciente);
    }
    public addMedico(medico: IMedico): void{
        let chave = medico.getId();
        if(this.medicos.has(chave))
            return;
        
        this.medicos.set(chave, medico);
    }

    public vincular(idMedico: string, idPaciente: string): void {
        if(!this.medicos.has(idMedico)){
            console.log("Esse médico não está cadastrado");
            return;
        }
        if(!this.pacientes.has(idPaciente)){
            console.log("Esse paciente não está cadastrado");
            return;
        }
        let doc: undefined | IMedico = this.medicos.get(idMedico);
        let pac: undefined | IPaciente = this.pacientes.get(idPaciente);
        if(doc !== undefined && pac !== undefined){
            pac.addMedico(doc);
        }
    }
    public toString(): string {
        let str = "Pacientes: \n";
        for(let pac of this.pacientes.values()){
            str += pac.toString();
            str += "\n"
        }
        str += "\n" + "Médicos: \n"
        for(let docs of this.medicos.values()){
            str += docs.toString();
            str += "\n"
        }
        return str;
    }
}
//PACIENTES
let fred = new Paciente("Fred", "fratura");
let alvis = new Paciente("Alvis", "avc");
let goku = new Paciente("Goku", "hemorragia");
let silva = new Paciente("Silva", "sinusite");

//MEDICOS
let bisturi = new Medico("Bisturi", "cirurgia");
let snif = new Medico("Snif", "alergologia");
let facada = new Medico("Facada", "cirurgia");

//CASES
// bisturi.addPaciente(fred);
// bisturi.addPaciente(alvis);
// bisturi.addPaciente(goku);

// snif.addPaciente(silva);
// snif.addPaciente(alvis);

// facada.addPaciente(goku);

let hospital = new Hospital();

hospital.addPaciente(fred);
hospital.addPaciente(alvis);
hospital.addPaciente(goku);
hospital.addPaciente(silva);

hospital.addMedico(bisturi);
hospital.addMedico(snif);
hospital.addMedico(facada);

hospital.vincular("Bisturi", "Goku");
hospital.vincular("Bisturi", "Fred");
hospital.vincular("Bisturi", "Alvis");

hospital.vincular("Snif", "Silva");
hospital.vincular("Snif", "Alvis");

hospital.vincular("Facada", "Goku");

console.log("" + hospital);