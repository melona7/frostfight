let index = 0;
let instr;
let img;
let all_instructions = ['Check out the panel on the top of the game screen for your assigned destination \
under "Location". This is the building you will need to find before time runs out!', 
"Use the arrow keys to navigate around the map. You have 45 seconds to get to your destination, \
or you will freeze and lose the game!",  
"Step on the star in front of a building to learn what building it is and a fun fact about it.\
 The game timer will pause while you are stopped at a star.", 
 "Running low on time? Some buildings are 'hot spots'. By stepping on the star at a hot spot, you earn 5 extra seconds on the timer. \
You can only get extra time from each hot spot once per game.",
 "Beware of the M on the diag - stepping on it is equivalent to failing both the game and your first blue book exam!",
"If you get to your destination before time runs out, you've won the game! \
Winter in Michigan will be no problem for you."];

let all_images = ["location", "keys", "", "", "blockm", "snow"];
class instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    preload() {
    }
    create() {
        index = 0;

        this.cameras.main.setBackgroundColor("#000000");
        
        var next_text = this.add.text(660,470, 'next');
        var back_text = this.add.text(100,470, 'back');
        var start = this.add.image(400,470, 'start_alt');
        console.log(all_instructions[index]);

        this.add.text(200, 60, "HOW TO PLAY", {font: "22px monospace"});
        instr = this.add.text(200, 120, all_instructions[index], {wordWrap: {width: 400}
        });

        img = this.add.sprite(400, 300, all_images[index]);
        next_text.setInteractive({ useHandCursor: true });
        next_text.on('pointerdown', () => this.next());

        back_text.setInteractive({ useHandCursor: true });
        back_text.on('pointerdown', () => this.back());

        start.setInteractive({ useHandCursor: true });
        start.on('pointerdown', () => this.go());


        
        instr.alpha = 1;
        img.alpha = 1;

        var home_link = this.add.image(740, 60, 'home_alt');
        home_link.setInteractive({ useHandCursor: true });
        home_link.on('pointerdown', () => this.home());

        
        /* Animation for the stars */
        const anims = this.anims;
        anims.create({
            key: "fire",
            frames: anims.generateFrameNames("fire_atlas", { prefix: "fire_", suffix: '.png', start: 0, end: 5, zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "star",
            frames: anims.generateFrameNames("star_atlas", { prefix: "star_", suffix: '.png', start: 0, end: 4, zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });

    
    }
    update() {
        
    }

    next() {
        
        if (index < all_instructions.length - 1) {
            index += 1;
            this.tweens.add({
                targets: instr, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);

              
            //this.add.tween(text).to( { alpha: 0 }, 2000, "Linear", true);
            instr.setText(all_instructions[index]);
            console.log(all_images[index]);
            img.destroy(true);
            if (index == 3) {
                img = this.physics.add.sprite(400, 330, "fire_atlas", "fire_0.png").play("fire", true);
            }
            else if (index == 2) {
                img = this.physics.add.sprite(400, 330, "star_atlas", "star_0.png").play("star", true);
            }
            else {
                img = this.add.sprite(400, 330, all_images[index]);
            

            }
            this.tweens.add({
                targets: img, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);
   
            img.alpha = 0;
            instr.alpha = 0;
            
        }
        

    }
    back() {
        
        if (index > 0) {
            index -= 1;
            this.tweens.add({
                targets: instr, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);

              
            //this.add.tween(text).to( { alpha: 0 }, 2000, "Linear", true);
            instr.setText(all_instructions[index]);
            console.log(all_images[index]);
            img.destroy(true);
            if (index == 3) {
                img = this.physics.add.sprite(400, 330, "fire_atlas", "fire_0.png").play("fire", true);
            }
            else if (index == 2) {
                img = this.physics.add.sprite(400, 330, "star_atlas", "star_0.png").play("star", true);
            }
            else {
                img = this.add.sprite(400, 330, all_images[index]);
            

            }
            this.tweens.add({
                targets: img, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);
   
            img.alpha = 0;
            instr.alpha = 0;
        }

    }
    home() {
        this.scene.sendToBack('instructionsScene');
        this.scene.stop('instructionsScene');
        this.scene.start('titleScene');
        this.scene.bringToTop('titleScene');
        this.scene.switch('titleScene');
        
    }
    go() {
        RESET_VISITED_BUILDINGS();
        this.scene.start('gameScene');
        this.scene.switch('gameScene');
        this.scene.bringToTop('gameScene');
        this.scene.start('infoScene');
        this.scene.start('panelScene');
        this.scene.start('questionScene');

        //this.scene.sendToBack('instructionsScene');

    }
}