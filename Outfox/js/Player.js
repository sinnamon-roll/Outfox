// stuff i have yet to code, but its gonna be the prefab for the player character
// Player prefab constructor function
var size = 64;
var CHAR;
var SAR;
var EGO;
var CTMP;
var RPCT;
var EXH;
var TYPE; //Ro-Sham-Bo
var NAME;
var turnPC = false;

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
    this.CHAR = 3;
    this.SAR = 2;
    this.EGO = 4;
    this.EXH = 3;
    this.NAME = "Zerda";

    this.charb = false;
    this.sarcb = false;
    this.enerb = false;
    this.waitb = false;

    this.controlled = true;
    this.moveable = false;
    this.acted = false;
    this.displayed = true;
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
    this.popup = game.add.sprite(this.x + 19, this.y - 18, 'atlas','s_batteryOut');
    this.popup.visible = false;
    
    //CURSOR
    this.cursor = game.add.sprite(this.x, this.y, 'cursor');
    
    //ANIMATIONS
    this.animations.add('left', [6,7,8], 10,false);
    this.animations.add('right', [9,10,11], 10,false);
    this.animations.add('up', [3,4,5], 10,false);
    this.animations.add('down', [0,1,2], 10,false);
    this.popup.animations.add('silent', [2,3,9], 1, false);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

