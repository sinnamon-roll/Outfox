var game = new Phaser.Game(64 * 5, 64 * 5, Phaser.AUTO);


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
            //Load the tilemap data (key, url, data, format)
            this.load.tilemap('level', 'assets/img/outfox.json', null, Phaser.Tilemap.TILED_JSON);
            //Load tilemap spritesheet (key, url, frameWidth, frameHeight)
            this.load.spritesheet('tilesheet','assets/img/outfox.png',64,64);
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
 
	create: function() {
        //Start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //create new tilemap object
        map = game.add.tilemap('level');
        //add image to the map to be used as a tileset (tileset, key)
        //the tileset name is specified w/in the .json file and Tiled
        //Can have multiple tilesets in any one map
        map.addTilesetImage('landscape','tilesheet');
        //Set all tiles to collide, by passing empty array
        map.setCollisionByExclusion([]);
        mapLayer = map.createLayer('Ground Level');
        //set the world size to match the size of the Tilemap Layer
        mapLayer.resizeWorld();
    },

	update: function() {
    	    // run game loop
    },
}
//spawnTiles function courtesy of: http://rotates.org/phaser/iso/examples/interaction.htm
//	spawnTiles: function () {
//    	var tile;
//    	for (var xx = 0; xx < 256; xx += 38) {
//        	for (var yy = 0; yy < 256; yy += 38) {
 //           	// Create a tile using the new game.add.isoSprite factory method at the specified position.
//            	// The last parameter is the group you want to add it to (just like game.add.sprite)
 //           	tile = game.add.isoSprite(xx, yy, 0, 'dirt', 0, isoGroup);
 //           	tile.anchor.set(0.5, 0);
 //       	}
  //  	}
//	},
//	spawnPlayer: function () {
 //   	var player = game.add.isoSprite(0,0,0, 'water',0,isoGroup);
  //  	player.anchor.set(0.5,0);
 //	}
 //}
 game.state.add('test', testState);
 game.state.add('MainMenu', MainMenu);
 game.state.add('Preloader', Preloader);
 game.state.add('Boot', Boot);
 game.state.start('Boot');

