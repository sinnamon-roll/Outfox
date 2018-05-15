//Enemies with basic Ai that just follow the player
// prefab constructor function
var size = 64;
var CHAR;
var spawnlocX = size*game.rnd.integerInRange(4, 6);
var spawnlocY= size*game.rnd.integerInRange(2, 4);
function Enemy(game, key, tintColor) {
        // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
        Phaser.Sprite.call(this, game, spawnlocX, spawnlocY, key);
        // add custom properties
        cursors = game.input.keyboard.createCursorKeys();
        // put some physics on it
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.health = 10;
        this.CHAR = 5;
        this.tint = tintColor;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update (Enemy update function)
Enemy.prototype.update = function() {
        spawnlocY = size*game.rnd.integerInRange(4, 6);
        spawnlocX = size*game.rnd.integerInRange(2, 4);
        //If the enemy and player are overlapped
        if( this.y == player.y && this.x == player.x){
            if(player.y == size * 4) {
                if (player.x == size * 4) {
                    this.x -= size;
                } else {
                    this.x += size;
                }
            } else {
                this.y += size;
            }
        }
    if(cursors.up.justPressed() && this.y != size) {
		//check player x and y position, set to wait for player input beforehand
		if(this.y == player.y){
			if(player.x > this.x){
				//move left
				this.x = this.x + size;
			}else if(player.x < this.x){
				//move right
				this.x = this.x - size;
			}
		} else if(this.y > player.y){
			//move up
			this.y = this.y - size
		} else if(this.y < player.y){
			//move down
			this.y = this.y + size
		} else {
			console.log("Caught!");
		}
        	console.log('up pressed');
        } else if(cursors.down.justPressed() && this.y != size * 4) {
                //check player x and y position, set to wait for player input beforehand
                if(this.y == player.y){
                        if(player.x > this.x){
                                //move left
                                this.x = this.x + size;
                        }else if(player.x < this.x){  
                                //move right
                                this.x = this.x - size;
                        }
                } else if(this.y > player.y){
                        //move up
                        this.y = this.y - size
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + size
                } else {
                        console.log("Caught!");
                }
        	console.log('down pressed');
        } else if(cursors.left.justPressed() && this.x != size * 3) {
                //check player x and y position, set to wait for player input beforehand
                if(this.y == player.y){
                        if(player.x > this.x){
                                //move left
                                this.x = this.x + size;
                        }else if(player.x < this.x){  
                                //move right
                                this.x = this.x - size;
                        }
                } else if(this.y > player.y){
                        //move up
                        this.y = this.y - size
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + size
                } else {
                        console.log("Caught!");
                }
        	console.log('left pressed');
        } else if(cursors.right.justPressed() && this.x != size * 6) {
                //check player x and y position, set to wait for player input beforehand
                if(this.y == player.y){
                        if(player.x > this.x){
                                //move left
                                this.x = this.x + size;
                        }else if(player.x < this.x){  
                                //move right
                                this.x = this.x - size;
                        }
                } else if(this.y > player.y){
                        //move up
                        this.y = this.y - size
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + size
                } else {
                        console.log("Caught!");
                }
        	console.log('right pressed');
	}
}
