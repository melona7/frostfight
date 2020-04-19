let easy_text;
let medium_text;
let hard_text;
let instr_text;
let game_time;

class level extends Phaser.Scene {
    constructor() {
        super('levelScene');
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor("#000000");

        instr_text = this.add.text(325, 300, 'Choose your level:');

        easy_text = this.add.text(100,470, 'Easy');
        medium_text = this.add.text(400, 470, 'Medium');
        hard_text = this.add.text(660,470, 'Hard');

        easy_text.setInteractive({ useHandCursor: true });
        easy_text.on('pointerdown', () => this.select_level('easy'));

        medium_text.setInteractive({ useHandCursor: true });
        medium_text.on('pointerdown', () => this.select_level('medium'));

        hard_text.setInteractive({ useHandCursor: true });
        hard_text.on('pointerdown', () => this.select_level('hard'));
    }

    update() {

    }

    select_level(level) {
        // set game time for level
        if (level === 'easy') {
            game_time = 120;
        }
        else if (level === 'medium') {
            game_time = 60;
        }
        // else if level === 'hard'
        else {
            game_time = 30;
        }

        console.log("SETTING GAME TIME", game_time);

        // start game
        RESET_VISITED_BUILDINGS();
        pause_time = false;
        this.scene.start('gameScene');
        this.scene.switch('gameScene');
        this.scene.bringToTop('gameScene');
        this.scene.sendToBack('levelScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
        this.scene.start('questionScene');
        this.scene.stop('levelScene');
    }
}