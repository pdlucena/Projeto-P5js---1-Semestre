let x = [];
let y = [];
let vx = [];
let vy = [];
let cor = [];
let raio = 25;
function setup(){
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 2000; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    cor[i] = color(random(255), random(255), random(255));
  }
}
function draw(){
  background(0, 80);

  fill(255);

  for (let i = 0; i < 2000; i++){
    x[i] += vx[i];
    y[i] += vy[i];
    if (x[i] >= width - raio || x[i] <= raio){
      vx[i] *= -1;
    }
    if (y[i] >= height - raio || y[i] <= raio){
      vy[i] *= -1;
    }
    vx[i] *= 0.98;
    vy[i] *= 0.98;
    let distancia = dist(mouseX, mouseY, x[i], y[i]);
    if (distancia < raio){

      // esse atan2 serve para calcular o angulo
      let angulo = atan2(y[i] - mouseY, x[i] - mouseX);
      vx[i] = cos(angulo) * 7;
      vy[i] = sin(angulo) * 7;
    }

    // esse abs serve para transformar numeros negativos em positivos
    let velocidade = abs(vx[i]) + abs(vy[i]);

    if (velocidade > 0.1){
      fill(cor[i]);
    }

    else{
      fill(0);
    }

    noStroke();
    circle(x[i], y[i], raio * 2);
  }

}