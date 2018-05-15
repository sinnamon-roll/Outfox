var game = new Phaser.Game(64 * 5, 64 * 5, Phaser.AUTO);
var player;
var enemygroup;
var enemy;
var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14, 0xE8AA14];
//Turn on/off debug info
var debug = false;

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
                settings = {
                //debug controls
                //add in what you want

                //Character setting
                playerhealth: 10,
                playerCHAR: 5,
                enemyhealth: 10,
                enemyCHAR: 5
                }

                this.game.gui = new dat.GUI({
                    width: 350
                });
                this.game.gui.useLocalStorage = true;
                this.game.gui.remember(settings);
                //debug folders
                var stepSize = 1;
                //character folders
                this.game.gui.characterFolder = this.game.gui.addFolder('Player');
                this.game.gui.characterFolder.add(settings, 'playerhealth').min(0).max(1000).step(stepSize).name('Player Health');
                this.game.gui.characterFolder.add(settings, 'playerCHAR').min(0).max(1000).step(stepSize).name('Player Char');
                this.game.gui.characterFolder.add(settings, 'enemyhealth').min(0).max(1000).step(stepSize).name('Enemy Health');
                this.game.gui.characterFolder.add(settings, 'enemyCHAR').min(0).max(1000).step(stepSize).name('Enemy Char');
                //end of gui code
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
            this.load.image('player', 's_fox_red_front.png');
            this.load.image('enemy', 'foxy.png');
            this.load.image('back', 's_fox_red_back.png')
            
            //MUSIC
            game.load.path = 'assets/audio/';
            //Song obtained from:: freesound.org/people/dobroide/sounds/34580/
            game.load.audio('bgMusic',['BGMusic.mp3']);
            game.load.audio('charSound',['UpSound.mp3']);
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
            this.text = game.add.text(0, 0, 'Press Space to Start!', this.style);
		this.text.setShadow(3, 3, 'rgba(0,0,0,0.5', 2);        
        },
        update: function(){
                //console.log('MainMenu: Update');
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('test');
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
        
        //MUSIC
        playMusic();
        
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
        enemygroup = game.add.group();
        this.addEnemy(enemygroup);
        //enemy = new Enemy(game, 'enemy');
        //game.add.existing(enemy);

        function playMusic() {
            console.log('Playing music');
            var firstMusic = game.add.audio('bgMusic');
            firstMusic.play('', 0, 0.75, true);    // ('marker', start position, volume (0-1), loop)
        }

    },

    addEnemy: function(group){
    	//throwing out new enemies into the mix yo
    	var tintColor = colors[game.rnd.between(0, colors.length-1)]; //for variety, which is the spiciest of meatballs
    	enemy = new Enemy(game, 'enemy', tintColor);
    	game.add.existing(enemy);
    	group.add(enemy);
    },	 

	update: function() {
		if(enemy.alive == false){
			this.addEnemy(enemygroup);
		}
        //updates variables to what is in out settings, this is a really shitty place to update the health variable, lol one sec
        //never put things in here that govern a resource, as it will always put it to max, throw that into the constructor for said resource
        //ie, player.health = settings.playerhealth
        player.CHAR = settings.playerCHAR;
        enemy.CHAR = settings.enemyCHAR;
    },
    
    render: function () {
        if(debug == true) {
            game.debug.bodyInfo(enemy, 16, 16);
            game.debug.bodyInfo(player, 16, game.world.height - 50);
            game.debug.body(player);
            game.debug.body(enemy);
        }
    }
}
 game.state.add('test', testState);
 game.state.add('MainMenu', MainMenu);
 game.state.add('Preloader', Preloader);
 game.state.add('Boot', Boot);
 game.state.start('Boot');

