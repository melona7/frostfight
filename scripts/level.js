let easy_img;
let medium_img;
let hard_img;
let instr_text;
let initial_game_time;

class level extends Phaser.Scene {
    constructor() {
        super('levelScene');
    }

    preload() {
        // empty
        // all assets preloaded in splash.js
    }

    create() {
        // black background
        this.cameras.main.setBackgroundColor("#000000");

        instr_text = this.add.text(240, 150, 'CHOOSE YOUR LEVEL:', {font: "36px monospace"});

        // level buttons
        easy_img = this.add.sprite(200, 350, "easy");
        medium_img = this.add.sprite(400, 350, 'medium');
        hard_img = this.add.sprite(600, 350, 'hard');

        easy_img.setInteractive({ useHandCursor: true });
        easy_img.on('pointerdown', () => this.select_level('easy'));

        medium_img.setInteractive({ useHandCursor: true });
        medium_img.on('pointerdown', () => this.select_level('medium'));

        hard_img.setInteractive({ useHandCursor: true });
        hard_img.on('pointerdown', () => this.select_level('hard'));
    }

    update() {
        // empty
    }

    // level buttons function
    select_level(level) {
        // set game time for level
        if (level === 'easy') {
            initial_game_time = 120;
        }
        else if (level === 'medium') {
            initial_game_time = 60;
        }
        // else if level === 'hard'
        else {
            initial_game_time = 30;
        }


        // start game
        RESET_VISITED_BUILDINGS();
        pause_time = false;
        //this.scene.switch('gameScene');
        this.scene.bringToTop('gameScene');
        this.scene.start('gameScene');
        this.scene.sendToBack('levelScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
        this.scene.start('questionScene');
        this.scene.stop('levelScene');
    }
}