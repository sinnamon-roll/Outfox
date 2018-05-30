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
var startScene = 0;
var scene;
var scenes = [{key:"BFF00"},{key:"BFF01"},{key:"BFF01"},{key:"BFF02"},{key:"BFF03"},{key:"BFF04"},{key:"BFF05"},{key:"BFF06"},{key:"BFF07"},{key:"BFF08"},{key:"BFF09"},{key:"BFF10"},{key:"BFF11"}];
var narratives = [  'As your consciousness stirs, the instinct to repeatedly blink and paw gently at your eyes kicks in. Despite your best efforts, your sight is having trouble adjusting in the pitch black darkness that surrounding you.',
                    'Turning your head, your eyes squint taking in a faint, glowing, red light. You comtemplate, "is that the sun beginning to rise? I must have wandered deeper within my den."',
                    'Attempting to disregard the atrophy you feel in your muscles, you stand. \* wham\! \* Rising so suddenly, your ears had little time to warn you of the low ceiling you just made contact with. You wonder, "why is the den ceiling so cold\? It\'s nowhere near wintertime yet..."',
                    'Panicking from this unfamiliar sensation, you lunge forward, all four paws scurrying for your den entrance. To your continued surprise, your body is met with more cold and unforgiving objects blocking your escape. Perplexed, you ponder, "where did all of these hard branches come from?!"',
                    'Shaking your head to attempt to remain conscious from the impact, your eyes come into focus. The red light illuminates the "branches," as well as the "den\'s" ceiling and floor. Fear welling up inside, you wimper in quite a low voice, "oh, no\! I\'m in a hunter\'s cage\!"',
                    'You find it quite peculiar that you can JUST make out grass outside of the cage below, but you smell nothing. A neighboring read light slightly further away catches your eye.',
                    'As your pupils bring the distant area into view, you confirm it is another hunter\s cage. Bittersweet in its revelation, you think "It\'s calming that I am not alone but it means another creature is trapped here with me."',
                    'Pushing your snout as far as you can between the cage\'s "branches", you gekker imploringly. "Bright day! Is there another fox about?" The echos of your call resonating as they bounce inside your cage frighten you slightly.',
                    'Perking up your ears, you close your eyes and take slow, deep breaths, hopefully anticipating a response...\nHowever, no sound could be heard...\n"Whatever shall I do now?" you lament.',
                    'But wait! Was that a yawn you heard? "It can\'t possibly be morning catch yet. Who is making all that noise?" gekkered a voice travelling from the adjacent cage.',
                    'narrative about discovering each other is there and introductions. may need this scene background for more than one scene. may need to cut down on text at beginning. Reuse this scene to explain escape and becoming friends.',
                    'final thoughts and sounds before falling asleep',
                    'issue getting rid of log graphic here when the final scene fades, ask for help. should just be black and fade for effect before going to gameplay'];
var talkText;
var logImg;

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
            this.load.spritesheet('player', 's_fox_sheet04.png', 64, 64);
            this.load.spritesheet('BFF', 's_fox_sheet.png',64,64);
            this.load.spritesheet('enemy', 's_fox_sheet01.png',64,64);
            this.load.image('s_interfaceR_edge', 's_interfaceR_edge.png');
            this.load.image('cursor', 's_active.png');
            //Load Sprite Atlas
            this.load.atlas('atlas','emoji.png','emoji.json');
            this.load.atlas('UI','ui.png','ui.json');
            
            this.load.image('CCGlogo', 'CCGLogo.png');
            this.load.image('OFlogo', 's_Outfox_logo.png');
            this.load.image('BFF00', 's_BFF00.png');
            this.load.image('BFF01', 's_BFF01.png');
            this.load.image('BFF02', 's_BFF02.png');
            this.load.image('BFF03', 's_BFF03.png');
            this.load.image('BFF04', 's_BFF04.png');
            this.load.image('BFF05', 's_BFF05.png');
            this.load.image('BFF06', 's_BFF06.png');
            this.load.image('BFF07', 's_BFF07.png');
            this.load.image('BFF08', 's_BFF08.png');
            this.load.image('BFF09', 's_BFF09.png');
            this.load.image('BFF10', 's_BFF10.png');
            this.load.image('BFF11', 's_BFF11.png');
            this.load.image('logImg', 's_BFFlog.png');


            
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
            
        },
        update: function(){
            if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('MainMenu');
            }

        },
}

