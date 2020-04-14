class splash extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload() {
        this.load.image('background', 'assets/Frostfight.png');
        this.load.image('start', 'assets/start_button2.png');
        this.load.image('instructions', 'assets/instructions_button2.png');
        //this.load.image('title', 'assets/title3.png');
        /* PLAYER SPRITE ASSESTS */
        this.load.atlas("title_atlas", "sprites/title/title_sheet.png", 
        "sprites/title/title_sheet.json");

        this.load.image("heatcontainer", "assets/heat_container.png");
      this.load.image("heatbar", "assets/heat_bar_final.png");

      /* AUDIO ASSETS Note: all music added here in panel*/ 
        this.load.audio('background_music', "audio/FightSongCutFinal.mp3");
        this.load.image('unmuted', "assets/unmuted.png");
        this.load.image('muted', "assets/muted.png");
        // original glee fight song
        //this.load.audio('win_music', "audio/gleeeee.mp3");
        // Glee fight song with clapping before too to celebrate the win?
        //this.load.audio('win_music', "audio/clapGlee.mp3");
        // Mr. Brightside (just in case)
        this.load.audio('win_music', "audio/MrBrightside.mp3");
        this.load.audio('lose_music', "audio/OhioStateCut.mp3");

        this.load.image("home", "assets/home.png");
        this.load.image("soundon", "assets/soundon.png");
        this.load.image("question", "assets/question.png");

         /* TILES AND MAP ASSESTS */
         this.load.image("tiles", "tiles/campus_set.png");
         this.load.tilemapTiledJSON("map", "tiles/CampusMap.json");
         
         /* PLAYER SPRITE ASSESTS */
         this.load.atlas("atlas", "sprites/freshman_sprite_sheet.png", 
         "sprites/freshman_sprite_sheet.json");
 
         /* STAR SPRITE ASSESTS */
         this.load.atlas("star_atlas", "sprites/star/star_sheet.png", 
         "sprites/star/star_sheet.json");
 
         this.load.image("blockm", "assets/block-m-maize.png");
 
 
         /* MESSAGE BOX ASSETS*/
         this.load.image("textbox", "assets/textbox.png");

         this.load.image("home_alt", "assets/home_white.png");

    }
    create() {
        var bg = this.add.sprite(0,0,'background');
        bg.setOrigin(0,0);



        // let graphics = this.add.graphics();

        // graphics.fillStyle(0x000080, 1);

        // graphics.fillRect(350, 400, 115, 40);

   

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

        var title = this.add.text(215, 235, 'A Race Against Winter', {font: '30px Courier', fill: '#ffffff'});
        //var subtitle = this.add.text(10, 130, '(no lost freshman were harmed and/or frozen in the creation of this game)', {font: '18px Courier', fill: '#ffffff'});

        this.time.addEvent({
            delay: 6000,
            callback: function() {
                var text = this.add.image(400, 360, 'instructions');
                text.setInteractive({ useHandCursor: true });
                text.on('pointerdown', () => this.clickIn());

                var start = this.add.image(400,410, 'start');
                start.setInteractive({ useHandCursor: true });
                start.on('pointerdown', () => this.clickButton());
            }, callbackScope: this,
            loop: true

        });


    }
    update() {

    }
    clickButton() {
        this.scene.start('gameScene');
        this.scene.switch('gameScene');
        this.scene.bringToTop('gameScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
    }   

    clickIn() {
        this.scene.start('instructionsScene');
        this.scene.switch('instructionsScene');
        this.scene.bringToTop('instructionsScene');


    }

}