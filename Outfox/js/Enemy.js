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
    spawnlocX = size*game.rnd.integerInRange(5, 8);
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

        if(this.controlled == true) {
            gameLog.setText(this.NAME +'\'s turn.');
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
                gameLog.setText(this.NAME +' runs around!');
            }
            console.log('NPC Turn');
            iterator += 0.01;
        }

        //ENEMY DEATH
        if (this.RPCT >=10) {
            gameLog.setText(this.NAME +', overwhelmed by your zeal, got intimidated and ran.');
            var result = game.add.sprite(this.x, this.y, 'atlas', 'chat_heart_broken');
            result.anchor.setTo(.5,.5);
            game.time.events.add(Phaser.Timer.SECOND, killText, this);
            this.pendingDestroy = true;
        }else if(this.CTMP >= 10) {
            gameLog.setText(this.NAME +' walked away convinced to join your escape effort.');
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

}
