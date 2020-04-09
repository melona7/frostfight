let player;
let collision; 
let cursors;
let star;
let stars;
let loc = "";
let xcoord;
let ycoord;
let popup_text = "ok";
//let all_buildings = ['dana', 'mason', 'hatcher', 'ugli', 'west quad', 'north quad', 'randall', 'seb',];
//let all_buildings = "hey there";
class main extends Phaser.Scene {
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


        /* MESSAGE BOX ASSETS*/
        this.load.image("textbox", "assets/textbox.png");
    }

    create() {
        let all_buildings = Object.keys(BUILDINGS);
        console.log("possible keys", all_buildings);
        var value = Phaser.Math.Between(0, all_buildings.length - 1);
        loc = all_buildings[value];
        console.log("random loc", loc);
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
        //const camera = this.cameras.add(0, 0, 800, 500);
        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setViewport(0, 70, 800, 500);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // activate arrow keys for player movement
        cursors = this.input.keyboard.createCursorKeys();


        /* ANIMATION FOR THE PLAYER SPRITE */
        const anims = this.anims;
        anims.create({
          key: "freshman_left_walk",
          frames: anims.generateFrameNames("atlas", { prefix: "freshman_left_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "freshman_right_walk",
          frames: anims.generateFrameNames("atlas", { prefix: "freshman_right_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "freshman_front_walk",
          frames: anims.generateFrameNames("atlas", { prefix: "freshman_front_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "freshman_back_walk",
          frames: anims.generateFrameNames("atlas", { prefix: "freshman_back_walk", suffix: '.png', start: 1, end: 2, zeroPad: 1 }),
          frameRate: 10,
          repeat: -1
        });

        /*star hit points */
        var hitPoints = map.getObjectLayer('buildings')['objects'];
        stars = this.physics.add.group();

        /* Animation for the stars */
        const star_anims = this.anims;
        star_anims.create({
            key: "star",
            frames: anims.generateFrameNames("star_atlas", { prefix: "star_", suffix: '.png', start: 0, end: 4, zeroPad: 1 }),
            frameRate: 10,
            repeat: -1
        });

        // for each star, put into star group
        hitPoints.forEach(object => {
            star = this.physics.add
            .sprite(object.x, object.y, "star_atlas", "star_0.png").play("star", true);
            star.name = object.name;
            console.log(star.name);
            stars.add(star);
        });

        // set overlap with player and stars
        this.physics.add.overlap(player, stars, this.build, null, this);

        console.log("STAR 2", stars.children.entries[0].name);

        // get random building

    }

    show_message(hit_star) {
        let message_box = this.add.group();
        let text_box = this.add.sprite(hit_star.x, hit_star.y, "textbox");
        text_box.setDisplaySize(150, 100);
        let message = "Hello World";

        message_box.add(text_box);
        message_box.add(message);


    }


    /* Call back to this function whenever there's overlap with player and stars */
    build(player, star) {
        //this.show_message(star);
        if (star.name == loc) {
            console.log("GAME COMPLETE");
            this.scene.switch('winScene');
            this.scene.bringToTop('winScene');

            //this.scene.moveDown('gameScene');

            /*//this.scene.stop('panelScene');
            //this.scene.stop('infoScene');
            music.stop();
            cursors.right.enable = false;
            cursors.left.enable = false;
            cursors.up.enable = false;
            cursors.down.enable = false;*/
          //console.log("hi there huns");
        }

        if(!BUILDINGS[star.name]["wasVisited"]) {
            if (BUILDINGS[star.name]["isWarm"] && timeLeft <= 55) {
                timeLeft += 5;
                heatMask.x += stepWidth * 5;
                console.log(BUILDINGS[star.name]["wasVisited"]);
            }
            BUILDINGS[star.name]["wasVisited"] = true;
        }
        popup_text = "You made it to " + BUILDINGS[star.name]["display_name"] + "! ";
        //loc = star.name;
        popup_text += BUILDINGS[star.name]["message"];


        // if (star.name == "dana") {
        //   popup_text = "dana's text";
        //   console.log("is it dana");
        // }
        //console.log(star.name);
        //console.log(star.x, star.y); 
        xcoord = star.x;
        ycoord = star.y;

        this.scene.moveAbove('gameScene', 'infoScene');
        this.scene.pause('panelScene');

    }

    update() {
        // Apply the controls to the camera each update tick of the game
        // Stop any previous movement from the last frame
        const speed = 175;
        const prevVelocity = player.body.velocity.clone();
        player.body.setVelocity(0);
    
        // Horizontal movement
        if (cursors.left.isDown) {
        player.body.setVelocityX(-100);
        
        } else if (cursors.right.isDown) {
        // console.log("width", heatBar.width);
        // heatBar.setDisplaySize(heatBar.width, 30);
        player.body.setVelocityX(100);
        //console.log(collision);
        }
  
        // Vertical movement
        if (cursors.up.isDown) {
        player.body.setVelocityY(-100);
        } else if (cursors.down.isDown) {
        player.body.setVelocityY(100);
        }
  
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);
    
        if (cursors.left.isDown) {
        player.anims.play("freshman_left_walk", true);
        } else if (cursors.right.isDown) {
        player.anims.play("freshman_right_walk", true);
        } else if (cursors.up.isDown) {
        player.anims.play("freshman_back_walk", true);
        } else if (cursors.down.isDown) {
        player.anims.play("freshman_front_walk", true);
        } else {
        player.anims.stop();
    
        // If we were moving, pick and idle frame to use
        if (prevVelocity.x < 0) player.setTexture("atlas", "freshman_left_standing.png");
        else if (prevVelocity.x > 0) player.setTexture("atlas", "freshman_right_standing.png");
        else if (prevVelocity.y < 0) player.setTexture("atlas", "freshman_back_standing.png");
        else if (prevVelocity.y > 0) player.setTexture("atlas", "freshman_front_standing.png");
        }
        

    }
    
}

