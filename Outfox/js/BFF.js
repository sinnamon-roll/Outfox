// BFF Fox's Comrade
// prefab constructor function

function Bff(game, key) {
        // call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
        Phaser.Sprite.call(this, game, size * 3, size * 4, key);
        // add custom properties
        //cursors = game.input.keyboard.createCursorKeys();

        // put some physics on it
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.CHAR = 4;
        this.SAR = 3;
        this.EGO = 3;
        this.CTMP = 0;
        this.RPCT = 0;
        this.EXH = 9999;
        this.TYPE = "Charisma";
        this.NAME = "Tod";

        this.charb = false;
        this.sarcb = false;
        this.enerb = false;
        this.waitb = false;

        this.moveable = false;
        this.controlled = false;
        this.acted = false;
        this.displayed = false;
        this.adj = false;
    
        //EXHAUSTION
        this.popup = game.add.sprite(this.x + 19, this.y - 18, 'atlas','s_batteryOut');
        this.popup.visible = false;
    
    //CURSOR
    this.cursor = game.add.sprite(this.x, this.y, 'cursor');
    this.cursor.visible = false;
    
    //ANIMATIONS
        this.animations.add('left', [6,7,8], 120, false);
        this.animations.add('right', [9,10,11], 120, false);
        this.animations.add('up', [3,4,5], 120, false);
        this.animations.add('down', [0,1,2], 120, false);
        this.popup.animations.add('silent', [2,3,9], 1, false);

}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Bff.prototype = Object.create(Phaser.Sprite.prototype);
Bff.prototype.constructor = Bff;

