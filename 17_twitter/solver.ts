class User{
    username: string;
    private followers: Map<string, User> = new Map<string, User>();
    private following: Map<string, User> = new Map<string, User>();
    private inbox: Inbox = new Inbox;

    constructor(username: string){
        this.username = username;
    }

    public toString(): string{
        return this.username + "\n" + "Seguindo: " + "[" + [... this.following.keys()].join(", ") + "]" +
        "\n" + "Seguidores: [" + [...this.followers.keys()].join(", ") + "]\n";
    }
   
    public follow(outro: User): void {
        if(outro === this){
            return;
        } else if(this.following.has(outro.username)){
            return;
        } else {
            this.following.set(outro.username, outro);
            outro.followers.set(this.username, this);
        }
    }

    public getInbox(): Inbox {
        return this.inbox;
    }

    public sendTweet(tw: Tweet): void {
        this.inbox.myTweets.set(tw.getId(), tw);
        this.inbox.timeline.set(tw.getId(), tw);
        for(let followers of this.followers.values()){
            followers.inbox.timeline.set(tw.getId(), tw);
        }
    }

    public unfollow(other: string): void {
        if(this.following.has(other)){
            let user = this.following.get(other);
            if(user !== undefined)
                user.followers.delete(this.username)
            this.following.delete(other);
            this.inbox.rmMsgsFrom(other);           
        } else {
            return;
        }

    }

    public like(idTw: number): void {
        let inbox = this.getInbox();
        if(inbox.getTweet(idTw)){
            let twt = inbox.getTweet(idTw);
            if(twt !== undefined)
                twt.like(this.username);
        } else {
            console.log("Tweet não existe");
        }
    }
    public unfollowAll(): void {
        for(let following of this.followers.values()){
            following.followers.delete(this.username);
        }
        this.following.clear();
    }
    public rejectAll(): void {
        for(let followers of this.following.values()){
            followers.following.delete(this.username);
        }
        this.followers.clear();
        for(let twts of this.getInbox().myTweets.values()){
            twts.setDeleted();
        }
    }
}

class Tweet {
    private id: number;
    private username: string;
    private msg: string;
    private likes: Set<string> = new Set<string>();
    private rt: Tweet | null = null;
    private deleted: boolean = false;

    constructor(id: number, username: string, msg: string){
        this.id = id;
        this.username = username;
        this.msg = msg;
    }

    public getId(): number {
        return this.id;
    }

    public getSender(): string {
        return this.username;
    }

    public getMsg(): string {
        return this.msg;
    }
    public setRt(twt: Tweet): void{
        this.rt = twt;
    }
    ///////////////////////////////////
    public like(username: string): void {
        this.likes.add(username);
    }
    public getLikes(): Set<string> {
        return this.likes;
    }
    public setDeleted(): void {
        this.deleted = true;
        this.msg = "Este tweet foi deletado";
    }

    public toString(): string {
        let str = ""
        str = this.id + ": " + this.username + ": (" + this.msg + ") " + [...this.likes];
        if(this.rt !== null){
            str += "\n      " + this.rt.id + ": " + this.rt.username + " (" + this.rt.getMsg() + ") " + [...this.rt.likes];
        }
        return str;
    }
    
}

class Inbox{
    timeline: Map<number, Tweet> = new Map<number, Tweet>();
    myTweets: Map<number, Tweet> = new Map<number, Tweet>();
    
    public storeInTimeline(tweet: Tweet): void {

    }
    public getTimeline(): Array<Tweet> {
        let tmln = this.timeline.values();
        return [...tmln];
    }
    public toString(): string {
        let str = "";
        let tmln = this.getTimeline().reverse();
        for(let twt of tmln){
            str += twt.toString() + "\n";
        }
        return str;
    }
    public getTweet(id: number): Tweet | undefined {
        if(this.timeline.has(id)){
            let twt = this.timeline.get(id);
            if(twt !== undefined)
                return twt;
        } else {
            return;
        }
    }
    public rmMsgsFrom(username: string): void {
        let deletar = [];
        for(let twt of this.timeline.values()){
            if(twt.getSender() === username)
                deletar.push(twt.getId());
        }
        for(let id of deletar){
            this.timeline.delete(id)
        }
    }
}

