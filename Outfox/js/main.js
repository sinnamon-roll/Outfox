var game = new Phaser.Game(640, 480, Phaser.AUTO);
var player;
var enemygroup;
var enemy;
var adjacency;
var colors = [0x1BE7FF, 0x6EEB83, 0xE4FF1A, 0xE8AA14, 0xE8AA14];
//Turn on/off debug info
var debug = false;
var menuText;
var firstMusic;
var logoSound;

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
                enemyCHAR: 5,
                enemyCONTROL: false
                }

                var gui = new dat.GUI({
                    width: 350
                });
                gui.useLocalStorage = true;
                gui.remember(settings);
                //debug folders
                var stepSize = 1;
                //character folders
                gui.characterFolder = gui.addFolder('Player');
                gui.characterFolder.add(settings, 'playerhealth').min(0).max(1000).step(stepSize).name('Player Health');
                gui.characterFolder.add(settings, 'playerCHAR').min(0).max(1000).step(stepSize).name('Player Char');
                gui.characterFolder.add(settings, 'enemyhealth').min(0).max(1000).step(stepSize).name('Enemy Health');
                gui.characterFolder.add(settings, 'enemyCHAR').min(0).max(1000).step(stepSize).name('Enemy Char');
                //gui.characterFolder.add(settings, 'enemyCONTROL').min().max().step(stepSize).name('Enemy Controlled');
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
            this.load.spritesheet('player', 's_fox_sheet.png', 64, 64);
            this.load.spritesheet('BFF', 's_fox_sheet04.png',64,64);
            this.load.spritesheet('enemy', 's_fox_sheet01.png',64,64);
            this.load.image('playerIcon', 's_nar_PC.png');
            this.load.image('s_interfaceR_edge', 's_interfaceR_edge.png');
            //Load Sprite Atlas
            this.load.atlas('atlas','emoji.png','emoji.json');
            this.load.atlas('UI','ui.png','ui.json');
            this.load.image('CCGlogo', 'CCGLogo.png');
            this.load.image('OFlogo', 's_Outfox_logo.png');


            
            //MUSIC
            game.load.path = 'assets/audio/';
            //Song obtained from:: freesound.org/people/dobroide/sounds/34580/
            game.load.audio('bgMusic',['BGMusic.mp3']);
            game.load.audio('logoSound',['logoSound.mp3']);
            game.load.audio('charSound',['gekkering01.mp3']);
            game.load.audio('sarSound',['fox_alert.mp3']);
            game.load.audio('boostSound',['vixensScream.mp3']);

        },
        create: function(){
                console.log('Preloader: create');
        },
        update: function(){
                console.log('Preloader: Update');
                this.state.start('logoScreen');
        },
}

var logoScreen = function(game) {};
logoScreen.prototype = {
        preload: function(){
            console.log('logoScreen: preload');
            
        },
        create: function() {
            console.log('logoScreen: create');
            var CCGLogo = game.add.sprite(0,0, 'CCGlogo');

            CCGLogo.anchor.setTo(0, 0);
            CCGLogo.alpha = 0;

            game.add.tween(CCGLogo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
            this.logoUp = game.add.audio('logoSound');
            game.time.events.add(1500, logoSound, this);
            game.time.events.add(3000, fadeOut, this);

            function logoSound() {
                this.logoUp.play('', 0, 0.1, false);
            }
            
            function fadeOut() {
                game.add.tween(CCGLogo).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
            }

            game.time.events.add(5250, changeState, this, 'MainMenu');

            function changeState(stateID) {
                game.state.start('MainMenu');
            }
            
        },
        update: function(){
            if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('MainMenu');
            }

        },
}