//override Phaser.Sprite update (player update function)
Player.prototype.update = function() {
	if (this.moveable == true){
        if(cursors.up.justPressed() ) {
            if(this.y == size){
                add2Log('The laboratory wall prevents you from going further.');
            }else if(enemy.y ==(this.y - size) && enemy.adj == true ){
                add2Log(enemy.NAME + ' blocks your path.');
            }else if(BFF.y ==(this.y - size) && BFF.adj == true ){
                add2Log(BFF.NAME + ' blocks your path.');
            }else if(enemy2.y ==(this.y - size) && this.x == enemy2.x ){
                add2Log(enemy2.NAME + ' blocks your path.');
            }else {
                this.y = this.y - size;
                this.cursor.y = this.cursor.y - size;
                add2Log(this.NAME + ' takes a step.');
            }
            this.animations.play('up');
            this.moveable = false;
            pressed = false;
            console.log('up pressed');
            
        } else if(cursors.down.justPressed() ) {
            if(this.y == size * 4){
                add2Log('The laboratory wall prevents you from going further.');
            }else if(enemy.y ==(this.y + size) && enemy.adj == true ){
                add2Log(enemy.NAME + ' blocks your path.');
            }else if(BFF.y ==(this.y + size) && BFF.adj == true ){
                add2Log(BFF.NAME + ' blocks your path.');
            }else if(enemy2.y ==(this.y + size) && this.x == enemy2.x ){
                add2Log(enemy2.NAME + ' blocks your path.');
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
                add2Log(enemy.NAME + ' blocks your path.');
            }else if(BFF.x ==(this.x - size) && BFF.adj == true){
                add2Log(BFF.NAME + ' blocks your path.');
            }else if(enemy2.x ==(this.x - size) && this.y == enemy2.y){
                add2Log(enemy2.NAME + ' blocks your path.');
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
            }else if(enemy.x ==(this.x + size) && enemy.adj == true ){
                add2Log(enemy.NAME + ' blocks your path.');
            }else if(BFF.x ==(this.x + size) && BFF.adj == true ){
                add2Log(BFF.NAME + ' blocks your path.');
            }else if(enemy2.x ==(this.x + size) && this.y == enemy2.y ){
                add2Log(enemy2.NAME + ' blocks your path.');
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
  if (this.controlled == true){
      //DISPLAY STATS
      this.cursor.visible = true;
      playerStats.visible = true;
      playerIcon.loadTexture('UI','s_nar_NPC04');
      playerIcon.visible = true;
      playerTarget.loadTexture('UI','s_activeFox');
      playerTarget.visible = true;
      leftName.setText(this.NAME);
      leftName.visible = true;
      playerUI.visible = true;
      playerStats.text = 'Type: ' + this.TYPE + '\n' +
      'Charisma: ' + this.CHAR + '\n' +
      'Sarcasm: ' + this.SAR + '\n' +
      'Ego: ' + this.EGO + '\n' +
      'Resolve: ' + this.EXH + '\n'
      ;
      setBgColorById('main-page','#fff');
      if(turnPC == false){
                add2Log('Zerda\'s turn.');
                turnPC = true;
      }
      
        if (this.charb == true && (enemy.adj == true || enemy2.adj == true)){
            game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
    	  }else if(this.sarcb == true && (enemy.adj == true || enemy2.adj == true)){
            game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
        }else if(this.waitb == true){
            console.log("Waiting");
            add2Log(this.NAME + ' takes a moment to compose a thought and ends their turn.');
            this.moveable = false;
            pressed = false;
            this.waitb = false;
            this.controlled = false;
            this.acted = true;
            turnPC = false;
            game.time.events.add(Phaser.Timer.SECOND * 3, useAction, this);
        }
      
      if (enemy.adj == true) {
          //display stats
          enemyStats.visible = true;
          enemyIcon.loadTexture('UI', 's_Fox_NPC01');
          enemyIcon.visible = true;
          enemyUI.visible = true;
          enemyTarget.loadTexture('UI', 's_foxTarget');
          rightName.setText(enemy.NAME);
          rightName.visible = true;
          enemyStats.setText('Type: ' + enemy.TYPE + '\n' +
          'Charisma: ' + enemy.CHAR + '\n' +
          'Sarcasm: ' + enemy.SAR + '\n' +
          'Ego: ' + enemy.EGO + '\n' +
          //'Resolve: ' + enemy.EXH + '\n' +
          'Respect: ' + enemy.RPCT + '\n' +
          'Contempt: ' + enemy.CTMP + '\n')
          ;
          
      } else if (enemy2.adj == true) {
          //display stats
          enemyStats.visible = true;
          enemyIcon.loadTexture('UI', 's_nar_NPC03');
          enemyIcon.visible = true;
          enemyUI.visible = true;
          enemyTarget.loadTexture('UI', 's_foxTarget');
          rightName.setText(enemy2.NAME);
          rightName.visible = true;
          enemyStats.setText('Type: ' + enemy2.TYPE + '\n' +
            'Charisma: ' + enemy2.CHAR + '\n' +
            'Sarcasm: ' + enemy2.SAR + '\n' +
            'Ego: ' + enemy2.EGO + '\n' +
            'Respect: ' + enemy2.RPCT + '\n' +
            'Contempt: ' + enemy2.CTMP + '\n')
          ;
          
      } else {
          enemyStats.visible = false;
          enemyIcon.visible = false;
          rightName.visible = false;
          enemyUI.visible = false;
          enemyTarget.loadTexture('UI', 's_noTarget');
      }
  }
  if(this.controlled == false && this.moveable == false && this.acted == true){
        this.cursor.visible = false;
        this.acted = false;
        this.displayed = false;
        BFF.displayed = true;
        BFF.controlled = true;
        movesel = true;
        barksel = false;
        facesel = false;
        endsel = false;
        movebutt.unusable = false;
        barkbutt.unusable = false;
        barkbutt.usable = true;
        pressed = false;
        barkbutt.animations.play('BarkOff');
  }
    if (this.controlled == true){
        this.popup.x = this.x + 19;
        this.popup.y = this.y - 18;
        this.popup.animations.play('silent');
        this.popup.visible = true;
        this.popup.bringToTop();
    }else {
        this.popup.visible = false;
    }
    
    if(this.EXH == 0) {
        this.tired.frame = 8;
        this.tired.x = this.x + 19;
        this.tired.y = this.y - 18;
        this.tired.visible = true;
        this.tired.bringToTop();
    }else {
        this.tired.visible = false;
    }
    
    function useAction() {
        console.log("using Player's action");
        //this.acted = true;
        pressed = false;
    }
    if(this.displayed == true){
        this.cursor.visible = true;
        playerStats.visible = true;
        playerIcon.loadTexture('UI','s_nar_NPC04');
        playerIcon.visible = true;
        playerTarget.loadTexture('UI','s_activeFox');
        playerTarget.visible = true;
        leftName.setText(this.NAME);
        leftName.visible = true;
        playerUI.visible = true;
        playerStats.text = 'Type: ' + this.TYPE + '\n' +
        'Charisma: ' + this.CHAR + '\n' +
        'Sarcasm: ' + this.SAR + '\n' +
        'Ego: ' + this.EGO + '\n' +
        'Resolve: ' + this.EXH + '\n'
        ;
    }
    
}


