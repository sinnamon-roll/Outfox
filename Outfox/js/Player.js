// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
var size = 64;
var adj = false;
var CHAR;
var HEALTH;
function Player(game, key) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, size,3 * size, key);
    // add custom properties
	cursors = game.input.keyboard.createCursorKeys();
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.health = 10;
    this.CHAR = 5;

	// put some physics on it
	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
    this.style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
    this.text = game.add.text(0, 0, 'C for Charisma!', this.style);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (player update function)
Player.prototype.update = function() {
        if(cursors.up.justPressed()) {
            this.y = this.y - size;
            this.loadTexture('back');
		console.log('up pressed');
        } else if(cursors.down.justPressed()) {
            this.y = this.y + size;
            this.loadTexture('player');
	    console.log('down pressed');
        } else if(cursors.left.justPressed()) {
            this.x = this.x - size;
	    console.log('left pressed');
        } else if(cursors.right.justPressed()) {
            this.x = this.x + size;
	    console.log('right pressed');
        }
    
    //ADJ!!!
    if (enemy.alive == true) {
        if(enemy.x == (this.x + size) || enemy.x == (this.x - size) ){
            if (enemy.y == this.y) {
                console.log("ADJACENT R/L");
                this.adj = true;
            }
        }else if (enemy.y == (this.y + size) || enemy.y == (this.y - size) ){
            if (enemy.x == this.x) {
                console.log("ADJACENT UP/DOWN");
                this.adj = true;
            }
        }else {
            this.adj = false;
        }
    }
    
    //Prompt Charisma
    if (this.adj == true) {
        this.text.visible = true;
        //Keyboard input for Charistma Interaction only available when adjacent
        if (cKey.justPressed()) {
            console.log("So Charismatic~~~~", enemy.health);
            //.damage() will handle the killing of sprite if necessary~
            enemy.damage(this.CHAR);
        }
    } else {
        this.text.visible = false;
    }
    
}
