var graphics;
let sound_button;
let mute_button;
let home_button;
let question_button;
let timeLeft;
let time_text;
let music;
let win_music;
let lose_music;
let heatMask;
let stepWidth;
let destination;


class panel extends Phaser.Scene {
    constructor() {
        super('panelScene');
    }
    preload() {
      // empty
      // all assets preloaded in splash.js
    }
    create() {
        // Note: initial_game_time defined by user's level selection in level.js
        timeLeft = initial_game_time;

        // start music
        music = this.sound.add('background_music');
        win_music = this.sound.add('win_music');
        lose_music = this.sound.add('lose_music');
        let music_config = 
        {
            mute: false,
            volume: 1,
            loop: true,
            delay: 0
        }
        music.play(music_config);

        // panel sound button (mute / unmute)
        sound_button = this.add.sprite(723, 35, 'soundon');
        
        // start with sound muted if carried over from previous game
        if (this.game.sound.mute) {
            mute_button = this.add.image(723, 35, 'muted');
            mute_button.setDisplaySize(40, 40);
            mute_button.setInteractive({ useHandCursor: true });
            mute_button.on('pointerdown', () => this.mute_unmute());
        }
        sound_button.setInteractive({ useHandCursor: true });
        sound_button.on('pointerdown', () => this.mute_unmute());
              
        graphics = this.add.graphics();

        graphics.lineStyle(2, 0x000000, 2);
  
        //  32px radius on the corners
        graphics.strokeRoundedRect(1, 1, 798, 70, 0);

        // time display on panel
        this.add
        .text(245, 27, "Time Left:", {
            font: "18px monospace",
            fill: "#000000",
        })

        // location display on panel
        this.add
        .text(415, 14, "Location:", {
            font: "18px monospace",
            fill: "#000000",
        })
        destination = this.add
                        .text(415, 32, "", {
                            font: "18px monospace",
                            fill: "#000000",
                            wordWrap: {width: 250}
                        })

        // panel home button
        home_button = this.add.sprite(670, 35, "home");
        home_button.setInteractive({ useHandCursor: true });
        home_button.on('pointerdown', () => this.home());

        // panel question button
        question_button = this.add.sprite(770, 35, "question");
        question_button.setInteractive({ useHandCursor: true });
        question_button.on('pointerdown', () => this.question());

        // the energy container
        let heatContainer = this.add.sprite(130, 35, "heatcontainer").setScrollFactor(0);

        // the energy bar
        let heatBar = this.add.sprite(heatContainer.x + 11, heatContainer.y, "heatbar").setScrollFactor(0);

        // use copy of energy bar as mask
        heatMask = this.add.sprite(heatBar.x, heatBar.y, "heatbar").setScrollFactor(0);

        // mask blocks energy bar as it moves
        heatMask.visible = false;
        heatBar.mask = new Phaser.Display.Masks.BitmapMask(this, heatMask);

        // initialize time display
        time_text = this.add
        .text(355, 27, "60", {
        font: "18px monospace",
        fill: "#000000",
        })

        // game timer, updates every second counting down
        let gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                // check that game timer is not paused (i.e. player is not at building or reading instructions)
                if (!pause_time) {  
                    timeLeft --;

                    // dividing enery bar width by the number of seconds gives us the amount
                    // of pixels we need to move the energy bar each second
                    stepWidth = heatMask.displayWidth / initial_game_time;

                    // moving the mask
                    heatMask.x -= stepWidth;
                    
                    // if player runs out of time: LOSE
                    if(timeLeft == 0){
                        // route to lose scene and reset game
                        RESET_VISITED_BUILDINGS();
                        this.scene.switch('loseScene');
                        this.scene.bringToTop('loseScene');
                        this.scene.stop('infoScene');
                        music.stop();
                        // disable arrow keys to avoid movement error
                        cursors.right.enable = false;
                        cursors.left.enable = false;
                        cursors.up.enable = false;
                        cursors.down.enable = false;
                    }

                }
            },
            callbackScope: this,
            loop: true
        });
      
    }

    
    update() {

        // initialize remaining time on game timer
        time_text.setText(timeLeft);

        // once location has been set (by main.js)
        if(loc) {
            // display location in panel
            destination.setText(BUILDINGS[loc]["display_name"]);
        }

    }

    // sound button function
    mute_unmute() {
        // unmute
        if (this.game.sound.mute) {
            console.log("Sound muted");
            this.game.sound.mute = false;
            mute_button.destroy();
        }
        // mute
        else {
            console.log("sound on");
            this.game.sound.mute = true;
            mute_button = this.add.image(723, 35, 'muted');
            mute_button.setDisplaySize(40, 40);
            mute_button.setInteractive({ useHandCursor: true });
            mute_button.on('pointerdown', () => this.mute_unmute());
        }
    }

    // home button function: route to home page (reset game)
    home() {
      RESET_VISITED_BUILDINGS();
      this.scene.stop('gameScene');
      this.scene.stop('panelScene');
      music.stop();
      this.scene.switch('titleScene');
      this.scene.bringToTop('titleScene');
      this.scene.start('titleScene');
    }

    // question mark button function: show instructions
    question() {
        this.scene.pause('gameScene');
        //this.scene.pause('panelScene');
        // keep panel live, just pause time
        pause_time = true;
        this.scene.bringToTop('questionScene');

    }


}