function changeState(stateID) {
    game.state.start(stateID);
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
            menuText = game.add.text(200, 320, 'Press space to start', { font: 'Fira Sans', fontSize: '28px', fill: '#000' });
            menuText = game.add.text(80, 370, 'Press enter to see the Foxes Responsible', { font: 'Fira Sans', fontSize: '26px', fill: '#000', wordWrapWidth: '640', wordWrap: 'false' });
            
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
            game.state.start('BFFmeet');
        }
    }
}

var BFFmeet = function(game) {};
BFFmeet.prototype = {
        preload: function(){
            console.log('BFFmeet: preload');
            
        },
        create: function() {
            console.log('BFFmeet: create');
            game.stage.backgroundColor = "#000000";
            switchScene(startScene);
            
        },
        update: function(){
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ){
                if (startScene != scenes.length) {
                    console.log('1st Enter IF. startScene: ' + startScene);
                    game.add.tween(scene).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
                    //game.add.tween(talkText).to( { alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
                    //scene.alpha = 0;
                    talkText.alpha = 0;
                    switchScene(startScene);
                } else if (startScene == scenes.length) {
                    talkText.alpha = 0;
                    logImg.alpha = 0;
                    console.log('2nd Enter IF. startScene: ' + startScene);
                    game.add.tween(scene).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
                    game.add.tween(talkText).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
                    game.time.events.add(1500, changeState, this, 'test');
                }
            }
            //console.log('MainMenu: test');
            if(this.cache.isSoundDecoded('bgMusic') && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) ){
                this.state.start('test');
            }
        },
}

function switchScene(num) {
    console.log('Scene switch start. startScene: ' + startScene);
    scene = game.add.sprite(0,0,scenes[num].key);
    scene.alpha = 0;
    game.add.tween(scene).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    if (num > 0 && num < scenes.length - 1) {
        logImg = game.add.sprite(79,306,'logImg');   
    }
    talkText = game.add.text(108, 315, narratives[num], { font: 'Fira Sans', fontSize: '16px', fill: '#eed6c3', wordWrapWidth: '440', wordWrap: 'true' });
    talkText.alpha = 0;
    game.add.tween(talkText).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    startScene++;
        
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
        game.add.sprite(0, 359, 'UI','s_stats');
        game.add.sprite(443, 359, 'UI','s_stats');
        game.add.sprite(0,350, 'UI', 's_title');
        game.add.sprite(353,350, 'UI', 's_title');
        playerUI = game.add.sprite(85,322,'UI','s_name');
        enemyUI = game.add.sprite(555, 322, 'UI','s_name');
        enemyUI.scale.x *= -1;
        enemyUI.visible = false;
        game.add.sprite(198, 349, 'UI','s_log');
        playerIcon = game.add.sprite(0, 290, 'UI','s_nar_NPC04');
        enemyIcon = game.add.sprite(645, 290, 'UI','s_Fox_NPC01')
        enemyIcon.scale.x *= -1;
        enemyIcon.visible = false;
        playerTarget = game.add.sprite(0, 450,'UI','s_activeFox');
        enemyTarget = game.add.sprite(550,450, 'UI', 's_noTarget');
        

        leftName = game.add.text(187, 335, 'PC Name', { font: 'Fira Sans', fontSize: '15px', fill: '#fff', fontWeight: '700' })
        
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
game.state.add('BFFmeet', BFFmeet);
game.state.add('Congrats', Congrats);
game.state.add('GameOver', GameOver);
game.state.add('Preloader', Preloader);
game.state.add('Boot', Boot);
game.state.add('Credits', credits);
game.state.start('Boot');
