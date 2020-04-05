const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 720; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

var config = {
    type: Phaser.CANVAS,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
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
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
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
    this.load.svg('diag', 'assets/diag3.svg');
    this.load.svg('south', 'assets/south.svg');
    
    // LOAD PLAYER
    this.load.image('player', 'assets/person.png');

    // LOAD OTHER IMAGES
    this.load.image('star', 'assets/star.png');
}

function create ()
{
    console.log("CREATE");
    cursors = this.input.keyboard.createCursorKeys();

    // CONSTANTS
    PLAYER_HEIGHT = 25;
    PLAYER_WIDTH = 15;
    PLAYER_SPEED = 25;
    STAR_HEIGHT = 20;
    STAR_WIDTH = 20;
    MAP_TOP = 0;

    //this.world.setBounds(600, 500, 1920, 1200);
    //size.setTo(600, 500, 1920, 1200);
    //map = this.add.image(config.width/2, config.height/2, 'diag');
    map = this.add.image(config.width/2, config.height/2, 'diag');
    map.setDisplaySize(config.width, config.height);
    // initial map = diag
    curr_map_num = 1;
    map_list = ['ingalls', 'diag', 'south'];
    player = this.add.sprite(600, 500, 'player');
    player.setDisplaySize(PLAYER_WIDTH, PLAYER_HEIGHT);

    // starting map setup
    mason_hall = this.add.image(250, 300, 'star');
    mason_hall.setDisplaySize(STAR_WIDTH, STAR_HEIGHT);
    

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
        if (!(player.y <= MAP_TOP && curr_map_num === 0)) {
            console.log("player loc", player.x, player.y);
            //this.cameras.main.y += 4;
            player.y -= PLAYER_SPEED;
        }
        
    }
    else if (cursors.down.isDown)
    {
        // only let player move down off screen if there's another map below
        if (!(player.y >= config.height && curr_map_num === map_list.length - 1)) {
            console.log("player loc", player.x, player.y);
            //this.cameras.main.y += 4;
            player.y += PLAYER_SPEED;
        }
    }

    if (cursors.left.isDown)
    {
        //stop allowing player to move at edge of game
        if (!(player.x <= MAP_TOP)) {
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
        player = this.add.image(player.x, MAP_TOP, 'player');
        player.setDisplaySize(PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    // update map: top
    else if (player.y <= MAP_TOP && curr_map_num !== 0) {
        map.destroy();
        player.destroy();
        curr_map_num -= 1;
        map = this.add.image(config.width/2, config.height/2, map_list[curr_map_num]);
        map.setDisplaySize(config.width, config.height);
        console.log("NEW MAP dimensions", map.width, map.height);
        player = this.add.image(player.x, config.height, 'player');
        player.setDisplaySize(PLAYER_WIDTH, PLAYER_HEIGHT);
    }
}