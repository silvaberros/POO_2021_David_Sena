
class personagem {
  //ATRIBUTOS
  x: number;
  y: number;
  passo: number;
  imagem: p5.Image;

  //PARAMETROS
  constructor(x: number, y: number, passo: number, imagem: p5.Image) {
    this.x = x;
    this.y = y;
    this.passo = passo;
    this.imagem = imagem;
  }

  //METODOS
  draw() {
    image(this.imagem, this.x * this.passo, this.y * this.passo, this.passo, this.passo);
  }
}

class tabuleiro {
  nl: number;
  nc: number;
  passo: number;
  background: p5.Image;

  constructor(nc: number, nl: number, passo: number, background: p5.Image) {
    this.nl = nl;
    this.nc = nc;
    this.passo = passo;
    this.background = background;
  }

  draw() {
    image(this.background, 0, 0, this.nc * this.passo, this.nl * this.passo);
    for(let x = 0; x < this.nc; x++) {
      for(let y = 0; y < this.nl; y++) {
        noFill();
        stroke(200, 200, 200);
        strokeWeight(2);
        rect(x * this.passo, y * this.passo, this.passo, this.passo);
      }
    }
  }
}

let wolf_image_D: p5.Image;
let wolf_image_E: p5.Image;
let wolf: personagem;
let rabbit_image: p5.Image;
let rabbit: personagem;
let board_image: p5.Image;
let board: tabuleiro;
let buraco: personagem;
let buraco_image: p5.Image;
let pontos: number = 50;
let contador: number = 2;

function loadImg (path: string):p5.Image {
  return loadImage(
    path,
    () => console.log("Loading" + path + "ok"),
    () => console.log("Loading" + path + "error")
  );
}

function preload() {
  board_image = loadImg('../sketch/grama.jpg');
  wolf_image_E = loadImg('../sketch/lobol.png');
  wolf_image_D = loadImg('../sketch/lobol2.png');
  rabbit_image = loadImg('../sketch/coelho.png');
  buraco_image = loadImg('../sketch/buraco.png');
}

function wolf_limit() {
  if(wolf.x == board.nc){
    wolf.x--;
  }
  if(wolf.x < 0){
    wolf.x++;
  }
  if(wolf.y == board.nl){
    wolf.y--;
  }
  if(wolf.y < 0){
    wolf.y++;
  }
}

function points(){
  if(contador == 0){
    pontos -= 5;
    contador = 2
  }

  noStroke();
  fill(250);
  rect(17, 23, 200, 35);
  noStroke();
  fill(0);
  textSize(30);
  text("Pontuação:" + " " + pontos, 20, 50);
}
////////////////////////////////////////////

function setup() {
  let size = 150;
  wolf = new personagem(floor(random(1, 5)), floor(random(1, 5)) size, wolf_image_D);
  rabbit = new personagem(floor(random(1, 5)), floor(random(1, 5)), size, rabbit_image);
  board = new tabuleiro(5, 5, size, board_image);
  buraco = new personagem(floor(random(1, 5)), floor(random(1, 5)), size, buraco_image);
  createCanvas(board.nc * size, board.nl * size);

}

function draw() {
  board.draw();
  if( wolf.x == buraco.x && wolf.y == buraco.y) {
    buraco.draw();
  }
  wolf.draw();
  if( wolf.x == rabbit.x && wolf.y == rabbit.y) {
    rabbit.draw();
  }
  wolf_limit();
  points();
  
}

function keyPressed () {
  if(keyCode === LEFT_ARROW) {
    wolf.x--;
    wolf.imagem = wolf_image_E;
    contador--;
  } else if(keyCode === RIGHT_ARROW) {
    wolf.x++;
    wolf.imagem = wolf_image_D;
    contador--;
  } else if(keyCode === UP_ARROW) {
    wolf.y--;
    contador--;
  } else if(keyCode === DOWN_ARROW) {
    wolf.y++;
    contador--;
  }  
}