var MainMenu = function(game) {};
MainMenu.prototype = {
        preload: function(){
            console.log('MainMenu: preload');
            
        },
        create: function() {
            console.log('MainMenu: create');
            game.stage.backgroundColor = "#000000";
            var OFLogo = game.add.sprite(0,0, 'OFlogo');

            OFLogo.anchor.setTo(0, 0);
            OFLogo.alpha = 0;

            game.add.tween(OFLogo).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
            //this.logoUp = game.add.audio('logoSound');
            //game.time.events.add(1500, logoSound, this);
            //game.time.events.add(3000, fadeOut, this);

            function logoSound() {
                this.logoUp.play('', 0, 0.1, false);
            }
            
            function fadeOut() {
                game.add.tween(OFLogo).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
            }

            function switchState() {
                game.add.tween(OFLogo).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
            }
            
            // State change instructions and intro text -----------------------------------------------
            menuText = game.add.text(215, 320, 'Press space to start', { font: 'Fira Sans', fontSize: '28px', fill: '#000' });
            menuText = game.add.text(115, 370, 'Press enter to see the Foxes Responsible', { font: 'Fira Sans', fontSize: '26px', fill: '#000', wordWrapWidth: '640', wordWrap: 'false' });
            
        },
        update: function(){
                //console.log('MainMenu: Update');
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('Prologue');
            }
            if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ){
                this.state.start('Credits');
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
        this.load.images(['tempLayout', 'grid'], ['tempLayout.png', 'tempGrid.png']);
        this.load.image('playField', 'playField.png', 0, 0);
    },

    create: function() {
        //Start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#339933";
        
        //MUSIC
        playMusic();

        // show temp layout image underneath game
        //game.add.sprite(0, 0, 'tempLayout');

        // show temp grid under the game
        //game.add.sprite(0, 0, 'grid');
        
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
        //mapLayer.resizeWorld();
        game.add.sprite(0, 0, 'playField');
   
        //PLAYER SETUP
        //this.spawnPlayer();
        player = new Player(game, 'player'); 
        game.add.existing(player);
       	
        //ENEMY SETUP
        //gonna take enemy out of the group, now that the game ends when one is done
        //enemygroup = game.add.group();
        //this.addEnemy(enemygroup);
        var tintColor = colors[game.rnd.between(0, colors.length-1)]; //for variety, which is the spiciest of meatballs
        enemy = new Enemy(game, 'enemy');
        game.add.existing(enemy);

        //BFF SETUP
        BFF = new BFF(game, 'BFF');
        this.game.add.existing(BFF);
        
        //UI SETUP
        game.add.sprite(0, 322, 'UI','s_interfaceL');
        game.add.sprite(383, 369,'s_interfaceR_edge');
        enemyUI = game.add.sprite(351, 322, 'UI','s_interfaceR');
        enemyUI.visible = false;
        game.add.sprite(198, 369, 'UI','s_log');
        playerIcon = game.add.sprite(0, 290, 'UI','s_nar_PC');
        enemyIcon = game.add.sprite(645, 290, 'UI','s_nar_NPC01')
        enemyIcon.scale.x *= -1;
        enemyIcon.visible = false;

        leftName = game.add.text(180, 335, 'PC Name', { font: 'Fira Sans', fontSize: '15px', fill: '#fff', fontWeight: '700' })
        
        //GAMELOG SETUP
        var logStyle = {
        font: 'Fira Sans',
        fontSize: '16px',
        wordWrapWidth: '250',
        wordWrap: 'true',
        fontWeight: '420',
        fill: '#fff'
        }
        gameLog = game.add.text(200, 370, 'Arrived in a strange field.\n', logStyle);
        
        rightName = game.add.text(380, 335, 'NPC Name', { font: 'Fira Sans', fontSize: '15px', fill: '#fff', fontWeight: '700' })
        rightName.visible = false;

        playerStats = game.add.text(105, 350, 'Convince other foxes to join your escape effort.\nUse the arrow keys to move.\nWhen adjacent to a fox:\nPress C to bark Charismatically!\nPress S to bark Sarcastically!\nWhen out of energy, join your Best Friend and hit B to replenish it!', {font: 'Fira Sans', fontSize: '13px', fill: '#fff', fontWeight: '700' });
        
        enemyStats = game.add.text(447, 350, 'Kon Kon!', { font: 'Fira Sans', fontSize: '13px', fill: '#fff', fontWeight: '700' })

        // TESTING OVERLAY GRAPHIC
        game.add.sprite(0, 0, 'prolBorder');

        function playMusic() {
            console.log('Playing music');
            this.firstMusic = game.add.audio('bgMusic');
            this.firstMusic.play('', 0, 0.1, true);    // ('marker', start position, volume (0-1), loop)
        }

    },

    //addEnemy: function(group){
    	//throwing out new enemies into the mix yo
    	
    //	enemy = new Enemy(game, 'enemy', tintColor);
    //	game.add.existing(enemy);
    //	group.add(enemy);
    //},	 

	update: function() {
		if(enemy.alive == false){
			//this.addEnemy(enemygroup);
            game.time.events.add(Phaser.Timer.SECOND * 7, function() {
                    firstMusic.stop();
                    game.state.start('Congrats')
                });
		}
		//Checks if these two are adjacent, can be run on any two objects. Probably still way too centered on the player.
        isAdjacent(player, enemy);
        //isAdjacent(BFF, enemy);
        //updates variables to what is in out settings, this is a really shitty place to update the health variable, lol one sec
        //never put things in here that govern a resource, as it will always put it to max, throw that into the constructor for said resource
        //ie, player.health = settings.playerhealth
        player.CHAR = settings.playerCHAR;
        enemy.CHAR = settings.enemyCHAR;
        
        if (player.adj == true) {
            //display stats
            enemyStats.visible = true;
            enemyIcon.visible = true;
            enemyUI.visible = true;
            rightName.setText(enemy.NAME);
            rightName.visible = true;
            enemyStats.text = 'Type: ' + enemy.TYPE + '\n' +
                                'Charisma: ' + enemy.CHAR + '\n' +
                                'Sarcasm: ' + enemy.SAR + '\n' +
                                'Ego: ' + enemy.EGO + '\n' +
                                //'Resolve: ' + enemy.EXH + '\n' +
                                'Respect: ' + enemy.RPCT + '\n' +
                                'Contempt: ' + enemy.CTMP + '\n'
            ;
            
        } else {
            enemyStats.visible = false;
            enemyIcon.visible = false;
            rightName.visible = false;
            enemyUI.visible = false;
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
        console.log('Congrats: preload');

    },
    create: function() {
        console.log('Congrats: create');
        game.stage.backgroundColor = "#F28A2E";

        // create background image
        //game.add.sprite(0, 0, 'prolBorder');

        // create upper left comic panel
        //game.add.sprite(10, 10, 'prolUpL');

        /* create logo image
        game.add.sprite(190, 50, 'logo');*/

        // State change instructions and intro text -----------------------------------------------
        scoreText = game.add.text(200, 150, 'Outfox', { fontSize: '48px', fill: '#000' });
        scoreText = game.add.text(240, 200, 'Congratulations you won!', { fontSize: '22px', fill: '#000' });
//        scoreText01 = game.add.text(150, 250, 'Press space to restart', { fontSize: '32px', fill: '#000' });
    },
    update: function() {
        // End Game Here. Debugging issues with restarting world.

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
            player.kill();
            enemy.kill()
            BFF.kill();
            game.state.start('MainMenu');
        }
    }
}

game.state.add('test', testState);
game.state.add('logoScreen', logoScreen);
game.state.add('MainMenu', MainMenu);
game.state.add('Prologue', Prologue);
game.state.add('Congrats', Congrats);
game.state.add('GameOver', GameOver);
game.state.add('Preloader', Preloader);
game.state.add('Boot', Boot);
game.state.add('Credits', credits);
game.state.start('Boot');
