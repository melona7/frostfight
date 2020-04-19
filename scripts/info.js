let info_text;
let fire;

class info extends Phaser.Scene {
    constructor() {
        super({
            key: 'infoScene'});
        this.width = 300;
        this.height = 300;
    }
    preload() {
    
    }
    create() {

        this.cameras.main.transparent = true;

        // adding drop shadow
        graphics = this.add.graphics();
        var drop_shadow = graphics.fillStyle(0x000000, 0.5);
        drop_shadow.fillRoundedRect(260, 210, 300, 200, 5);

        // adding outline
        graphics.lineStyle(2, 0x000000, 2);
        graphics.strokeRoundedRect(248, 198, 305, 205, 5);
        graphics.fillStyle(0xffffff, 1);

        // adding rounded rectangle
        graphics.fillRoundedRect(250, 200, 300, 200, 5);

 
        // pop up text generated
        info_text = this.add.text(260, 210, popup_text, {
	        font: "18px monospace",
	        fill: "#000000",
	        align: 'left',
	        wordWrap: {width: 290},
    	})

       
        // create fire sprite and animations
        fire = this.physics.add.sprite(525, 370, "fire_atlas", "fire_0.png");
        fire.setScale(0.3, 0.33);
        fire.visible = false;

        const anims = this.anims;
        anims.create({
            key: "fire",
            frames: anims.generateFrameNames("fire_atlas", { prefix: "fire_", suffix: '.png', start: 0, end: 5, zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        // show sprite if hot spot
        if(showFire == true) {
            fire.visible = true;
            fire.play("fire", true);
        } else {
            fire.visible = false;
        }

        // set pop up text
        info_text.setText(popup_text);

        // resume scene
        if (cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.scene.resume('gameScene');
            this.scene.resume('panelScene');
            this.scene.sendToBack('infoScene');
            showFire = false;
            
        }
    }
}

info.WIDTH = 300;
info.HEIGHT = 300;
