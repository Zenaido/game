import Phaser from 'phaser'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  spawnPipe: spawnPipe,
  scene: {
      preload: preload,
      create: create,
      update: update,
      
  }
};

var game = new Phaser.Game(config);


var player;
function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.image('bird','assets/flappy.png');
  this.load.image('pipe','assets/pipe.png');


}

var platforms;
var pipes;
function spawnPipe(){
  console.log('howdy')
  let pipe = this.physics.add.sprite(1000,600,'pipe');
  let scale = Math.random() * 2.5;
  pipe.body.setEnable(true)
  pipe.body.setSize(100, scale)
  // pipe.body.setGravity(0,0);
  
  pipe.body.reset(1000,600);

  // pipe.setPosition(1000,600);

  pipe.body.setAllowGravity(false);
  pipe.body.setVelocityX(-100);
  // pipe.setCollideWorldBounds(true);
  let topPipe = this.physics.add.sprite(1000,600,'pipe');
  topPipe.body.setEnable(true)
  topPipe.body.setSize(100,scale);

  // topPipe.setPosition()
  // topPipe.setPosition(1000, pipe.body.top - 200)
  topPipe.body.reset(1000, pipe.body.top - 200);
  topPipe.setScale(-1,-1);
  topPipe.body.setAllowGravity(false);
  topPipe.body.setVelocityX(-100)
  console.log(topPipe.body.physicsType);

  
  pipes.add(pipe);
  pipes.add(topPipe);

}
function create ()
{

  
    this.add.image(400, 300, 'sky');
    console.log("howdy")
    this.spawnPipe = spawnPipe.bind(this);
    player = this.physics.add.sprite(100,100,'bird');
    player.setBounce(0.2);
    player.setScale(0.2)
    player.setCollideWorldBounds(true);
    player.setMaxVelocity(0,200);
    player.body.setGravityY(300);


    pipes = this.add.group()
    
    


    // this.physics.add.collider(pipes, platforms);


    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    spaceBar.on('down', ()=>{
      player.setVelocity(0,player.body.velocity.y - 400);
    })
    this.physics.add.overlap(player,pipes, () => {
      console.log('You lost');
    })
    setInterval(() => {this.spawnPipe()},5000);
}

function update ()
{
  player.setAngle(45 * player.body.velocity.y/200);
  pipes.getChildren().forEach((pipe) => {
    // console.log(pipe.body);
    if (pipe.body.x < -100){
      pipes.remove(pipe);
    }
  })
}