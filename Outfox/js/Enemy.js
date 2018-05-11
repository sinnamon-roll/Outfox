//Enemies with basic Ai that just follow the player
// prefab constructor function
function Enemy(game, key) {
        // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
        Phaser.Sprite.call(this, game,4* 64,4* 64, key);
	this.scale.setTo(0.25, 0.25);
        // add custom properties
        cursors = game.input.keyboard.createCursorKeys();
        // put some physics on it
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Player;

// override Phaser.Sprite update (Enemy update function)
Enemy.prototype.update = function() {
        if(cursors.up.justPressed()) {
		//check player x and y position, set to wait for player input beforehand
		if(this.y == player.y){
			if(player.x > this.x){
				//move left
				this.x = this.x + 32;
			}else{
				//move right
				this.x = this.x - 32;
			}
		} else if(this.y > player.y){
			//move up
			this.y = this.y - 32
		} else if(this.y < player.y){
			//move down
			this.y = this.y + 32
		} else {
			console.log("Caught!");
		}
        	console.log('up pressed');
        } else if(cursors.down.justPressed()) {
                //check player x and y position, set to wait for player input beforehand
                if(this.y == player.y){
                        if(player.x > this.x){
                                //move left
                                this.x = this.x + 32;
                        }else{  
                                //move right
                                this.x = this.x - 32;
                        }
                } else if(this.y > player.y){
                        //move up
                        this.y = this.y - 32
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + 32
                } else {
                        console.log("Caught!");
                }
        	console.log('down pressed');
        } else if(cursors.left.justPressed()) {
                //check player x and y position, set to wait for player input beforehand
                if(this.y == player.y){
                        if(player.x > this.x){
                                //move left
                                this.x = this.x + 32;
                        }else{  
                                //move right
                                this.x = this.x - 32;
                        }
                } else if(this.y > player.y){
                        //move up
                        this.y = this.y - 32
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + 32
                } else {
                        console.log("Caught!");
                }
        	console.log('left pressed');
        } else if(cursors.right.justPressed()) {
                //check player x and y position, set to wait for player input beforehand
                if(this.y == player.y){
                        if(player.x > this.x){
                                //move left
                                this.x = this.x + 32;
                        }else{  
                                //move right
                                this.x = this.x - 32;
                        }
                } else if(this.y > player.y){
                        //move up
                        this.y = this.y - 32
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + 32
                } else {
                        console.log("Caught!");
                }
        	console.log('right pressed');
	}
}
