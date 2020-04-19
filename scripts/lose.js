let maintain_destination = false;

class lose extends Phaser.Scene {
  constructor() {
        super({
          key: 'loseScene'});
    }
    preload() {
      // empty
      // all assets preloaded in splash.js
    }
    create() {
      // start lose music
      let music_config = 
      {
          mute: this.game.sound.mute,
          volume: 1,
          loop: true,
          delay: 0
      }
      lose_music.play(music_config);

      // text settings
      var text = this.add.text(100,100, "Oh, you lost. You wouldn't survive a winter in Ann Arbor.");
      var textlink = this.add.text(100,150, "Click here to try again");
      textlink.setInteractive({ useHandCursor: true });
      textlink.on('pointerdown', () => this.clickButton());

      this.cameras.main.setBackgroundColor("#000000");

      var text_transfer = this.add.text(300,300, "Or you could always transfer schools...");
      text_transfer.setInteractive({ useHandCursor: true });
      text_transfer.on('pointerdown', () => this.transfer());

      // home button
      var home_link = this.add.image(400, 400, 'home_alt');
      home_link.setInteractive({ useHandCursor: true });
      home_link.on('pointerdown', () => this.homelose());




    }
    update() {
      // empty
    }

    // replay button function
    clickButton() {
        // replay: route to level page
        lose_music.stop();
        this.scene.start('levelScene');
        this.scene.sendToBack('loseScene');
        this.scene.bringToTop('levelScene');
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
        this.scene.stop('questionScene');
        this.scene.stop('infoScene');
        maintain_destination = true;
    }
    
    // home button
    homelose() {
      lose_music.stop();
      this.scene.stop('gameScene');
      this.scene.stop('panelScene');
      this.scene.sendToBack('loseScene');
      this.scene.switch('titleScene');
      this.scene.bringToTop('titleScene');
      this.scene.start('titleScene');
    }

    // UCLA link to transfer
    transfer() {
      var link = "http://www.ucla.edu/admission/transfer-admission";
      var s = window.open(link, '_blank');

      if (s && s.focus)
      {
          s.focus();
      }

    }

}