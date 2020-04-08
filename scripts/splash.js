class splash extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload() {
        this.load.image('background', 'assets/Frostfight.png');
        //this.load.image('title', 'assets/title3.png');
        /* PLAYER SPRITE ASSESTS */
        this.load.atlas("title_atlas", "sprites/title/title_sheet.png", 
        "sprites/title/title_sheet.json");
    }
    create() {
        var bg = this.add.sprite(0,0,'background');
        bg.setOrigin(0,0);



        let graphics = this.add.graphics();

        graphics.fillStyle(0x000080, 1);

        graphics.fillRect(350, 400, 115, 40);

   

        //this.add.sprite(400, 200, 'title');
        var title_an = this.physics.add.sprite(400, 200, "title_atlas", "frame_00.png");

        const anims = this.anims;
        anims.create({
            key: "title",
            frames: anims.generateFrameNames("title_atlas", { prefix: "frame_", suffix: '.png', start: 0, end: 21, zeroPad: 2 }),
            frameRate: 5,
            repeat: 0
        });

        title_an.anims.play('title');


        var text = this.add.text(360,410, 'Start game');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());

        var title = this.add.text(215, 235, 'A Race Against Winter', {font: '30px Courier', fill: '#ffffff'});
        //var subtitle = this.add.text(10, 130, '(no lost freshman were harmed and/or frozen in the creation of this game)', {font: '18px Courier', fill: '#ffffff'});


    }
    update() {

    }
    clickButton() {
        this.scene.switch('gameScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
    }   

}