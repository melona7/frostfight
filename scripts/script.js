/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Subtle Patterns
 */
let gameOptions = {
    initialTime: 60
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#222222",
    parent: "game-container",
    pixelArt: true,
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 } // Top down game, so no gravity
        }
    }, 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);
  let cursors;
let player;
let overlapObjectsGroup;
  
  function preload() {
    // "this" === Phaser.Scene

    
    this.load.image("energycontainer", "assets/heatco.png");
    this.load.image("energybar", "assets/heatba.png");
    this.load.image("tiles", "tiles/campus_set.png");
    this.load.tilemapTiledJSON("map", "tiles/CampusMap.json");
    this.load.atlas("atlas", "sprites/freshman_sprite_sheet.png", "sprites/freshman_sprite_sheet.json");
  }
  
  function create() {
    // You can access the game's config to read the width & height
   

    
    var map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage("campus_set", "tiles");
    const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "atlas", "freshman_front_standing.png")
    .setSize(16, 16)
    .setOffset(20, 50);

    player.setBounce(0.2);


    this.physics.add.collider(player, worldLayer);

    const camera = this.cameras.main;
    camera.startFollow(player);

    
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    

 
    const anims = this.anims;
  anims.create({
    key: "freshman_left_walk",
    frames: anims.generateFrameNames("atlas", { prefix: "freshman_left_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "freshman_right_walk",
    frames: anims.generateFrameNames("atlas", { prefix: "freshman_right_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "freshman_front_walk",
    frames: anims.generateFrameNames("atlas", { prefix: "freshman_front_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "freshman_back_walk",
    frames: anims.generateFrameNames("atlas", { prefix: "freshman_back_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
    frameRate: 10,
    repeat: -1
  });

  console.log(anims);

  // Set up the arrows to control the camera
  cursors = this.input.keyboard.createCursorKeys();
//   controls = new Phaser.Cameras.Controls.FixedKeyControl({
//     camera: camera,
//     left: cursors.left,
//     right: cursors.right,
//     up: cursors.up,
//     down: cursors.down,
//     speed: 0.5
//   });

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  this.physics.world.createDebugGraphic();
  const debugGraphics = this.add.graphics().setAlpha(0.75);
worldLayer.renderDebug(debugGraphics, {
  tileColor: null, // Color of non-colliding tiles
  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
});

  // Help text that has a "fixed" position on the screen
//   this.add
//     .text(16, 16, "Use arrow keys to move", {
//       font: "18px monospace",
//       fill: "#ffffff",
//       padding: { x: 20, y: 10 },
//       backgroundColor: "#000000"
//     })
//     .setScrollFactor(0);
  
    // Creating a repeating background sprite
  
    // In v3, you can chain many methods, so you can create text and configure it in one "line"
    var buildings;
    var overlapObjects = map.getObjectLayer('buildings')['objects'];
    console.log(overlapObjects);

    overlapObjectsGroup = this.physics.add.staticGroup();
    let i = 0;
    overlapObjects.forEach(object => {
    let obj = overlapObjectsGroup.create(object.x, object.y, 'buildings');
        obj.setScale(object.width/32, object.height/32); //my tile size was 32
        obj.setOrigin(0); //the positioning was off, and B3L7 mentioned the default was 0.5
        obj.body.width = object.width; //body of the physics body
        obj.body.height = object.height;

        
    });
    overlapObjectsGroup.refresh(); //physics body needs to refresh
    console.log(overlapObjectsGroup);

    
    let timeLeft = gameOptions.initialTime;

    // the energy container. A simple sprite
    let energyContainer = this.add.sprite(170, 50, "energycontainer").setScrollFactor(0);

    // the energy bar. Another simple sprite
    let energyBar = this.add.sprite(energyContainer.x + 12, energyContainer.y, "energybar").setScrollFactor(0);

    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    let energyMask = this.add.sprite(energyBar.x, energyBar.y, "energybar").setScrollFactor(0);

    // ...it's not visible...
    energyMask.visible = false;

    // and we assign it as energyBar's mask.
    energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, energyMask);

    // a boring timer.
    let gameTimer = this.time.addEvent({
        delay: 1000,
        callback: function(){
            console.log("lmao");
            timeLeft --;

            // dividing enery bar width by the number of seconds gives us the amount
            // of pixels we need to move the energy bar each second
            let stepWidth = energyMask.displayWidth / gameOptions.initialTime;

            // moving the mask
            
            energyMask.x -= stepWidth;
            console.log(energyMask.x);
            if(timeLeft == 0){
               //stop somehow lol
            }
        },
        callbackScope: this,
        loop: true
    });
 
    

  }

  function build() {
      console.log("hi");
  }
  
  function update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    // Stop any previous movement from the last frame
    const speed = 175;
  const prevVelocity = player.body.velocity.clone();
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(100);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  if (cursors.left.isDown) {
    player.anims.play("freshman_left_walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("freshman_right_walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("freshman_back_walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("freshman_front_walk", true);
  } else {
    player.anims.stop();

    // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) player.setTexture("atlas", "freshman_left_standing.png");
    else if (prevVelocity.x > 0) player.setTexture("atlas", "freshman_right_standing.png");
    else if (prevVelocity.y < 0) player.setTexture("atlas", "freshman_back_standing.png");
    else if (prevVelocity.y > 0) player.setTexture("atlas", "freshman_front_standing.png");
  }

  this.physics.add.overlap(player, overlapObjectsGroup, build, null, this);

  }