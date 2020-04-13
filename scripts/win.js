//let win_music;

class win extends Phaser.Scene {
    constructor() {
        super('winScene');
    }
    preload() {
        //this.load.audio("win_music", "audio/clapGlee.mp3");
        // this.load.image("home_alt", "assets/home_white.png");
    }
    create() {

      var wintext = this.add.text(100,100, 'Go Blue! You won.');
      var text = this.add.text(300,300, 'Click here to play again');
      text.setInteractive({ useHandCursor: true });
      text.on('pointerdown', () => this.clickButton());

      this.cameras.main.setBackgroundColor("#000000");

      // start music
      //win_music = this.sound.add('win_music');
      let music_config = 
      {
          mute: this.game.sound.mute,
          volume: 1,
          loop: true,
          delay: 0
      }
      win_music.play(music_config);

      var home_link = this.add.image(400, 400, 'home_alt');
      home_link.setInteractive({ useHandCursor: true });
      home_link.on('pointerdown', () => this.homewin());
    }
    update() {

    }
    clickButton() {
        win_music.stop();
        console.log("MUSIC STOP");
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
  		  this.scene.bringToTop('gameScene');
  		  this.scene.sendToBack('winScene');
        this.scene.start('gameScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
        
    }  
    homewin() {
        win_music.stop();
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
        this.scene.sendToBack('winScene');
        this.scene.switch('titleScene');
        this.scene.bringToTop('titleScene');
      } 
}