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

        let graphics = this.add.graphics();

        graphics.fillStyle(0x000080, 1);

        graphics.fillRect(350, 400, 115, 40);

        var text = this.add.text(360,410, 'Start game');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());

        var title = this.add.text(100, 100, 'Frostfight: A Race Against Winter', {font: '30px Courier', fill: '#ffffff'});
        var subtitle = this.add.text(10, 130, '(no lost freshman were harmed and/or frozen in the creation of this game)', {font: '18px Courier', fill: '#ffffff'});


    }
    update() {

    }
    clickButton() {
        this.scene.switch('gameScene');
        this.scene.start('panelScene');
    }   

}