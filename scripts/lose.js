class lose extends Phaser.Scene {
  constructor() {
        super({
          key: 'loseScene'});
    }
    preload() {
      //this.load.audio("lose_music", "audio/OhioState.mp3");
    }
    create() {
      let music_config = 
      {
          mute: this.game.sound.mute,
          volume: 1,
          loop: true,
          delay: 0
      }
      lose_music.play(music_config);

      var text = this.add.text(100,100, "Oh, you lost. You wouldn't survive a winter in Ann Arbor.");
      var textlink = this.add.text(100,150, "Click here to try again");
      textlink.setInteractive({ useHandCursor: true });
      textlink.on('pointerdown', () => this.clickButton());

      this.cameras.main.setBackgroundColor("#000000");

      var text = this.add.text(300,300, "Or you could always transfer schools...");


    }
    update() {

    }
    clickButton() {
        lose_music.stop();
        this.scene.sendToBack('loseScene');
        this.scene.bringToTop('gameScene');
        this.scene.start('infoScene');
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
        this.scene.start('gameScene')
        this.scene.start('panelScene');
    }   

}