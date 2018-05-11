// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
function Player(game, key) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, 64,3 * 64, key);
	this.scale.setTo(0.25, 0.25);
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
            this.y = this.y - 32;
		console.log('up pressed');
        } else if(cursors.down.justPressed()) {
            this.y = this.y + 32;
	    console.log('down pressed');
        } else if(cursors.left.justPressed()) {
            this.x = this.x - 32;
	    console.log('left pressed');
        } else if(cursors.right.justPressed()) {
            this.x = this.x + 32;
	    console.log('right pressed');
        }
}
