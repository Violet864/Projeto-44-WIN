var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGrp;
var heart1, heart1Img, heart2, heart2Img, heart3, heart3Img;
var bullet, bulletImg, bulletGrp;
var winSound, loseSound;
var winSin = false;  
var loseSin = false;

var score = 0
var bulletsNiv = 36
var life = 3

var gameState = "PLAY"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet.png")
  winSound = loadSound("assets/win.mp3")
  loseSound = loadSound("assets/lose.mp3")
  
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


   zombieGrp = new Group()
   bulletGrp = new Group()

   heart3 = createSprite(1100,80,20,20)
   heart3.addImage(heart3Img)
   heart3.scale = 0.3
   

   heart2 = createSprite(1100,80,20,20)
   heart2.addImage(heart2Img)
   heart2.scale = 0.3
   

   heart1 = createSprite(1100,80,20,20)
   heart1.addImage(heart1Img)
   heart1.scale = 0.3
   
   edge = createEdgeSprites();
}



function draw() {
  background(0); 
 player.collide(edge)



  
drawSprites();
textSize(20);
    fill(255);
    text("Kill : "+ score,10,30);

textSize(20);
fill(255);
text("Bullets : "+bulletsNiv,200,30)




  if(gameState === "PLAY"){
  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }


  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if(keyWentDown("space")){
  
    player.addImage(shooter_shooting)
    bullet = createSprite(player.x+40, player.y-30, 10,10)
    bullet.velocityX = 20
    bullet.addImage(bulletImg)
    bullet.scale = 0.02
    bulletGrp.add(bullet)
    bulletsNiv = bulletsNiv-1
    
  
  }

  if(zombieGrp.isTouching(player)){
    for(i=0 ; i<zombieGrp.length; i++){
      if(zombieGrp[i].isTouching(player)){
        zombieGrp[i].destroy()
        life = life-1

      }

    }


  }

  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
    
  }

  if(zombieGrp.isTouching(bulletGrp)){
    for(i=0 ; i<zombieGrp.length; i++){
      if(zombieGrp[i].isTouching(bulletGrp)){
        zombieGrp[i].destroy()
        bulletGrp.destroyEach()
        score = score+2

      }

    }

  }

  if(life ===3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }

  if(life ===2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }

  if(life ===1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }

  if(life ===0){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = false

    gameState = "END"
  }


  spawnZombies();

  if(score === 36){
    gameState = "WIN"

  }
  if(bullet ===0){
    gameState = "BULLET"
  }
  }
  
  if(gameState === "END"){
    background("white")
    textSize(50);
    fill("black");
    text("NO MORE LIVES 💀",490,550);
    player.destroy()
    zombieGrp.destroyEach()

    restart()
    if(!loseSin && !loseSound.isPlaying()){
      loseSound.play()
      loseSin = true
    }
    


  }
  if(gameState === "WIN"){
    background("white")
    textSize(50);
    fill("purple");
    text("THE WINNER OF THE YEAR 🎉",300,550);
    player.destroy()
    zombieGrp.destroyEach()
    win()
    if(!winSin && !winSound.isPlaying()){
      winSound.play()
      winSin = true
    }
    
  }
  if(gameState === "BULLET"){
    background("white")
    textSize(50);
    fill("red");
    text("LOOK WHO HAS NO MORE BULLETS 😂",300,550);
    player.destroy()
    zombieGrp.destroyEach()
    restart()
    if(!loseSin && !loseSound.isPlaying()){
      loseSound.play()
      loseSin = true
    }
  }
}
function spawnZombies(){
  if(frameCount % 50 ==0){
    zombie = createSprite(random(400,1000),random(400,600),40,20)
    zombie.velocityX = -3
    zombie.addImage(zombieImg)
    zombie.scale = 0.09
    zombie.debug = false
    zombie.setCollider("rectangle", 0,0,400,1000)
    zombieGrp.add(zombie)
    zombie.lifetime = 1000/3
  }
}
function restart() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
         "https://upload.wikimedia.org/wikipedia/pt/7/73/Trollface.png",
      imageSize: "150x150",
      confirmButtonText: "Try Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function win() {
  swal(
    {
      title: `Badass!!!`,
      text: "Thanks for playing!!",
      imageUrl:
         "data:image/jpeg;base64,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",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}