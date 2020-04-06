/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Subtle Patterns
 */

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#222222",
    parent: "game-container",
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
    }
  };
  
  const game = new Phaser.Game(config);
  
  function preload() {
    // "this" === Phaser.Scene
   
    this.load.image("tiles", "tiles/campus_set.png");
    this.load.tilemapTiledJSON("map", "tiles/CampusMap.json");
  }
  
  function create() {
    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;
    var map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage("campus_set", "tiles");
    const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    const camera = this.cameras.main;


  // Set up the arrows to control the camera
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "Arrow keys to scroll", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);
  
    // Creating a repeating background sprite
  
    // In v3, you can chain many methods, so you can create text and configure it in one "line"

  }
  
  function update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
  }