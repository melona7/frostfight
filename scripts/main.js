let player;
let collision; 
let cursors;
let star;
let stars;
let m;
let loc = "";
let xcoord;
let ycoord;
let popup_text = "ok";
let pause_time = false;
let showFire = false;
class main extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }
    preload() {

    }

    create() {
        let all_buildings = Object.keys(BUILDINGS);
        // if came from loss then play again, maintain destination
    
        if (maintain_destination) {
          
            maintain_destination = false;
        }
        // otherwise, choose new destination
        else {
            var value = Phaser.Math.Between(0, all_buildings.length - 1);
            loc = all_buildings[value];
        }
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
        camera.setViewport(0, 71, 800, 500);
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
            stars.add(star);
        });

        // brass m sprite
        let mcoords = map.findObject("brassm", obj => obj.name === "block m");
        m = this.physics.add
        .image(mcoords.x, mcoords.y, "blockm");

        // set overlap with player and stars
        this.physics.add.overlap(player, stars, this.build, null, this);
        this.physics.add.overlap(player, m, this.tragedy, null, this);

    }

    // player loses when they step on block M
    tragedy(player, blockm) {
        this.scene.switch('loseScene');
        this.scene.bringToTop('loseScene');
        music.stop();
        //have to stop info scene from popping up while we move after winning
        this.scene.stop('infoScene');
        this.scene.stop('questionScene');
    }

    /* Call back to this function whenever there's overlap with player and stars */
    build(player, star) {
        // if reached destination, we win
        if (star.name == loc) {
            this.scene.switch('winScene');
            this.scene.bringToTop('winScene');
            music.stop();
            //have to stop info scene from popping up while we move after winning
            this.scene.stop('infoScene');
            this.scene.stop('questionScene');
            RESET_VISITED_BUILDINGS();
        }
        // if hot spot, add fire animation
        if(BUILDINGS[star.name]["isWarm"]) {
            showFire = true;
        }

        // if we haven't visited the hot spot
        if(!BUILDINGS[star.name]["wasVisited"]) {
            // add 5 seconds
            if (BUILDINGS[star.name]["isWarm"] && timeLeft <= initial_game_time - 5) {
                timeLeft += 5;
                heatMask.x += stepWidth * 5;
            }
            // or top it off
            else if (BUILDINGS[star.name]["isWarm"] && timeLeft > initial_game_time - 5) {
                let additional_time = initial_game_time - timeLeft;
                timeLeft += additional_time;
                heatMask.x += stepWidth * additional_time;
            }
            BUILDINGS[star.name]["wasVisited"] = true;
        }
        popup_text = "You made it to " + BUILDINGS[star.name]["display_name"] + "! ";
        popup_text += BUILDINGS[star.name]["message"];

        xcoord = star.x;
        ycoord = star.y;

        this.scene.moveAbove('gameScene', 'infoScene');
        pause_time = true;

    }

    update() {
        // apply the controls to the camera each update tick of the game
        // stop any previous movement from the last frame
        const speed = 175;
        const prevVelocity = player.body.velocity.clone();
        player.body.setVelocity(0);
    
        // horizontal movement
        if (cursors.left.isDown) {
            player.body.setVelocityX(-100);
        } 
        else if (cursors.right.isDown) {
            player.body.setVelocityX(100);
        }

        // vertical movement
        if (cursors.up.isDown) {
            player.body.setVelocityY(-100);
        } 
        else if (cursors.down.isDown) {
            player.body.setVelocityY(100);
        }
  
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);
    
        // sprite animations
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

        // resume game timer
        if (cursors.right.isDown || cursors.left.isDown || cursors.up.isDown || cursors.down.isDown) {
            pause_time = false;
            
        }
        

    }
    
}

