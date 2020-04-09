class lose extends Phaser.Scene {
	constructor() {
        super({
        	key: 'loseScene'});
    }
    preload() {

    }
    create() {


      var text = this.add.text(100,100, 'Oh, you lost. Want to try again?');
      text.setInteractive({ useHandCursor: true });
      text.on('pointerdown', () => this.clickButton());

      this.cameras.main.setBackgroundColor("#000000");

    }
    update() {

    }
    clickButton() {
        this.scene.stop('gameScene');
        this.scene.stop('panelScene');
        this.scene.switch('gameScene');
        this.scene.start('gameScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
    }   

}