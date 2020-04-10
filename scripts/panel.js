var graphics;

let gameOptions = {
  initialTime: 45
}
let sound_button;
let mute_button;
let home_button;
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
    }
    create() {
        
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

        sound_button = this.add.sprite(723, 35, 'soundon');
        // start with sound muted if carried over from previous game
        if (this.game.sound.mute) {
            mute_button = this.add.image(723, 35, 'muted');
            mute_button.setDisplaySize(40, 40);
            mute_button.setInteractive({ useHandCursor: true });
            mute_button.on('pointerdown', () => this.mute_unmute());
        }
        //sound_button.setDisplaySize(40, 40);
        sound_button.setInteractive({ useHandCursor: true });
        sound_button.on('pointerdown', () => this.mute_unmute());
        // sound_button.inputEnabled = true;
        // sound_button.events.onInputDown.add(mute_unmute, this);

        console.log("panel loc", loc);
      
      graphics = this.add.graphics();

      graphics.lineStyle(2, 0x000000, 2);
  
      //  32px radius on the corners
      graphics.strokeRoundedRect(1, 1, 798, 70, 0);

      this.add
      .text(250, 27, "Time Left:", {
        font: "18px monospace",
        fill: "#000000",
      })

      this.add
      .text(400, 14, "Location:", {
        font: "18px monospace",
        fill: "#000000",
      })
      destination = this.add
                    .text(400, 32, "", {
                        font: "18px monospace",
                        fill: "#000000",
                        wordWrap: {width: 250}
                      })

      home_button = this.add.sprite(670, 35, "home");
      home_button.setInteractive({ useHandCursor: true });
      home_button.on('pointerdown', () => this.home());
      //this.add.sprite(723, 35, "soundon");
      this.add.sprite(770, 35, "question");
    
      //var text = this.add.text(50,50, 'scene2!');
      timeLeft = gameOptions.initialTime;

      // the energy container. A simple sprite
      let heatContainer = this.add.sprite(130, 35, "heatcontainer").setScrollFactor(0);

      // the energy bar. Another simple sprite
      let heatBar = this.add.sprite(heatContainer.x + 11, heatContainer.y, "heatbar").setScrollFactor(0);

      // a copy of the energy bar to be used as a mask. Another simple sprite but...
      heatMask = this.add.sprite(heatBar.x, heatBar.y, "heatbar").setScrollFactor(0);

      // ...it's not visible...
      heatMask.visible = false;

      // and we assign it as energyBar's mask.
      heatBar.mask = new Phaser.Display.Masks.BitmapMask(this, heatMask);

      time_text = this.add
      .text(360, 27, "60", {
        font: "18px monospace",
        fill: "#000000",
      })

      // a boring timer.
      let gameTimer = this.time.addEvent({
          delay: 1000,
          callback: function(){
              //console.log("lmao");
              timeLeft --;

              // dividing enery bar width by the number of seconds gives us the amount
              // of pixels we need to move the energy bar each second
              stepWidth = heatMask.displayWidth / gameOptions.initialTime;

              // moving the mask
              
              heatMask.x -= stepWidth;
              //console.log(energyMask.x);
              if(timeLeft == 0){
                //stop somehow lol
                this.scene.switch('loseScene');
                this.scene.bringToTop('loseScene');
                //this.scene.moveDown('gameScene');
                //this.scene.stop('panelScene');
                this.scene.stop('infoScene');
                music.stop();
                cursors.right.enable = false;
                cursors.left.enable = false;
                cursors.up.enable = false;
                cursors.down.enable = false;

              }
          },
          callbackScope: this,
          loop: true
      });
      
    }

    
    update() {

      time_text.setText(timeLeft);

      if(loc) {
        destination.setText(BUILDINGS[loc]["display_name"]);
      }

    }

    mute_unmute() {
        //sound_button.destroy();
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

    home() {
      this.scene.stop('gameScene');
      this.scene.stop('panelScene');
      music.stop();
      this.scene.switch('titleScene');
      this.scene.bringToTop('titleScene');
    }


}



