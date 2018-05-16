// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
var size = 64;
var adj = false;
var CHAR;
var SAR;
var CTMP;
var RPCT;
var EXH;

function Player(game, key) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, 4 *size,3 * size, key);
    // add custom properties
	//KEYBOARD INPUTS
    cursors = game.input.keyboard.createCursorKeys();
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);


    //CHARACTER STATS
    this.health = settings.playerhealth;
    this.CHAR = 5;
    this.SAR = 10;
    this.EXH = 3;


	// put some physics on it
	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
    this.style = {font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
    //Cardinal direction map for PC's area of influence
    this.range = game.add.sprite(this.x - size, this.y - size, 'adj')
    this.range.visible = false;
    this.tired = game.add.sprite(this.x + size, this.y - size, 'atlas','chat_dot03')
    this.tired.visible = false;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (player update function)
Player.prototype.update = function() {
        if(cursors.up.justPressed() && this.y != size) {
            this.y = this.y - size;
            this.loadTexture('back');
		console.log('up pressed');
        } else if(cursors.down.justPressed() && this.y != size * 4) {
            this.y = this.y + size;
            this.loadTexture('player');
	    console.log('down pressed');
        } else if(cursors.left.justPressed() && this.x != size * 1) {
            this.x = this.x - size;
	    console.log('left pressed');
        } else if(cursors.right.justPressed() && this.x != size * 8) {
            this.x = this.x + size;
	    console.log('right pressed');
        }
    //ADJ!!!
    if(enemy.x == (this.x + size) || enemy.x == (this.x - size) ){
        if (enemy.y == this.y) {
            console.log("ADJACENT R/L");
            this.adj = true;
        }else
            this.adj = false;
    }else if (enemy.y == (this.y + size) || enemy.y == (this.y - size) ){
        if (enemy.x == this.x) {
            console.log("ADJACENT UP/DOWN");
            this.adj = true;
        }else {
            this.adj = false;
        }
    }else {
        this.adj = false;
    }
    
    //WHEN PLAYER IS ADJACENT TO ANYTHING. . .
    if (this.adj == true) {
        //DISPLAY INFORMATION
        this.range.x = this.x - size;
        this.range.y = this.y - size;
        this.range.visible = true;
        
        //Keyboard input only available when adjacent
        if (cKey.justPressed() && this.EXH > 0) {
            //.damage() will handle the killing of sprite if necessary~
            enemy.RPCT += this.CHAR;
            this.EXH -= 1;
            //play audio
            var char = game.add.audio('charSound');
            char.play('',0,1,false)
            //emit sprites
            // collision causes particle explosion
            // add.emitter(x, y, maxParticles)
            var charEmitter = game.add.emitter(this.x + 32, this.y + 32, 20);
            charEmitter.makeParticles('atlas','+_green01');        // image used for particles
            charEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
            charEmitter.minParticleScale = .5;        // set min/max particle size
            charEmitter.maxParticleScale = 1.5;
            charEmitter.setXSpeed(-50,500);            // set min/max horizontal speed
            charEmitter.setYSpeed(-500,500);            // set min/max vertical speed
            charEmitter.start(true, 2000, null, 20);    // (explode, lifespan, freq, quantity)
        }
        if (sKey.justPressed() && this.EXH > 0) {
            //.damage() will handle the killing of sprite if necessary~
            enemy.CTMP += this.SAR;
            this.EXH -= 1;
            //play audio
            var sar = game.add.audio('sarSound');
            sar.play('',0,1,false)
            //emit sprites
            // collision causes particle explosion
            // add.emitter(x, y, maxParticles)
            var sarEmitter = game.add.emitter(this.x + 32, this.y + 32, 20);
            sarEmitter.makeParticles('atlas','-_red01');        // image used for particles
            sarEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
            sarEmitter.minParticleScale = .5;        // set min/max particle size
            sarEmitter.maxParticleScale = 1.5;
            sarEmitter.setXSpeed(-50,500);            // set min/max horizontal speed
            sarEmitter.setYSpeed(-500,500);            // set min/max vertical speed
            sarEmitter.start(true, 2000, null, 20);    // (explode, lifespan, freq, quantity)
        }
    } else {
        this.range.visible = false;
    }
    if(player.EXH == 0) {
        this.tired.x = this.x + size/2;
        this.tired.y = this.y - size/2;
        this.tired.visible = true;
    }else {
        this.tired.visible = false;
    }
    
}
