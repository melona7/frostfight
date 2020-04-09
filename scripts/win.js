class win extends Phaser.Scene {
    constructor() {
        super('winScene');
    }
    preload() {

    }
    create() {

      var wintext = this.add.text(100,100, 'Go Blue! You won.');
      var text = this.add.text(300,300, 'Click here to play again');
      text.setInteractive({ useHandCursor: true });
      text.on('pointerdown', () => this.clickButton());

      this.cameras.main.setBackgroundColor("#000000");
    }
    update() {

    }
    clickButton() {
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
  		  this.scene.bringToTop('gameScene');
  		  this.scene.sendToBack('winScene');
        this.scene.start('gameScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
    }   
}