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
let next_text;
let back_text; 

let all_images = ["location", "keys", "", "", "blockm", "snow"];
class instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    preload() {
    }
    create() {

        // instructions array index
        index = 0;

        // style
        this.cameras.main.setBackgroundColor("#000000");
        
        // start, next, back buttons
        next_text = this.add.text(660,470, 'next');
        back_text = this.add.text(100,470, 'back');
        back_text.setColor("#333333");
        var start = this.add.image(400,470, 'start_alt');
    
        // title
        this.add.text(200, 60, "HOW TO PLAY", {font: "22px monospace"});

        // instruction
        instr = this.add.text(200, 120, all_instructions[index], {wordWrap: {width: 400}
        });

        // initial img
        img = this.add.sprite(400, 300, all_images[index]);

        // functions for the buttons
        next_text.setInteractive({ useHandCursor: true });
        next_text.on('pointerdown', () => this.next());

        back_text.setInteractive({ useHandCursor: true });
        back_text.on('pointerdown', () => this.back());

        start.setInteractive({ useHandCursor: true });
        start.on('pointerdown', () => this.go());


        // fade alpha initial
        instr.alpha = 1;
        img.alpha = 1;

        // home button
        var home_link = this.add.image(740, 60, 'home_alt');
        home_link.setInteractive({ useHandCursor: true });
        home_link.on('pointerdown', () => this.home());

        
        /* Animation for the stars and fire */
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
        
        // while index is still in range
        if (index < all_instructions.length - 1) {
            index += 1;

            // fade style
            this.tweens.add({
                targets: instr, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);

            // enable back button
            if (index > 0) {
                back_text.setColor("#ffffff");
            }
            // disable next button
            if (index == all_instructions.length - 1) {
                next_text.setColor("#333333");
            }
            
            // set instructions text
            instr.setText(all_instructions[index]);

            // destroy old image
            img.destroy(true);

            // add animated sprites for these instructions
            if (index == 3) {
                img = this.physics.add.sprite(400, 330, "fire_atlas", "fire_0.png").play("fire", true);
            }
            else if (index == 2) {
                img = this.physics.add.sprite(400, 330, "star_atlas", "star_0.png");
                img.setScale(3, 3);
                img.play("star", true);
            }
            else {
                // else add images
                img = this.add.sprite(400, 330, all_images[index]);
            }
            
            // fade style for img
            this.tweens.add({
                targets: img, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);
   
            // finishing alpha
            img.alpha = 0;
            instr.alpha = 0;
        }
    }

    back() {

        // while index is still in range
        if (index > 0) {
            index -= 1;

            // fade style
            this.tweens.add({
                targets: instr, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);

            // enable next button
            if (index < all_instructions.length-1) {
                next_text.setColor("#ffffff");
            }
            // disable back button
            if(index == 0) {
                back_text.setColor("#333333");
            }

            // set instruction text
            instr.setText(all_instructions[index]);
            
            // destroy old img
            img.destroy(true);

            // add animations for these instructions
            if (index == 3) {
                img = this.physics.add.sprite(400, 330, "fire_atlas", "fire_0.png").play("fire", true);
            }
            else if (index == 2) {
                img = this.physics.add.sprite(400, 330, "star_atlas", "star_0.png").play("star", true);
                img.setScale(3, 3);
            }
            else {
                // or just img
                img = this.add.sprite(400, 330, all_images[index]);
            }

            // fade style for imgs
            this.tweens.add({
                targets: img, 
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
              }, this);
   
            // ending alpha
            img.alpha = 0;
            instr.alpha = 0;
        }

    }
    home() {
        // go to home
        this.scene.sendToBack('instructionsScene');
        this.scene.stop('instructionsScene');
        this.scene.start('titleScene');
        this.scene.bringToTop('titleScene');
        this.scene.switch('titleScene');
        
    }
    go() {
        // route to level page
        this.scene.start('levelScene');
        this.scene.bringToTop('levelScene');

    }
}