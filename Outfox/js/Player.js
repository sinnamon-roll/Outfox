// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
var size = 64;
var adj = false;
var CHAR;
var SAR;
var EGO;
var CTMP;
var RPCT;
var EXH;
var TYPE; //Ro-Sham-Bo

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
    this.CHAR = 3;
    this.SAR = 1;
    this.EGO = 4;
    this.EXH = 3;
    this.TYPE = "Egotistic";


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
    
}
