//let win_music;

class win extends Phaser.Scene {
    constructor() {
        super('winScene');
    }
    preload() {
        // empty
        // all game assets preloaded in splash.js
    }
    create() {

      // text settings
      var wintext = this.add.text(100,100, 'Go Blue! You won.');
      var text = this.add.text(300,300, 'Click here to play again');
      text.setInteractive({ useHandCursor: true });
      text.on('pointerdown', () => this.clickButton());

      this.cameras.main.setBackgroundColor("#000000");

      // start win music
      let music_config = 
      {
          mute: this.game.sound.mute,
          volume: 1,
          loop: true,
          delay: 0
      }
      win_music.play(music_config);

      // home button
      var home_link = this.add.image(400, 400, 'home_alt');
      home_link.setInteractive({ useHandCursor: true });
      home_link.on('pointerdown', () => this.homewin());
    }
    
    update() {
        // empty
    }
    
    // replay button function
    clickButton() {
        // replay: route to level page
        win_music.stop();
        console.log("MUSIC STOP");
        this.scene.start('levelScene');
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
  		this.scene.bringToTop('levelScene');
        this.scene.sendToBack('winScene');
        this.scene.stop('infoScene');
        this.scene.stop('questionScene');
        
    }  

    // home button function: route to home page
    homewin() {
        win_music.stop();
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
        this.scene.sendToBack('winScene');
        this.scene.switch('titleScene');
        this.scene.bringToTop('titleScene');
        this.scene.start('titleScene');
      } 
}