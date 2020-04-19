let info_text;

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

        graphics = this.add.graphics();
        var drop_shadow = graphics.fillStyle(0x000000, 0.5);

        //  32px radius on the corners
        drop_shadow.fillRoundedRect(260, 210, 300, 200, 5);

        graphics.lineStyle(2, 0x000000, 2);
  
      //  32px radius on the corners
        graphics.strokeRoundedRect(248, 198, 305, 205, 5);
        graphics.fillStyle(0xffffff, 1);

        //  32px radius on the corners
        graphics.fillRoundedRect(250, 200, 300, 200, 5);

        console.log(popup_text);
        console.log("LOC 2", loc);

        info_text = this.add.text(260, 210, popup_text, {
	        font: "18px monospace",
	        fill: "#000000",
	        align: 'left',
	        wordWrap: {width: 290},
    	})

        var handle = 'window' + this.count++;

        console.log(xcoord, ycoord);

        var win = this.add.zone(250, 150, 300, 300).setInteractive().setOrigin(0);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

        });

        cursors = this.input.keyboard.createCursorKeys();
    }
    update() {

        info_text.setText(popup_text);

        if (cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.scene.resume('gameScene');
            this.scene.resume('panelScene');
            this.scene.sendToBack('infoScene');
            
        }
    }
}

info.WIDTH = 300;
info.HEIGHT = 300;
