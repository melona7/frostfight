class splash extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload() {
        this.load.image('background', 'assets/Frostfight.png');
    }
    create() {
        var bg = this.add.sprite(0,0,'background');
		bg.setOrigin(0,0);

		var text = this.add.text(100,100, 'Welcome to my game!');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());


    }
    update() {

    }
    clickButton() {
        this.scene.switch('gameScene');
        this.scene.start('panelScene');
    }   

}