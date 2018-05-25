//Enemies with basic Ai that just follow the player
// prefab constructor function
var size = 64;
var CHAR;
var SAR;
var EGO;
var CTMP;
var RPCT;
var TYPE;
var NAME;

var iterator = 0;

var spawnlocX;
var spawnlocY;
function Enemy(game, key, tintColor) {
    spawnlocX = size*game.rnd.integerInRange(1, 8);
    spawnlocY= size*game.rnd.integerInRange(1, 4);
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
        this.TYPE = "Sarcastic";
        this.NAME = "Reynard";
    
        this.tint = tintColor;
        this.controlled = settings.enemyCONTROL;
        this.moveable = false;
        this.style = {font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

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
        //test to see if i can get the turns to actually work if i made the enemy player controlled. yup
        // if(this.controlled == true){
        
        //     if(cursors.up.justPressed() && this.y != size) {
        //         this.y = this.y - size;
        //         this.controlled = false;
        //         player.controlled = true;
        //         player.moveable = true;
        //         console.log('up pressed');
        //     } else if(cursors.down.justPressed() && this.y != size * 4) {
        //         this.y = this.y + size;
        //         this.controlled = false;
        //         player.controlled = true;
        //         player.moveable = true;
        //         console.log('down pressed');
        //     } else if(cursors.left.justPressed() && this.x != size * 1) {
        //         this.x = this.x - size;
        //         this.controlled = false;
        //         player.controlled = true;
        //         player.moveable = true;
        //         console.log('left pressed');
        //     } else if(cursors.right.justPressed() && this.x != size * 8) {
        //         this.x = this.x + size;
        //         this.controlled = false;
        //         player.controlled = true;
        //         player.moveable = true;
        //         console.log('right pressed');
        //     }
        // }
        if(this.controlled == true) {
            if(Math.floor(iterator) == 1){
                if(this.y == player.y){
                    if(player.x > this.x){
                        this.x = this.x + size;
                        this.controlled = false;
                        iterator = 0;
                        player.controlled = true;
                        player.moveable = true;
                    }else if(player.x < this.x){
                        this.x = this.x - size;
                        this.controlled = false;
                        iterator = 0;
                        player.controlled = true;
                        player.moveable = true;
                    }
                }else if(this.y < player.y){
                    this.y = this.y + size;
                    this.controlled = false;
                    iterator = 0;
                    player.controlled = true;
                    player.moveable = true;
                }else if(this.y > player.y){
                    this.y = this.y - size;
                    this.controlled = false;
                    iterator = 0;
                    player.controlled = true;
                    player.moveable = true;
                }
            }
            console.log('hey we hit this at least')
            iterator += 0.01;
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
            player.moveable == true;
        }
    //trying to make a delay between enemy actions and yours, see if you can get it to work.
    //if(this.controlled == true){
        //delay();
    //    console.log("ENEMY NO TURN");

    //}

//function delay(){
  //  game.time.events.add(Phaser.Timer.SECOND * 4, delayOver, this);
//}
}