// override Phaser.Sprite update (Enemy update function)
Bff.prototype.update = function() {
    //IF it is BFF's turn to move
    if(this.moveable == true){
        
        if(cursors.up.justPressed() ) {
            if(this.y == size){
                add2Log('The laboratory wall prevents you from going further.');
            }else if(enemy.y ==(this.y - size) && enemy.x == this.x ){
                add2Log(enemy.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(player.y ==(this.y - size) && player.x == this.x ){
                add2Log(player.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(enemy2.y ==(this.y - size) && enemy2.x == this.x ){
                add2Log(enemy2.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else {
                this.y = this.y - size;
                this.cursor.y = this.cursor.y - size;
                add2Log(this.NAME + ' takes a step.');
            }
            this.animations.play('up');
            this.frame = 4;
            this.moveable = false;
            pressed = false;
            console.log('up pressed');
            
        } else if(cursors.down.justPressed() ) {
            if(this.y == size * 4){
                add2Log('The laboratory wall prevents you from going further.');
            }else if(enemy.y ==(this.y + size) && enemy.x == this.x ){
                add2Log(enemy.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(player.y ==(this.y + size) && player.x == this.x ){
                add2Log(player.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(enemy2.y ==(this.y + size) && enemy2.x == this.x ){
                add2Log(enemy2.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else {
                this.y = this.y + size;
                this.cursor.y = this.cursor.y + size;
                add2Log(this.NAME + ' takes a step.');
            }
            this.animations.play('down');
            this.frame = 1;
            this.moveable = false;
            pressed = false;
            console.log('down pressed');
            
        } else if(cursors.left.justPressed() ) {
            if (this.x == size) {
                add2Log('The laboratory wall prevents you from going further.');
            }else if(enemy.x ==(this.x - size) && enemy.y == this.y){
                add2Log(enemy.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(player.x ==(this.x - size) && player.y == this.y){
                add2Log(player.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(enemy2.x ==(this.x - size) && enemy2.y == this.y){
                add2Log(enemy2.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else {
                this.x = this.x - size;
                this.cursor.x = this.cursor.x - size;
                add2Log(this.NAME + ' takes a step.');
            }
            this.animations.play('left');
            this.frame = 7;
            this.moveable = false;
            pressed = false;
            console.log('left pressed');
            
        } else if(cursors.right.justPressed() ) {
            if (this.x == size * 8) {
                add2Log('The laboratory wall prevents you from going further.');
            }else if(enemy.x ==(this.x + size) && enemy.y == this.y ){
                add2Log(enemy.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(player.x ==(this.x + size) && player.y == this.y ){
                add2Log(player.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else if(enemy2.x ==(this.x + size) && enemy2.y == this.y ){
                add2Log(enemy2.NAME + ' blocks ' + this.NAME +'\'s path.');
            }else {
                this.x = this.x + size;
                this.cursor.x = this.cursor.x + size;
                add2Log(this.NAME + ' takes a step.');
            }
            this.animations.play('right');
            this.frame = 10;
            this.moveable = false;
            pressed = false;
            console.log('right pressed');
        }
    }
    //If the BFF and player are overlapped
        if( this.y == player.y && this.x == player.x){
            console.log("Player Overlap");
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
    if(player.x == (this.x + size) || player.x == (this.x - size) ){
        if (player.y == this.y) {
            this.adj = true;
        }else
            this.adj = false;
    }else if (player.y == (this.y + size) || player.y == (this.y - size) ){
        if (player.x == this.x) {
            this.adj = true;
        }else {
            this.adj = false;
        }
    }else {
        this.adj = false;
    }
    
    if(this.controlled == true){
        //DISPLAY STATS
        this.cursor.visible = true;
        leftName.setText(this.NAME);
        playerIcon.loadTexture('UI','s_nar_PC');
        playerStats.text = 'Type: ' + this.TYPE + '\n' +
        'Charisma: ' + this.CHAR + '\n' +
        'Sarcasm: ' + this.SAR + '\n' +
        'Ego: ' + this.EGO + '\n' +
        'Resolve: ' + this.EXH + '\n'
        ;
        setBgColorById('main-page','#ccc');
        if(this.adj == true) {
            //DISPLAY FOX TARGET INFO
            enemyTarget.loadTexture('UI', 's_foxTarget');
            enemyIcon.loadTexture('UI', 's_nar_NPC04');
            enemyIcon.visible = true;
            enemyStats.visible = true;
            enemyUI.visible = true;
            enemyTarget.loadTexture('UI', 's_foxTarget');
            rightName.setText(enemy.NAME);
            rightName.visible = true;
            rightName.setText(player.NAME);
            enemyStats.setText('Type: ' + player.TYPE + '\n' +
            'Charisma: ' + player.CHAR + '\n' +
            'Sarcasm: ' + player.SAR + '\n' +
            'Ego: ' + player.EGO + '\n' +
            'Resolve: ' + player.EXH + '\n')
            ;
                if (this.enerb == true && player.EXH <=7) {
                    player.EXH += 3;
                    add2Log('The fox who treated you with kindness gives you an encouraging bark.');
                    //play audio
                    var bark = game.add.audio('boostSound');
                    bark.play('',0,1,false)
                    //Animate Battery
                    var popup = game.add.sprite(player.x +19, player.y - 18, 'atlas', 's_batteryFull');
                    game.time.events.add(Phaser.Timer.SECOND * 0.5, killPop, this);
                    game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
                    this.acted = true;
                    this.enerb = false;
                }else if (this.enerb == true && player.EXH >=7) {
                    add2Log('The kind fox has little to say.');
                    game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
                    this.acted = true;
                    this.enerb = false;
                }
        } else {
            enemyIcon.visible = false;
            enemyUI.visible = false;
            rightName.visible = false;
            enemyStats.visible = false;
        }
	}
    if (this.controlled == true){
        if(this.waitb == true){
            console.log("Waiting");
            add2Log(this.NAME + ' takes a moment to compose a thought.');
            this.controlled = false;
            this.waitb = false;
            game.time.events.add(Phaser.Timer.SECOND * 3, changeTurn, this);
        }
    }
    if(this.controlled == false && this.moveable == false && this.acted == true){
        this.cursor.visible = false;
        if(enemygroup.length > 0) {
            enemygroup.cursor.controlled = true;
        }else {
            player.controlled = true;
            player.moveable = true;
        }
        this.acted = false;
        this.displayed = false;
        movebutt.usable = true;
        movebutt.unusable = false;
        barkbutt.usable = true;
        barkbutt.unusable = false;
        pressed = false;

  	}
    if (this.controlled == true) {
        this.popup.x = this.x + 19;
        this.popup.y = this.y - 18;
        this.popup.animations.play('silent');
        this.popup.visible = true;
        this.popup.bringToTop();
    }else {
        this.popup.visible = false;
    }

    function killPop() {
        console.log("killPop");
        game.add.tween(popup).to( { alpha: 0 }, 420, Phaser.Easing.Linear.None, true);
    }
    function changeTurn() {
        console.log("switching");
        this.moveable = false;
        this.acted = true;
    }
    function useAction() {
        console.log("using your action");
        this.controlled = false;
        this.acted = true;
        this.enerb = false;
    }


}
