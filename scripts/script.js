var config = {
    type: Phaser.CANVAS,
    width: 1415,
    height: 880,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

game = new Phaser.Game(config);
//var size = new Phaser.Rectangle();

function preload ()
{
    console.log("PRELOAD");
    
    // LOAD PNG MAPS
    // this.load.image('ingalls', 'assets/ingalls3.png');
    // this.load.image('diag', 'assets/diag3.png');
    // this.load.image('south', 'assets/south3.png');
    
    // LOAD SVG MAPS
    this.load.svg('ingalls', 'assets/ingalls.svg');
    this.load.svg('diag', 'assets/diag.svg');
    this.load.svg('south', 'assets/south.svg');
    
    // LOAD PLAYER
    this.load.image('player', 'assets/person.png');
}

function create ()
{
    console.log("CREATE");
    cursors = this.input.keyboard.createCursorKeys();

    //this.world.setBounds(600, 500, 1920, 1200);
    //size.setTo(600, 500, 1920, 1200);
    //map = this.add.image(config.width/2, config.height/2, 'diag');
    map = this.add.image(config.width/2, config.height/2, 'diag');
    map.setDisplaySize(config.width, config.height);
    map_top = 0;
    map_bottom = map.height;
    // initial map = diag
    curr_map_num = 1;
    map_list = ['ingalls', 'diag', 'south'];
    player = this.add.sprite(600, 500, 'player');
    player.setDisplaySize(30, 50);

    PLAYER_SPEED = 25;
    // var elephant = this.add.image(600, 500, 'ele');
    // elephant.scale.setTo(0.01, 0.01);
    //this.camera.focusOnXY(600, 500);
    //this.cameras.main.zoom = 1.2;
    // console.log(cursors);
    // console.log("player loc", player.x, player.y);
    // console.log("map loc", map.x, map.y, map_right);

}

// NOTE: function below written out in update()
//       couldn't access "this" or "game" within
// function change_map(game, player, map, curr_map_num, change_loc) {
//     if (change_loc === "BOTTOM") {
//         map.destroy();
//         curr_map_num += 1;
//         map = game.add.image(600, 500, map_list[curr_map_num]);
//         player = game.add.image(player.x, 0, 'player');
//         player.setDisplaySize(30, 50);
//     }
//     // change_loc === "TOP"
//     else {
//         map.destroy();
//         curr_map_num -= 1;
//         map = game.add.image(600, 500, map_list[curr_map_num]);
//         player = game.add.image(player.x, map.height, 'player');
//         player.setDisplaySize(30, 50);
//     }
// }

function update () 
{
    // MOVE PLAYER WITH ARROW KEYS
    if (cursors.up.isDown)
    {
        // only let player move down off screen if there's another map below
        if (!(player.y <= 0 && curr_map_num === 0)) {
            console.log("player loc", player.x, player.y);
            //this.cameras.main.y += 4;
            player.y -= PLAYER_SPEED;
        }
        
    }
    else if (cursors.down.isDown)
    {
        // only let player move down off screen if there's another map below
        if (!(player.y >= map_bottom && curr_map_num === map_list.length - 1)) {
            console.log("player loc", player.x, player.y);
            //this.cameras.main.y += 4;
            player.y += PLAYER_SPEED;
        }
    }

    if (cursors.left.isDown)
    {
        //stop allowing player to move at edge of game
        if (!(player.x <= 0)) {
            console.log("player loc", player.x, player.y);
            //this.cameras.main.x -= 4;
            player.x -= PLAYER_SPEED;
        }
    }
    else if (cursors.right.isDown)
    {
        // stop allowing player to move at edge of game
        if (!(player.x >= config.width)) {
            console.log("player loc", player.x, player.y);
            //this.cameras.main.x -= 4;
            player.x += PLAYER_SPEED;
        }
        
    }

    // SWITCH BETWEEN MAPS
    // update map: bottom
    if (player.y >= config.height && curr_map_num !== map_list.length - 1) {
        map.destroy();
        player.destroy();
        curr_map_num += 1;
        map = this.add.image(config.width/2, config.height/2, map_list[curr_map_num]);
        map.setDisplaySize(config.width, config.height);
        console.log("NEW MAP dimensions", map.width, map.height);
        player = this.add.image(player.x, 0, 'player');
        player.setDisplaySize(30, 50);
    }
    // update map: top
    else if (player.y <= map_top && curr_map_num !== 0) {
        map.destroy();
        player.destroy();
        curr_map_num -= 1;
        map = this.add.image(config.width/2, config.height/2, map_list[curr_map_num]);
        map.setDisplaySize(config.width, config.height);
        console.log("NEW MAP dimensions", map.width, map.height);
        player = this.add.image(player.x, config.height, 'player');
        player.setDisplaySize(30, 50);
    }
}