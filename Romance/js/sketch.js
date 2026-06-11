let angulo = 0;                                              
let pontosDesenhados = [];        
let alfaTexto = 0;                
let coracaoPreenchido = false;
let primeiraVoltaCompleta = false;    

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2.5);
}

function draw() {
  background(10, 5, 30);

  // Pulsação sincronizada
  let pulsacao = 1 + 0.04 * sin(frameCount * 0.08);

  //  Coração principal 
  push();
  translate(width / 2, height / 2);
  rotate(PI);

  let maxAngulo = TWO_PI;

  // Continua desenhando novos pontos enquanto não completa
  if (angulo < maxAngulo){
    let x = 16 * (16 * pow(sin(angulo), 3));
    let y = 16 * (13 * cos(angulo) - 5 * cos(2 * angulo) - 2 * cos(3 * angulo) - cos(4 * angulo));

    let progressao = angulo / maxAngulo;
    let r = lerp(255, 255, progressao);
    let g = lerp(40, 100, progressao);
    let b = lerp(80, 160, progressao);

    pontosDesenhados.push({x, y, r, g, b});
    angulo += 0.020;
    
    // Verifica se completou a primeira volta
    if (angulo >= TWO_PI && !primeiraVoltaCompleta){
      primeiraVoltaCompleta = true;
    }
  } 

  else{
    coracaoPreenchido = true;
  }

  // Sempre desenha todos os pontos
  for (let i = 0; i < pontosDesenhados.length; i++){
    let ponto = pontosDesenhados[i];
    
    // Só aplica pulsação após o coração estar completo
    let xDesenhado;
    let yDesenhado;
    
    if (primeiraVoltaCompleta){
      xDesenhado = ponto.x * pulsacao;
      yDesenhado = ponto.y * pulsacao;
    } 

    else{
      xDesenhado = ponto.x;
      yDesenhado = ponto.y;
    }

    stroke(ponto.r, ponto.g, ponto.b);
    point(xDesenhado, yDesenhado);
  }

  pop();

  //  Texto  
  if (primeiraVoltaCompleta){
    alfaTexto = min(alfaTexto + 2, 255);
  }

  if (alfaTexto > 0){
    desenharTexto();
  }
}

//  Função para desenhar o texto dentro do coração 
function desenharTexto(){
  let pulsacao = 1 + 0.04 * sin(frameCount * 0.08);

  push();
  translate(width / 2, height / 2);
  scale(pulsacao);
  translate(-width / 2, -height / 2);
  textAlign(CENTER, CENTER);
  noStroke();

  textSize(16);
  fill(255, 235, 245, alfaTexto);
  text("Você é meu lar favorito,", width / 2, height / 2 - 25);

  textSize(16);
  fill(255, 210, 230, alfaTexto);
  text("meu sorriso mais bonito", width / 2, height / 2 + 5);

  textSize(16);
  fill(255, 190, 215, alfaTexto);
  text("e o meu amor maior. 💕", width / 2, height / 2 + 35);

  textSize(19);
  fill(255, 200, 220, alfaTexto);
  text("✦  Feliz Dia dos Namorados  ✦", width / 2, height / 2 + 80);
  pop();
}