class panel extends Phaser.Scene {
    constructor() {
        super('panelScene');
    }

    preload() {
        this.load.image("test", "assets/heatbar.png");
    }

    create() {
        this.add.image(0, 0, "test");
    }

    update() {
        console.log("UPDATE");
    }
}