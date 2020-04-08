
//let gameScene = new main; 

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: "#222222",
    parent: "game-container",
    pixelArt: true,
    scene: [splash, main],
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 } 
        }
    }, 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
  
const game = new Phaser.Game(config);
// game.scene.add('gameScene', gameScene);
// game.scene.start('gameScene');