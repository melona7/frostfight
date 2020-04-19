let new_text;
let instruction_text;

class question extends Phaser.Scene {
    constructor() {
        super('questionScene');
    }

    preload() {
        // empty
        // all assets preloaded in splash.js
    }
    create() {
        instruction_text = 
        "1. Check out the panel on the top of the game screen for your assigned destination under 'Location'. This is the building you will need to find before time runs out! \n\n" +
        "2. Use the arrow keys to navigate around the map. You have 45 seconds to get to your destination, or you will freeze and lose the game! \n\n" +
        "3. Step on the star in front of a building to learn what building it is and a fun fact about it. The game timer will pause while you are stopped at a star. \n\n" +
        "4. Running low on time? Some buildings are 'hot spots'. By stepping on the star at a hot spot, you earn 5 extra seconds on the timer. You can only get extra time from each hot spot once per game. \n\n" +
        "5. Beware of the M on the diag - stepping on it is equivalent to failing both the game and your first blue book exam! \n\n" + 
        "6. If you get to your destination before time runs out, you've won the game! Winter in Michigan will be no problem for you.\n\n";

        let instruction_title = "INSTRUCTIONS \n*(press any arrow key to resume game)* \n\n";
        
        // area surrounding text box is transparent so game is visible
        this.cameras.main.transparent = true;

        // popup background
        graphics = this.add.graphics();
        var drop_shadow = graphics.fillStyle(0x000000, 0.75);

        //  32px radius on the corners
        drop_shadow.fillRoundedRect(25, 90, 750, 430, 5);
        
        // text settings
        this.add
        .text(200, 110, instruction_title, {
        font: "20px monospace",
        fill: "#ffffff",
        align: 'center',
        wordWrap: {width: 700},
        });

        new_text = this.add
        .text(60, 170, instruction_text, {
        font: "16px monospace",
        fill: "#ffffff",
        align: 'left',
        wordWrap: {width: 700},
        });
    }

    update() {
        // display instructions text
        new_text.setText(instruction_text);
        // resume game on arrow key press
        if (cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.scene.resume('gameScene');
            // pause game timer, but panel remains accessible
            pause_time = false;
            this.scene.sendToBack('questionScene');
            
        }
    }
}