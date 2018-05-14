var game = new Phaser.Game(640, 480, Phaser.AUTO);
var player;
var enemygroup;
var enemy;
var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14, 0xE8AA14];
//Turn on/off debug info
var debug = false;
var menuText;

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
        create: function() {
            console.log('MainMenu: create');
            game.stage.backgroundColor = "#F26B1D";
            console.log('level: ' + this.level);

        // State change instructions and intro text -----------------------------------------------
        menuText = game.add.text(200, 150, 'Outfox', { fontSize: '48px', fill: '#000' });
        menuText = game.add.text(240, 200, 'by Cherry Coke Gummies', { fontSize: '22px', fill: '#000' });
        menuText = game.add.text(150, 250, 'Press space to start', { fontSize: '32px', fill: '#000' });
    },
        update: function(){
                //console.log('MainMenu: Update');
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('Prologue');
            }
        },
}

// define Prologue state and methods
var Prologue = function(game) {};
Prologue.prototype = {
    init: function() {
        this.level = 1;
    },
    preload: function() {
        console.log('Prologue: preload');

        // Preload Assets -----------------------------------------------------

        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['prolBorder', 'prolUpL', 'prolUpMid', 'prolUpR', 'prolLowL', 'prolLowMidTop', 'prolLowMidL', 'prolLowMidR', 'prolLowR'],
            ['prologueborder.png', 'prologueUpL.png', 'prologueUpMid.png', 'prologueUpR.png', 'prologueLowL.png', 'prologueLowMidTop.png', 'prologueLowMidL.png', 'prologueLowMidR.png', 'prologueLowR.png']);
    },
    create: function() {
        console.log('Prologue: create');
        game.stage.backgroundColor = "#ffffff";
        console.log('level: ' + this.level);

        // create background image
        game.add.sprite(0, 0, 'prolBorder');

        // create upper left comic panel
        game.add.sprite(10, 10, 'prolUpL');

        // create upper middle comic panel
        game.add.sprite(101, 10, 'prolUpMid');

        // create upper right comic panel
        game.add.sprite(414, 10, 'prolUpR');

        // create lower left comic panel
        game.add.sprite(10, 219, 'prolLowL');

        // create lower middle top comic panel
        game.add.sprite(230, 219, 'prolLowMidTop');

        // create lower middle left comic panel
        game.add.sprite(102, 334, 'prolLowMidL');

        // create lower middle right comic panel
        game.add.sprite(321, 334, 'prolLowMidR');

        // create lower right comic panel
        game.add.sprite(414, 219, 'prolLowR');
    },
    update: function() {
        // main menu logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            // pass this.level to next state
            game.state.start('test');
        }
    }
}

var testState = function(game) {};
testState.prototype = {
	preload: function() {

        // TESTING OVERLAY GRAPHIC
        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['prolBorder'], ['prologueborder.png']);
    },

    create: function() {
        //Start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#facade";
        
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

        // TESTING OVERLAY GRAPHIC
        game.add.sprite(0, 0, 'prolBorder');

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

// define Congrats state and methods
var Congrats = function(game) {};
Congrats.prototype = {
    init: function(lvl) {
        this.level = lvl+1;
    },
    preload: function() {
        console.log('MainMenu: preload');

        // Preload Assets -----------------------------------------------------

        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['prolMain'], ['prologue640x480.png']);
    },
    create: function() {
        console.log('Congrats: create');
        game.stage.backgroundColor = "#F28A2E";
        console.log('level: ' + this.level);

        // create background image
        //game.add.sprite(0, 0, 'prolBorder');

        // create upper left comic panel
        //game.add.sprite(10, 10, 'prolUpL');

        /* create logo image
        game.add.sprite(190, 50, 'logo');*/

        // State change instructions and intro text -----------------------------------------------
        scoreText = game.add.text(200, 150, 'Outfox', { fontSize: '48px', fill: '#000' });
        scoreText = game.add.text(240, 200, 'Congratulations you won!', { fontSize: '22px', fill: '#000' });
        scoreText01 = game.add.text(150, 250, 'Press space to restart', { fontSize: '32px', fill: '#000' });
    },
    update: function() {
        // GameOver logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('MainMenu');
        }
    }
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
    init: function(lvl) {
        this.level = lvl+1;
    },
    preload: function() {
        console.log('MainMenu: preload');

        // Preload Assets -----------------------------------------------------

        // load a path to save us typing
        this.load.path = 'assets/img/'; 
        // load image assets
        this.load.images(['prolMain'], ['prologue640x480.png']);
    },
    create: function() {
        console.log('MainMenu: create');
        game.stage.backgroundColor = "#732817";
        console.log('level: ' + this.level);

        // create background image
        //game.add.sprite(0, 0, 'prolBorder');

        // create upper left comic panel
        //game.add.sprite(10, 10, 'prolUpL');

        /* create logo image
        game.add.sprite(190, 50, 'logo');*/

        // State change instructions and intro text -----------------------------------------------
        scoreText = game.add.text(200, 150, 'Outfox', { fontSize: '48px', fill: '#000' });
        scoreText = game.add.text(240, 200, 'You died!', { fontSize: '22px', fill: '#000' });
        scoreText01 = game.add.text(150, 250, 'Press space to restart', { fontSize: '32px', fill: '#000' });
    },
    update: function() {
        // GameOver logic
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('MainMenu');
        }
    }
}

game.state.add('test', testState);
game.state.add('MainMenu', MainMenu);
game.state.add('Prologue', Prologue);
game.state.add('Congrats', Congrats);
game.state.add('GameOver', GameOver);
game.state.add('Preloader', Preloader);
game.state.add('Boot', Boot);
game.state.start('Boot');

