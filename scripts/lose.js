class lose extends Phaser.Scene {
  constructor() {
        super({
          key: 'loseScene'});
    }
    preload() {

    }
    create() {


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
        this.scene.sendToBack('loseScene');
        this.scene.bringToTop('gameScene');
        this.scene.start('infoScene');
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
        this.scene.start('gameScene')
        this.scene.start('panelScene');
    }   

}