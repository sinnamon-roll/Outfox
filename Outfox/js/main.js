var game = new Phaser.Game(600, 600, Phaser.AUTO);

var isoGroup;
var Boot = function(game){}
Boot.prototype = {
        init: function()
                console.log('Boot: init');
                this.stage.disableVisibilityChange = true;
        }
        preload: function(){
                consoled.log('Boot: preload');
        }
        create: function(){
                console.log('Boot: create');
                this.state.start('Preloader');
        }
}
var Preloader = function(game){}
Preloader.prototype = {
        preload: function(){
                consoled.log('Preloader: preload');
        }
        create: function(){
                console.log('Preloader: create');
        }
        update: function(){
                console.log('Preloader: Update');
                this.state.start('Mainmenu');
        }
}
var MainMenu = function(game) {
        identi = null;
}
mainMenu.prototype = {
        preload: function(){
                consoled.log('MainMenu: preload');
        }
        create: function(){
                console.log('MainMenu: create');
                game.stage.backgroundColor = "#453987";
                this.style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
                this.text = game.add.text(this.world.centerX, this.world.centerY, 'Yoyoyo this is\nhere', this.style);
		this.text.setShadow(3, 3, 'rgba(0,0,0,0.5', 2);        
        }
        update: function(){
                console.log('MainMenu: Update');
                if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        game.state.start('testState');
                }
        }
}
var testState = function(game) {};
testState.prototype = {
        preload: function() {
                // preload assets
                //set file path
                game.load.path = 'assets/img/';
                //load image data (key, url)
                game.load.image('dirt', 'dirt.png');
                game.load.image('water', 'water.png');
                
                game.time.advancedTiming = true;
                //enable Isometrics
                game.plugins.add(new Phaser.Plugin.Isometric(game));
        
                //Isometric physics
                game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
                // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
                // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
                game.iso.anchor.setTo(0.5, 0.2);
        },

        create: function() {
                // place your assets
                //Group for the tiles
                isoGroup = game.add.group();
        
                this.spawnTiles();
                this.spawnPlayer();
        },

        update: function() {
                // run game loop
        },

        //spawnTiles function courtesy of: http://rotates.org/phaser/iso/examples/interaction.htm
        spawnTiles: function () {
                var tile;
                for (var xx = 0; xx < 256; xx += 38) {
                        for (var yy = 0; yy < 256; yy += 38) {
                                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                                // The last parameter is the group you want to add it to (just like game.add.sprite)
                                tile = game.add.isoSprite(xx, yy, 0, 'dirt', 0, isoGroup);
                                tile.anchor.set(0.5, 0);
                        }
                }
        },
        spawnPlayer: function () {
                var player = game.add.isoSprite(0,0,0, 'water',0,isoGroup);
                player.anchor.set(0.5,0);
    
        }
}
game.state.add('test', testState);
game.state.start('test');
