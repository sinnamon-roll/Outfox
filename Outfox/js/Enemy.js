//Enemies with basic Ai that just follow the player
// prefab constructor function
var size = 64;
var CHAR;
var SAR;
var EGO;
var CTMP;
var RPCT;
var TYPE;

var spawnlocX = size*game.rnd.integerInRange(1, 8);
var spawnlocY= size*game.rnd.integerInRange(1, 4);
function Enemy(game, key, tintColor) {
        // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
        Phaser.Sprite.call(this, game, spawnlocX, spawnlocY, key);
        // add custom properties
        cursors = game.input.keyboard.createCursorKeys();
        // put some physics on it
        game.physics.arcade.enable(this);

        this.body.collideWorldBounds = true;
        this.health = settings.enemyhealth;
        this.CHAR = 4;
        this.SAR = 5;
        this.EGO = 4;
        this.CTMP = 0
        this.RPCT = 0;

        this.tint = tintColor;
        this.controlled = false;
        this.style = {font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
        this.TYPE = "Sarcastic";

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update (Enemy update function)
Enemy.prototype.update = function() {
        spawnlocY = size*game.rnd.integerInRange(1, 4);
        spawnlocX = size*game.rnd.integerInRange(1, 8);
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
    
    //ENEMY DEATH
    if (this.RPCT >=10) {
        var result = game.add.sprite(this.x, this.y, 'atlas', 'chat_heart_broken');
        result.anchor.setTo(.5,.5);
        game.time.events.add(Phaser.Timer.SECOND, killText, this);
        this.pendingDestroy = true;
    }else if(this.CTMP >= 10) {
        var result = game.add.sprite(this.x, this.y, 'atlas', 'chat_heart_whole');
        result.anchor.setTo(.5,.5);
        game.time.events.add(Phaser.Timer.SECOND, killText, this);
        this.pendingDestroy = true;
    }
    
    function killText() {
        console.log("killText");
        game.add.tween(result).to( { alpha: 0 }, 420, Phaser.Easing.Linear.None, true);
        this.controlled == false;
        player.controlled == true;
        player.moveable == true;
    }
    //trying to make a delay between enemy actions and yours, see if you can get it to work.
    if(this.controlled == true){
        //delay();
        delayOver();
    }

//function delay(){
  //  game.time.events.add(Phaser.Timer.SECOND * 4, delayOver, this);
//}
function delayOver(){
    if(this.controlled == true && this.y != size) {
        //check player x and y position, set to wait for player input beforehand
        this.controlled = false;
        player.controlled = true;
        player.moveable = true;
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
            this.y = this.y - size;
            
        } else if(this.y < player.y){
            //move down
            this.y = this.y + size;
        
        } else {
            console.log("Caught!");
           
        }
            console.log('up pressed');
        } else if(this.controlled == true && this.y != size * 4) {
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
        } else if(this.controlled == true && this.x != size * 3) {
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
                        this.y = this.y - size;
                 
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + size;
                    
                } else {
                        console.log("Caught!");
                        
                    
                }
            console.log('left pressed');
        } else if(this.controlled == true && this.x != size * 6) {
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
                       
                } else if(this.y < player.y){
                        //move down
                        this.y = this.y + size;
                     
                } else {
                        console.log("Caught!");
                    
                }
            console.log('right pressed');
    }
}
}