class Controller {
    private nextTweetId: number = 0;
    private user: Map<string, User> = new Map<string, User>();
    private tweets: Map<number, Tweet> = new Map<number, Tweet>();

    public addUser(username: string): void{
        if(!this.user.has(username)){
            this.user.set(username, new User(username));
            return;
        } else {
            return;
        }
    }
    public getUser(username: string): User | undefined {
        if(!this.user.has(username)){
            console.log("Usuário não encontrado");
        } else {
            let user = this.user.get(username);
            if(user !== undefined){
                return user;
            }
        }
    }
    protected createTweet(sender: string, msg: string): Tweet {
        let tweet = new Tweet(this.nextTweetId, sender, msg);
        this.tweets.set(this.nextTweetId, tweet);
        this.nextTweetId += 1;
        return tweet;

    }
    public sendTweet(username: string, msg: string){
        if(this.user.has(username)){
            let user = this.user.get(username);
            let twt = this.createTweet(username, msg);
            this.tweets.set(twt.getId(), twt);
            if(user !== undefined){
                user.sendTweet(twt);
            }
        } else {
            return;
        }
    }
    public sendRt(username: string, twId: number, rtMsg: string): void {
        let user = this.user.get(username);
        if(user !== undefined){
            let rtwt = user.getInbox().getTweet(twId);
            if(rtwt !== undefined){
                let twt = this.createTweet(user.username, rtMsg);
                twt.setRt(rtwt);
                user.sendTweet(twt);
            }
        }    
    }
    public rmUser(username: string): void {
        let user = this.getUser(username);
        if(user !== undefined){
            user.unfollowAll();
            user.rejectAll();
        }
        this.user.delete(username);
    }
    public toString(): string{
        let str = ""
        for(let user of this.user.values()){
            str += user.toString();
            str += "\n"
        }
        
        return str;
    }
}

/////////////////CASES///////////////////////

let controller = new Controller();

//ADD USER
controller.addUser("goku");
controller.addUser("sara");
controller.addUser("tina");

//teste do controle
controller.addUser("tina");

// SEGUIR
let goku: undefined | User = controller.getUser("goku");
let sara: undefined | User = controller.getUser("sara");
let tina: undefined | User = controller.getUser("tina");

if(goku !== undefined && sara !== undefined){
    goku.follow(sara);
}
if(goku !== undefined && tina !== undefined){
    goku.follow(tina);
}
if(sara !== undefined && tina !== undefined){
    sara.follow(tina);
}

//teste do controle
if(sara !== undefined && tina !== undefined){
    sara.follow(sara);
}

//TWITAR
controller.sendTweet("sara", "hoje estou triste");
controller.sendTweet("tina", "ganhei chocolate");
controller.sendTweet("sara", "partiu ru");
controller.sendTweet("tina", "chocolate ruim");
controller.sendTweet("goku", "internet maldita");



//LIKES
if(sara !== undefined){
    sara.like(1);
}
if(goku !== undefined){
    goku.like(1);
}
if(sara !== undefined){
    sara.like(3);
}

//UNFOLLOW
if(goku !== undefined){
    goku.unfollow("tina");
}

//RETWITAR
controller.sendRt("sara", 3, "olha goku, ela não gostou do seu chocolate");

//REMOVER USUARIO
controller.rmUser("tina")

//IMPRESSÃO
console.log(controller.toString());
if(goku !== undefined){
    console.log("Timeline de Goku:")
    console.log ("" + goku.getInbox());
}
if(tina !== undefined){
    console.log("Timeline de Tina:")
    console.log ("" + tina.getInbox());
}
if(sara !== undefined){
    console.log("Timeline de Sara:")
    console.log ("" + sara.getInbox());
}
