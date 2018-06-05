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
var adj;

var iterator = 0;

var spawnlocX;
var spawnlocY;
function Enemy(game, x, y, key, name, char, sar, ego, type) {
//    spawnlocX = size*game.rnd.integerInRange(5, 8);
//    spawnlocY= size*game.rnd.integerInRange(1, 4);
        // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
        Phaser.Sprite.call(this, game, x, y, key);
        // add custom properties
        cursors = game.input.keyboard.createCursorKeys();
        // put some physics on it
        game.physics.arcade.enable(this);

        this.body.collideWorldBounds = true;
        this.CHAR = char;
        this.SAR = sar;
        this.EGO = ego;
        this.CTMP = 8;
        this.RPCT = 0;
        this.TYPE = type;
        this.NAME = name;
        this.adj = false;
    
        this.controlled = false;
        this.moveable = false;
        this.style = {font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
    
        //ANIMATIONS
        this.animations.add('left', [6,7,8], false);
        this.animations.add('right', [9,10,11], false);
        this.animations.add('up', [3,4,5,3], false);
        this.animations.add('down', [0,1,2], false);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// override Phaser.Sprite update (Enemy update function)
Enemy.prototype.update = function() {
        spawnlocY = size*game.rnd.integerInRange(1, 4);
        spawnlocX = size*game.rnd.integerInRange(1, 8);
        //If the enemy and player are overlapped
        if( (this.y == player.y && this.x == player.x) || (this.y == BFF.y && this.x == BFF.x)){
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
            playerIcon.visible = false;
            playerStats.visible = false;
            leftName.visible = false;
            playerUI.visible = false;
            enemyIcon.loadTexture('UI','s_Fox_NPC01');
            enemyIcon.visible = true;
            enemyUI.visible = true;
            rightName.setText(this.NAME);
            rightName.visible = true;
            playerTarget.loadTexture('UI', 's_noTarget');
            enemyStats.setText('Type: ' + this.TYPE + '\n' +
                            'Charisma: ' + this.CHAR + '\n' +
                            'Sarcasm: ' + this.SAR + '\n' +
                            'Ego: ' + this.EGO + '\n' +
                            'Respect: ' + this.RPCT + '\n' +
                            'Contempt: ' + this.CTMP + '\n');
            enemyStats.visible = true;

            if (player.adj == true) {
                playerTarget.loadTexture('UI','s_foxTarget');
                playerIcon.visible = true;
                playerStats.visible = true;
                leftName.visible = true;
                playerUI.visible = true;
            } else
            enemyTarget.loadTexture('UI','s_activeFox');
            enemyUI.visible = true;
            gameLog.setText(this.NAME +'\'s turn.');
            
            
            
            //ENEMY TURN
            if(Math.floor(iterator) == 1){
                if(this.y == size){
                    moveDown();
                }else if(this.y == size * 4){
                    moveUp();
                }else {
                    rnd = game.rnd.integerInRange(-1, 1);
                    if (rnd == -1) {
                        moveUp();
                    }
                    else {
                        moveDown();
                    }
                }
                //END ENEMY TURN
                gameLog.setText(this.NAME +' runs around!');
                enemyTarget.loadTexture('UI','s_foxTarget');
                rightName.visible = false;
                enemyUI.visible = false;
                enemyStats.visible = false;
            }
            console.log('NPC Turn');
            iterator += 0.01;
        }

        //ENEMY DEATH
        if (this.RPCT >=10) {
            gameLog.setText(this.NAME +', overwhelmed by your zeal, got intimidated and ran.');
            var result = game.add.sprite(this.x+19, this.y-18, 'atlas', 'chat_heart_broken');
            result.animations.add('break', [4,5,6,7,6], 7,true);
            result.play('break');
            game.time.events.add(Phaser.Timer.SECOND, killText, this);
            this.pendingDestroy = true;
        }else if(this.CTMP >= 10) {
            //MARK AS SUCCESSFULLY RECRUITED FOR CREDITS
            freeFox[0] = true;
            console.log(freeFox);
            freeFox[1] = true;
            console.log(freeFox);
            //GAMELOG TEXT
            gameLog.setText(this.NAME +' walked away convinced to join your escape effort.');
            //SPRITE EFFECT
            var result = game.add.sprite(this.x +19, this.y-18, 'atlas', 'chat_heart_whole');
            result.animations.add('beat', [4, 5], 7,true);
            result.play('beat');
            game.time.events.add(Phaser.Timer.SECOND * 1.5, killText, this);
            this.pendingDestroy = true;
        }
        
        function killText() {
            console.log("killText");
            game.add.tween(result).to( { alpha: 0 }, 420, Phaser.Easing.Linear.None, true);
            this.controlled == false;
            player.moveable == true;
        }
    function moveRight() {
        enemy.x = enemy.x + size;
        enemy.animations.play('right');
        enemy.frame = 10;
        enemy.controlled = false;
        iterator = 0;
        enemy.controlled = true;
        player.moveable = true;
    }
    function moveLeft() {
        enemy.x = enemy.x - size;
        enemy.animations.play('left');
        enemy.frame = 7;
        enemy.controlled = false;
        iterator = 0;
        player.controlled = true;
        player.moveable = true;
    }
    function moveDown () {
        enemy.y = enemy.y + size;
        enemy.animations.play('down');
        enemy.frame = 1;
        enemy.controlled = false;
        iterator = 0;
        player.controlled = true;
        player.moveable = true;
    }
    function moveUp() {
        enemy.y = enemy.y - size;
        enemy.animations.play('up');
        enemy.frame = 4;
        enemy.controlled = false;
        iterator = 0;
        player.controlled = true;
        player.moveable = true;
    }

}
