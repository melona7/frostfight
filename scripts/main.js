class mainGame extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }
    preload() {
        /* ENERGY SPRITE ASSETS */
        this.load.image("energycontainer", "assets/heatco.png");
        this.load.image("energybar", "assets/heatba.png");

        /* TILES AND MAP ASSESTS */
        this.load.image("tiles", "tiles/campus_set.png");
        this.load.tilemapTiledJSON("map", "tiles/CampusMap.json");
        
        /* PLAYER SPRITE ASSESTS */
        this.load.atlas("atlas", "sprites/freshman_sprite_sheet.png", 
        "sprites/freshman_sprite_sheet.json");

        /* STAR SPRITE ASSESTS */
        this.load.atlas("star_atlas", "sprites/star/star_sheet.png", 
        "sprites/star/star_sheet.json");

        /* AUDIO ASSETS */
        this.load.audio('background_music', "audio/FightSong.mp3");
    }

    create() {
        // add base tilemap layer (campus map)
        var map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage("campus_set", "tiles");
        const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);

        // set collision layer
        worldLayer.setCollisionByProperty({ collides: true });

        // retrieve spawn point
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

        // add player sprite
        player = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "atlas", "freshman_front_standing.png")
        .setSize(16, 16) // hitbox is 16 * 16
        .setOffset(20, 50); // hitbox is offsetted to center of sprite
    
        // added bounce if we do jumping action lol
        player.setBounce(0.2);
    
        // set collision between world and player
        collision = this.physics.add.collider(player, worldLayer);

        // have the camera follow the player
        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // activate arrow keys for player movement
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

    }
    
}
export default mainGame;