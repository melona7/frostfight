var graphics;

let gameOptions = {
  initialTime: 45
}
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
      // this.load.image("heatcontainer", "assets/heat_container.png");
      // this.load.image("heatbar", "assets/heat_bar_final.png");

      // /* AUDIO ASSETS Note: all music added here in panel*/ 
      //   this.load.audio('background_music', "audio/FightSongCutFinal.mp3");
      //   this.load.image('unmuted', "assets/unmuted.png");
      //   this.load.image('muted', "assets/muted.png");
      //   // original glee fight song
      //   //this.load.audio('win_music', "audio/gleeeee.mp3");
      //   // Glee fight song with clapping before too to celebrate the win?
      //   //this.load.audio('win_music', "audio/clapGlee.mp3");
      //   // Mr. Brightside (just in case)
      //   this.load.audio('win_music', "audio/MrBrightside.mp3");
      //   this.load.audio('lose_music', "audio/OhioStateCut.mp3");

      //   this.load.image("home", "assets/home.png");
      //   this.load.image("soundon", "assets/soundon.png");
      //   this.load.image("question", "assets/question.png");
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
      question_button = this.add.sprite(770, 35, "question");
      question_button.setInteractive({ useHandCursor: true });
      question_button.on('pointerdown', () => this.question());
    
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
                RESET_VISITED_BUILDINGS();
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
      RESET_VISITED_BUILDINGS();
      this.scene.stop('gameScene');
      this.scene.stop('panelScene');
      music.stop();
      this.scene.switch('titleScene');
      this.scene.bringToTop('titleScene');
      this.scene.start('titleScene');
    }

    question() {
        this.scene.pause('gameScene');
        this.scene.pause('panelScene');
        this.scene.bringToTop('questionScene');

        //this.scene.switch('infoScene');
    //     popup_text = "INSTRUCTIONS\n " +
    //     "Check out the panel on the top of the game screen for your assigned destination under 'Location'. This is the building you will need to find before time runs out!" +
    //     "Use the arrow keys to navigate around the map. You have 45 seconds to get to your destination, or you will freeze and lose the game! " +
    //    "Running low on time? Stop by at a building where you can warm up (these buildings will be indicated by …) for an extra 5 seconds. You can only get extra time from each warm-up building once." +
    //    "Step on the star in front of a building to learn what building it is and a fun fact about it. The game timer will pause while you are stopped at a star." +
    //    "Beware of the M on the diag - stepping on it is equivalent to failing both the game and your first blue book exam!" +
    //    "If you get to your destination before time runs out, you’ve won the game! Winter in Michigan will be no problem for you." +
    //    "If you run out of time, you will be forced to listen to the Ohio State fight song, but you are welcome to try playing again.";
    //     this.scene.bringToTop('infoScene');

    //     var graphics = this.make.graphics();

    //     // graphics.fillStyle(0xffffff);
    //     graphics.fillRect(152, 133, 320, 250);

    //     var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    //     //var text = this.add.text(160, 280, content, { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);

    //     popup_text.setMask(mask);

    //     //  The rectangle they can 'drag' within
    //     var zone = this.add.zone(152, 130, 320, 256).setOrigin(0).setInteractive();

    //     zone.on('pointermove', function (pointer) {

    //         if (pointer.isDown)
    //         {
    //             popup_text.y += (pointer.velocity.y / 10);

    //             popup_text.y = Phaser.Math.Clamp(popup_text.y, -400, 300);
    //         }

        // });
        
        
    //     this.cameras.main.transparent = true;
    //     graphics = this.add.graphics();
    //     var drop_shadow = graphics.fillStyle(0x000000, 0.5);

    //     //  32px radius on the corners
    //     drop_shadow.fillRoundedRect(260, 210, 300, 200, 5);

    //     graphics.lineStyle(2, 0x000000, 2);
  
    //   //  32px radius on the corners
    //     graphics.strokeRoundedRect(248, 198, 305, 205, 5);
    //     graphics.fillStyle(0xffffff, 1);

    //     //  32px radius on the corners
        // graphics.fillRoundedRect(250, 200, 300, 200, 5);
    }


}



