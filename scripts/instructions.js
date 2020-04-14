let index = 0;
let instr;
let all_instructions = ['Check out the panel on the top of the game screen for your assigned destination \
under "Location". This is the building you will need to find before time runs out!', 
"Use the arrow keys to navigate around the map. You have 45 seconds to get to your destination, \
or you will freeze and lose the game!", 
"Running low on time? Stop by at a building where you can warm up for an extra 5 seconds. \
You can only get extra time from each warm-up building once.", 
"Step on the star in front of a building to learn what building it is and a fun fact about it.\
 The game timer will pause while you are stopped at a star.", 
 "Beware of the M on the diag - stepping on it is equivalent to failing both the game and your first blue book exam!",
"If you get to your destination before time runs out, you've won the game! \
Winter in Michigan will be no problem for you."];
class instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    preload() {
    }
    create() {

        this.cameras.main.setBackgroundColor("#000000");
        
        var next_text = this.add.text(700,470, 'next');
        var back_text = this.add.text(100,470, 'back');
        var start_text = this.add.text(400,470, 'start');
        console.log(all_instructions[index]);

        this.add.text(200, 100, "HOW TO PLAY", {font: "22px monospace"});
        instr = this.add.text(200, 200, all_instructions[index], {wordWrap: {width: 450}
        });
        next_text.setInteractive({ useHandCursor: true });
        next_text.on('pointerdown', () => this.next());

        back_text.setInteractive({ useHandCursor: true });
        back_text.on('pointerdown', () => this.back());

        back_text.setInteractive({ useHandCursor: true });
        back_text.on('pointerdown', () => this.go());


        
        instr.alpha = 1;

        var home_link = this.add.image(740, 60, 'home_alt');



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
            instr.alpha = 0;
        }

    }
}