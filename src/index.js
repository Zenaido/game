import Phaser from 'phaser'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: true
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
  this.load.image('bird','assets/flappy.png');
  this.load.image('pipe','assets/pipe.png');
  this.load.image('pipe2','assets/pipe2.png');


}

var platforms;
var pipes;
function spawnPipe(){
  let pipe = this.physics.add.sprite(1000,600,'pipe');
  let scale = Math.random() * 3;

  pipe.setScale(0.5, scale)

  pipe.setOrigin(0.5,1)
  pipe.setPosition(1000,600);

  pipe.body.setAllowGravity(false);
  
  pipe.body.setVelocityX(-100);
  // pipe.setCollideWorldBounds(true);

  let topPipe = this.physics.add.sprite(1000, 600,'pipe2');
  topPipe.body.setEnable(true)

  topPipe.setScale(0.5, scale);

  topPipe.setOrigin(0.5,1)

  topPipe.setPosition(1000, 600 - (pipe.displayHeight + 200));
  topPipe.body.setAllowGravity(false);
  topPipe.body.setVelocityX(-100)


  
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