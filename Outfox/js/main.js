var game = new Phaser.Game(64 * 5, 64 * 5, Phaser.AUTO);
var player;
var enemy;

var Boot = function(game){};
Boot.prototype = {
  init: function(){
                console.log('Boot: init');
                this.stage.disableVisibilityChange = true;
        },
        preload: function(){
                console.log('Boot: preload');
        },
        create: function(){
                console.log('Boot: create');
                this.state.start('Preloader');
        },
}
var Preloader = function(game){};
Preloader.prototype = {
        preload: function(){
            console.log('Preloader: preload');
            //ASSET LOADS
            game.load.path = 'assets/img/';
            //Load the tilemap data (key, url, data, format)
            this.load.tilemap('level', 'outfox.json', null, Phaser.Tilemap.TILED_JSON);
            //Load tilemap spritesheet (key, url, frameWidth, frameHeight)
            this.load.image('tilesheet','outfox.png',64,64);
            this.load.image('player', 'dog.png');
	    this.load.image('enemy', 'gorilla.png');
        },
        create: function(){
                console.log('Preloader: create');
        },
        update: function(){
                console.log('Preloader: Update');
                this.state.start('MainMenu');
        },
}
var MainMenu = function(game) {};
MainMenu.prototype = {
        preload: function(){
            console.log('MainMenu: preload');
        },
        create: function(){
            console.log('MainMenu: create');

            game.stage.backgroundColor = "#453987";
            
            this.style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
            this.text = game.add.text(0, 0, 'Yoyoyo this is\nhere', this.style);
		this.text.setShadow(3, 3, 'rgba(0,0,0,0.5', 2);        
        },
        update: function(){
                console.log('MainMenu: Update');
                if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        game.state.start('test');
                }
        },
}
var testState = function(game) {};
testState.prototype = {
	preload: function() {
    },

    //spawnPlayer: function () {
    //    this.player = this.game.add.sprite(64,3 * 64,'fox');
    //    //Connect at the base of player's "feet"
    //    this.game.physics.arcade.enable(this.player);
    //    //this.player.body.setSize(54, 54, 5, 5); //reset collision box
    //    this.player.body.collideWorldBounds = true;
    //},

    create: function() {
        //Start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //TILEMAP SETUP
        //create new tilemap object
        map = this.game.add.tilemap('level');
        //add image to the map to be used as a tileset (tileset, key)
        //the tileset name is specified w/in the .json file and Tiled
        //Can have multiple tilesets in any one map
        map.addTilesetImage('landscape','tilesheet');
        map.setCollision(2);
        mapLayer = map.createLayer('Ground Level');
        //set the world size to match the size of the Tilemap Layer
        mapLayer.resizeWorld();

        
        //PLAYER SETUP
        //this.spawnPlayer();
        player = new Player(game, 'player'); 
	game.add.existing(player);
       	
	//ENEMY SETUP
	enemy = new Enemy(game, 'enemy');
	game.add.existing(enemy);
    },
    
    getTileProperties: function() {
        
        var x = mapLayer.getTileX(this.player.position.x);
        var y = mapLayer.getTileY(this.player.position.y);
        
        var tile = map.getTile(x, y, mapLayer);
        console.log(tile);
        
        // Note: JSON.stringify will convert the object tile properties to a string
        currentDataString = JSON.stringify( tile.properties );
        
        tile.properties.wibble = true;
    },

	update: function() {
    //    // run game loop
    //    if(cursors.up.justPressed()) {
    //        this.player.y = this.player.y - 32;
    //    } else if(cursors.down.justPressed()) {
    //        this.player.y = this.player.y + 32;
    //    } else if(cursors.left.justPressed()) {
    //        this.player.x = this.player.x - 32;
    //    } else if(cursors.right.justPressed()) {
    //        this.player.x = this.player.x + 32;
    //    }
        
    },
    
    //render: function () {
    //    game.debug.bodyInfo(this.player, 16, 16);
    //    game.debug.body(this.player);
    //    mapLayer.debug = true;
    //}
}
 game.state.add('test', testState);
 game.state.add('MainMenu', MainMenu);
 game.state.add('Preloader', Preloader);
 game.state.add('Boot', Boot);
 game.state.start('Boot');

