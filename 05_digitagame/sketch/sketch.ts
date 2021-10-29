class Bolha {
  x: number;
  y: number;
  letra: string;
  velox: number;

  static raio: number = 35;
  vivo: boolean = true;

  constructor(x: number, y: number, letra: string, velox: number) {
    this.x = x;
    this.y = y;
    this.letra = letra;
    this.velox = velox;
  }

  update(): void {
    this.y += this.velox
  }

  draw(): void {
    fill(255);
    strokeWeight(3);
    stroke("red");
    circle(this.x, this.y, 2 * Bolha.raio);
    
    strokeWeight(5);
    stroke(0, 0, 250);
    fill(250, 0, 0);
    circle(this.x, this.y, Bolha.raio + 10);
    
    stroke("white");
    strokeWeight(1);
    fill("white");
    textSize(25);
    text(this.letra, this.x -5, this.y + 5);
  }
}

class Tabuleiro {
  bolhas: Bolha[];
  velox = [2, 3];
  tempo: number = 30;
  timer: number = 0
  hits: number = 0;
  erro: number = 0;

  constructor() {
    this.bolhas = [];
  }

  update(): void {
    this.checkBolhas();
    this.marcBolhasdeFora();
    for (let bolha of this.bolhas){
      bolha.update();
    }
    this.removeBolhaMorta();  
  }
  
  addBolhas() {
    let x: number = random(200, width - 2 * Bolha.raio);
    let y: number = -2 * Bolha.raio;
    let letra: string = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "z", "k", "w", "y"]);
    let velox: number = random(this.velox);
    let bolha = new Bolha(x, y, letra, velox);
    this.bolhas.push(bolha);
  }

  checkBolhas(): void {
    this.timer -= 1;
    if (this.timer <= 0) {
      this.addBolhas();
      this.timer = this.tempo;
    }
  }

  marcBolhasdeFora() {
    for(let bolha of this.bolhas){
      if(bolha.y + 2 * Bolha.raio >= height){
        bolha.vivo = false;
        this.erro++;
      }
    }
  }

  removeBolhaMorta() {
    this.bolhas = this.bolhas.filter(b => b.vivo); //codigo funcional
  //   let vivas: Bolha[] = [];
  //   for (let bolha of this.bolhas)
  //     if(bolha.vivo)
  //       vivas.push(bolha);        
  //   this.bolhas = vivas;
  }
  removeBolhaHit(code: number): void {
    for(let bolha of this.bolhas) {
      if(bolha.letra[0].toUpperCase().charCodeAt(0) === code) { //a letra maiuscula e em char
        bolha.vivo = false;
        this.hits++;
        break;
      }
    }
      
  }

  draw(): void {
    stroke(0, 0, 250);
    fill(0, 0, 250);
    textSize(30);
    text("Hits: " + this.hits, 20, 220);
    stroke(250, 0, 0);
    fill(250, 0, 0);
    text("Erros: " + this.erro, 20, 260);
    for(let bolha of this.bolhas)
      bolha.draw();
    }
}

class Jogo {
  tabuleiro: Tabuleiro;
  fase: number = 1;
  faseCor: string = "greenyellow";
  on: () => void; //(on é do tipo função e retorna void)

  constructor(){
    this.tabuleiro = new Tabuleiro();
    this.on = this.jogar;
  }

  jogar(): void {
    this.tabuleiro.update();
    this.status();
    this.fase2();
    this.fase3();

  }
  status(): void {
    background ("gold");
    fill(this.faseCor);
    strokeWeight(10);
    stroke("white");
    rect(150, 5, 645, 590);
    strokeWeight(1);
    this.tabuleiro.draw();
    strokeWeight(3);
    stroke(0, 0, 0);
    fill(this.faseCor);
    textSize(30);
    text("Fase: " + this.fase, 20, 300);
    if(this.tabuleiro.erro > 9) {
      this.on = this.fimdeJogoF;
    }
    if(this.tabuleiro.hits > 49) {
      this.on = this.fimdeJogoGG;
    }
  }
  fase2(): void {
    if(this.tabuleiro.hits == 10){
      this.tabuleiro.velox = [4, 6];
      this.fase = 2;
      this.faseCor = "yellow";
    }
  }

  fase3(): void {
    if(this.tabuleiro.hits == 20){
      this.tabuleiro.velox = [8, 10];
      this.fase = 3;
      this.faseCor = "tomato";
    }
  }

  fimdeJogoF(): void {
    background(250, 250, 250);
    fill(0, 0, 250);
    textSize(100);
    text("Fim de Jogo", 100, 300);
    let bolhaFim = new Bolha(90, 200, "F", 0);
    bolhaFim.draw();

    fill(0, 0, 250);
    textSize(70);
    text("Hits: " + this.tabuleiro.hits, 100, 400);
    fill(250, 0, 0);
    text("Erros: " + this.tabuleiro.erro, 100, 460);
  }
  fimdeJogoGG(): void {
    background(250, 250, 250);
    fill(0, 0, 250);
    textSize(100);
    text("VITÓRIA!", 170, 300);
    // let bolhaFim = new Bolha(204, 200, "gg", 0);
    // bolhaFim.draw();
    fill(255);
    strokeWeight(3);
    stroke("red");
    circle(204, 200, 2 * Bolha.raio);
    
    strokeWeight(5);
    stroke(0, 0, 250);
    fill(250, 0, 0);
    circle(204, 200, Bolha.raio + 10);
    
    stroke("white");
    strokeWeight(1);
    fill("white");
    textSize(25);
    text("GG", 184, 208);

    fill(0, 0, 250);
    textSize(70);
    text("Hits: " + this.tabuleiro.hits, 100, 400);
    fill(250, 0, 0);
    text("Erros: " + this.tabuleiro.erro, 100, 460);
  }


}


// variáveis

let bolha: Bolha;
let tabuleiro: Tabuleiro;
let jogo: Jogo;

////// funções do p5
function setup() {
  createCanvas(800, 600);
  frameRate(30);
  jogo = new Jogo();
}

function draw() {
  jogo.on();
}

function keyPressed() {
  jogo.tabuleiro.removeBolhaHit(keyCode);
}
