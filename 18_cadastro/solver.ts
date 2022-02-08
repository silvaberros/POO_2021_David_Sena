abstract class Account {
    protected id: number;
    protected balance: number = 0.00;
    protected clientId: string;
    abstract type: string;

    constructor(id: number, clientId: string){
        this.id = id;
        this.clientId = clientId;
    }

    public abstract monthlyUpdate(): void
    
    public withdraw(value: number): void {
        if(this.balance < value){
            console.log("Saldo insuficiente");
        } else if (this.balance >= value){
            this.balance -= value;
        }
    }
    public deposit(value: number): void {
        this.balance += value;
    }
    public transfer(other: Account, value: number){
        if(this.balance >= value){
            this.balance -= value;
            other.deposit(value);
        } else {
            console.log("Saldo insuficiente");
        }
    }
    //GETS SETS
    getId(): number {
        return this.id;
    }
    getBalance(): number {
        return this.balance;
    }
    getClientId(): string {
        return this.clientId;
    }
    getType(): string {
        return this.type;
    }
    public toString(): string {
        return "" + this.getId() + ":" + this.getClientId() + ":" + this.getBalance() + ":" + this.getType() + "\n";
    }
}

class CheckingAccount extends Account {
    type: string = "CC";

    contructor (id: number, idClient: string){
        this.id = id;
        this.clientId = idClient;
    }
    public monthlyUpdate(): void {
        this.balance -= 20;
    }
}

class SavingsAccount extends Account {
    type: string = "CP"

    contructor (id: number, idClient: string){
        this.id = id;
        this.clientId = idClient;
    }
    public monthlyUpdate(): void {
        this.balance += this.balance * 0.01;
    }
}

class Client {
    private clientId: string;
    private accounts: Array<Account> = new Array<Account>();

    constructor(clientId: string){
        this.clientId = clientId;
    }
    public addAccount(account: Account){
        this.accounts.push(account);
    }
    //GETS SETS
    getClient(): string {
        return this.clientId;
    }
    setClientId(clientId: string): void {

    }
    getAccounts(): Array<Account> {
        return this.accounts;
    }
    setAccounts(accounts: Array<Account>): void {

    }
}

class BankAgency {
    private clients: Map<string, Client> = new Map<string, Client>();
    private accounts: Map<number, Account> = new Map<number, Account>();
    private nextAccountId: number = 0;
    
    public getAccount(id: number): Account {
        let conta: Account = this.accounts.get(id)!;
        return conta;
    }
    public addClient(clientId: string): void {
        if(!this.clients.has(clientId)){
            this.clients.set(clientId, new Client(clientId));
            let client = this.clients.get(clientId);
            if(client !== undefined){
                let cc = new CheckingAccount(this.nextAccountId, clientId);
                let cp = new SavingsAccount(this.nextAccountId + 1, clientId);
                this.nextAccountId += 2;
                client.addAccount(cc);
                client.addAccount(cp);
                this.accounts.set(cc.getId(), cc);
                this.accounts.set(cp.getId(), cp);
            }
        } else {
            return;
        }
    }
    public withdraw(idConta: number, value: number): void {
        if(this.accounts.has(idConta)){
            let conta = this.accounts.get(idConta);
            if(conta !== undefined){
                conta.withdraw(value);
            }
        } else {
            console.log("Conta inexistente");
        }
    }
    public deposit(idConta: number, value: number): void {
        if(this.accounts.has(idConta)){
            let conta = this.accounts.get(idConta);
            if(conta !== undefined){
                conta.deposit(value);
            }
        } else {
            console.log("Conta inexistente");
        }
    }
    public transfer(contaDe: number, contaPara: number, value: number): void {
        if(this.accounts.has(contaDe)){
            if(this.accounts.has(contaPara)){
                let from = this.accounts.get(contaDe);
                let to = this.accounts.get(contaPara);
                if(from !== undefined && to !== undefined){
                    from.transfer(to, value);
                }
            } else {
                console.log("Conta inexistente");
            }
        } else {
            console.log("Conta inexistente");
        }
    }
    public monthlyUpdate(): void {
        for(let contas of this.accounts.values()){
            contas.monthlyUpdate();
        }
    }
    toString(): string {
        let str = "Clients:\n";
        for(let clients of this.clients.values()){
            str += "- " + clients.getClient();
            let id = [];
            for(let contas of clients.getAccounts()){
                id.push(contas.getId());
            }
            str += " [" + [...id].join(", ") + "]\n";
        }

        str += "\nAccounts:\n";
        for(let contas of this.accounts.values()){
            str += contas.toString();
        }

        return str;

    }
    
}

//cases
//add clientes
let bank = new BankAgency;
bank.addClient("Almir");
bank.addClient("Julia");
bank.addClient("Maria");

//operações básicas
bank.deposit(0, 100);
bank.deposit(1, 200);
bank.deposit(2, 50);
bank.deposit(3, 300);

bank.withdraw(3, 50);
bank.withdraw(0, 70);
bank.withdraw(1, 300);

bank.transfer(3, 5, 200);
bank.transfer(0, 4, 25);
bank.transfer(9, 1, 30);
bank.transfer(2, 8, 10);

//update mensal
bank.monthlyUpdate();

//show
console.log(bank.toString());