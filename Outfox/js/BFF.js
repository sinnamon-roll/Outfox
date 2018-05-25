//Player Fox's Comrade
// prefab constructor function
var size = 64;
var adj = false;
var CHAR;
var SAR;
var EGO;
var CTMP;
var RPCT;
var TYPE; //Ro-Sham-Bo
var NAME;

function BFF(game, key) {
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
        this.TYPE = "Charisma";
        this.NAME = "The Patient Fox";

        this.tint = 0xE8AA14;
        this.moveable = false;
        this.controlled = false;
        this.acted = false;
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
BFF.prototype = Object.create(Phaser.Sprite.prototype);
BFF.prototype.constructor = BFF;

// override Phaser.Sprite update (Enemy update function)
BFF.prototype.update = function() {
    //IF it is BFF's turn to move
    if(this.moveable == true){
        
        if(cursors.up.justPressed() && this.y != size) {
            this.y = this.y - size;
            this.loadTexture('back');
            this.moveable = false;
        console.log('up pressed');
        } else if(cursors.down.justPressed() && this.y != size * 4) {
            this.y = this.y + size;
            this.loadTexture('player');
            this.moveable = false;
        console.log('down pressed');
        } else if(cursors.left.justPressed() && this.x != size * 1) {
            this.x = this.x - size;
            this.moveable = false;
        console.log('left pressed');
        } else if(cursors.right.justPressed() && this.x != size * 8) {
            this.x = this.x + size;
            this.moveable = false;
        console.log('right pressed');
        }
    }
    //If the BFF and player are overlapped
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
	    if(this.adj == true) {
	        if (bKey.justPressed() && player.EXH <=7) {
	            player.EXH += 3;
	            gameLog.setText('The fox who treated you with\nkindness gives you an\n encouraging bark.');
	            //play audio
	            var bark = game.add.audio('boostSound');
	            bark.play('',0,1,false)
                //Animate Battery
                var popup = game.add.sprite(player.x, player.y, 'atlas', 's_batteryFull');
                popup.anchor.setTo(.5,.5);
                game.time.events.add(Phaser.Timer.SECOND * 0.5, killPop, this);
	            this.controlled = false;
                this.acted = true;
	        }else if (bKey.justPressed() && player.EXH >=7) {
	            gameLog.setText('The kind fox has little to say.');
	            this.controlled = false;
                this.acted = true;
	        }
	    }
	}
    if (this.controlled == true){
        if (cKey.justPressed()){
            this.controlled = false;
            this.acted = true;
        }else if(sKey.justPressed()){
            this.controlled = false;
            this.acted = true;
        }else if(wKey.justPressed()){
            console.log("Waiting");
            this.controlled = false;
            this.moveable = false;
            this.acted = true;
        }
    }
    if(this.controlled == false && this.moveable == false && this.acted == true){
        enemy.controlled = true;
        this.acted = false;

  	}

    function killPop() {
        console.log("killPop");
        game.add.tween(popup).to( { alpha: 0 }, 420, Phaser.Easing.Linear.None, true);
    }

}
