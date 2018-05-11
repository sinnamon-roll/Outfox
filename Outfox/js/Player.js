// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
var size = 64;
function Player(game, key) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, size,3 * size, key);
    // add custom properties
	cursors = game.input.keyboard.createCursorKeys();
	// put some physics on it
	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
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
    
    //ADJ?
        if(enemy.x == (this.x + size) || enemy.x == (this.x - size) ||
           enemy.y == (this.y + size) || enemy.y == (this.y - size)) {
            console.log("ADJACENT");
        }
}
