//let new_cursors;

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

    	this.cameras.main.setViewport(250, 150, 300, 300);
        this.cameras.main.setBackgroundColor('#000000');

    	var handle = 'window' + this.count++;

        console.log(xcoord, ycoord);

        var win = this.add.zone(xcoord, ycoord, this.width, this.height).setInteractive().setOrigin(0);

        let message = "hello there, press any arrow key to continue playing";
        this.add.text(xcoord, ycoord, message);

        //var demo = new func(handle, win);

        this.input.setDraggable(win);

        win.on('drag', function (pointer, dragX, dragY) {

            this.x = dragX;
            this.y = dragY;

            //demo.refresh()

        });

        cursors = this.input.keyboard.createCursorKeys();

        //this.scene.add(handle, demo, true);
    }
    update() {
        if (cursors.space.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown) {
            this.scene.resume('gameScene');
            this.scene.resume('panelScene');
            this.scene.moveDown('infoScene');
            
        }
    }
}

info.WIDTH = 300;
info.HEIGHT = 300;
