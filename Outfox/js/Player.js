// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
var size = 64;
var adj = false;
var CHAR;
var SAR;
var EGO;
var CTMP;
var RPCT;
var EXH;
var TYPE; //Ro-Sham-Bo
var NAME;

function Player(game, key) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, 4 *size,3 * size, key);
    // add custom properties
	//KEYBOARD INPUTS
    cursors = game.input.keyboard.createCursorKeys();
    cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);


    //CHARACTER STATS
    this.health = settings.playerhealth;
    this.CHAR = 3;
    this.SAR = 1;
    this.EGO = 4;
    this.EXH = 3;
    this.NAME = "Player Fox";

    this.controlled = true;
    this.moveable = true;
    this.acted = false;
    //game.time.events.add(Phaser.Timer.SECOND*5, this.delayOver, this);

    this.TYPE = "Egotistic";



	// put some physics on it
	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
    this.style = {font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
    //Cardinal direction map for PC's area of influence
    //this.range = game.add.sprite(this.x - size, this.y - size, 'adj')
    //this.range.visible = false;
    
    //EXHAUSTION
    this.tired = game.add.sprite(this.x + size, this.y - size, 'atlas','s_batteryOut');
    this.tired.visible = false;
    
    //SILENCE
    this.popup = game.add.sprite(this.x + size, this.y - size, 'atlas','s_batteryOut');
    this.popup.visible = false;
    
    //ANIMATIONS
    this.animations.add('left', [6,7,8], false);
    this.animations.add('right', [9,10,11], false);
    this.animations.add('up', [3,4,5], false);
    this.animations.add('down', [0,1,2], false);
    this.popup.animations.add('silent', [2,3,9], 1, false);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override Phaser.Sprite update (player update function)
Player.prototype.update = function() {
	if (this.moveable == true){
        if(cursors.up.justPressed() ) {
            if(this.y == size){
                gameLog.setText('The laboratory wall prevents you from going further.');
            }else if(enemy.y ==(this.y - size) && this.adj == true ){
                gameLog.setText(enemy.NAME + ' blocks your path.');
            }else if(BFF.y ==(this.y - size) && BFF.adj == true ){
                gameLog.setText(BFF.NAME + ' blocks your path.');
            }else {
                this.y = this.y - size;
                gameLog.setText(this.NAME + ' takes a step.');
            }
            this.animations.play('up');
            this.frame = 4;
            this.moveable = false;
            console.log('up pressed');
            
        } else if(cursors.down.justPressed() ) {
            if(this.y == size * 4){
                gameLog.setText('The laboratory wall prevents you from going further.');
            }else if(enemy.y ==(this.y + size) && this.adj == true ){
                gameLog.setText(enemy.NAME + ' blocks your path.');
            }else if(BFF.y ==(this.y + size) && BFF.adj == true ){
                gameLog.setText(BFF.NAME + ' blocks your path.');
            }else {
                this.y = this.y + size;
                gameLog.setText(this.NAME + ' takes a step.');
            }
            this.animations.play('down');
            this.frame = 1;
            this.moveable = false;
            console.log('down pressed');
            
        } else if(cursors.left.justPressed() ) {
            if (this.x == size) {
                gameLog.setText('The laboratory wall prevents you from going further.');
            }else if(enemy.x ==(this.x - size) && enemy.y == this.y){
                gameLog.setText(enemy.NAME + ' blocks your path.');
            }else if(BFF.x ==(this.x - size) && BFF.adj == true){
                gameLog.setText(BFF.NAME + ' blocks your path.');
            }else {
                this.x = this.x - size;
                gameLog.setText(this.NAME + ' takes a step.');
            }
            this.animations.play('left');
            this.frame = 7;
            this.moveable = false;
            console.log('left pressed');
            
        } else if(cursors.right.justPressed() ) {
            if (this.x == size * 8) {
                gameLog.setText('The laboratory wall prevents you from going further.');
            }else if(enemy.x ==(this.x + size) && this.adj == true ){
                gameLog.setText(enemy.NAME + ' blocks your path.');
            }else if(BFF.x ==(this.x + size) && BFF.adj == true ){
                gameLog.setText(BFF.NAME + ' blocks your path.');
            }else {
                this.x = this.x + size;
                gameLog.setText(this.NAME + ' takes a step.');
            }
            this.animations.play('right');
            this.frame = 10;
            this.moveable = false;
            console.log('right pressed');
        }
  }
  if (this.controlled == true){
      //DISPLAY STATS
      playerIcon.loadTexture('UI','s_nar_PC');
      leftName.setText(this.NAME);
      playerStats.text = 'Type: ' + this.TYPE + '\n' +
      'Charisma: ' + this.CHAR + '\n' +
      'Sarcasm: ' + this.SAR + '\n' +
      'Ego: ' + this.EGO + '\n' +
      'Resolve: ' + this.EXH + '\n'
      ;
      
        if (cKey.justPressed() && this.adj == true){
            game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
    	}else if(sKey.justPressed() && this.adj == true){
            game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
        }else if(wKey.justPressed()){
            console.log("Waiting");
            gameLog.setText(this.NAME + ' takes a moment to compose a thought.');
            this.moveable = false;
            game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
        }
  }
  if(this.controlled == false && this.moveable == false && this.acted == true){
        BFF.controlled = true;
        BFF.moveable = true;
        this.acted = false;
  }
    if (this.controlled == false) {
        this.popup.x = this.x + size/2;
        this.popup.y = this.y - size/2;
        this.popup.animations.play('silent');
        this.popup.visible = true;
        this.popup.bringToTop();
    }else {
        this.popup.visible = false;
    }
    
    if(this.EXH == 0) {
        this.tired.frame = 8;
        this.tired.x = this.x + size/2;
        this.tired.y = this.y - size/2;
        this.tired.visible = true;
        this.tired.bringToTop();
    }else {
        this.tired.visible = false;
    }
    
    function useAction() {
        console.log("using Player's action");
        this.controlled = false;
        this.acted = true;
    }
    
}
