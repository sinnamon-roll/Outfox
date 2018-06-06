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
function Enemy(game, key) {
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
            rightName.setText(enemy.NAME);
            rightName.visible = true;
            playerTarget.loadTexture('UI', 's_noTarget');
            enemyStats.setText('Type: ' + enemy.TYPE + '\n' +
                            'Charisma: ' + enemy.CHAR + '\n' +
                            'Sarcasm: ' + enemy.SAR + '\n' +
                            'Ego: ' + enemy.EGO + '\n' +
                            'Respect: ' + enemy.RPCT + '\n' +
                            'Contempt: ' + enemy.CTMP + '\n');
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
            this.controlled = false;
            player.controlled = true;
            player.displayed = true;
        }
    function moveRight() {
        enemy.x = enemy.x + size;
        enemy.animations.play('right');
        enemy.frame = 10;
        enemy.controlled = false;
        iterator = 0;
        player.displayed = true;
        player.controlled = true;
        
    }
    function moveLeft() {
        enemy.x = enemy.x - size;
        enemy.animations.play('left');
        enemy.frame = 7;
        enemy.controlled = false;
        iterator = 0;
        player.displayed = true;
        player.controlled = true;
        
    }
    function moveDown () {
        enemy.y = enemy.y + size;
        enemy.animations.play('down');
        enemy.frame = 1;
        enemy.controlled = false;
        iterator = 0;
        player.displayed = true;
        player.controlled = true;
        
    }
    function moveUp() {
        enemy.y = enemy.y - size;
        enemy.animations.play('up');
        enemy.frame = 4;
        enemy.controlled = false;
        iterator = 0;
        player.displayed = true;
        player.controlled = true;

    }

}
