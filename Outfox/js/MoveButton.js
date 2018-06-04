//variables governing "move"
var moveloX = 0;//settings.movelocX;
var moveloY = 64;//settings.movelocY;
var movesel;
var movekey = 's_Move_inact';
//variable governing the atlas
var atlas = 'UI';

function moveButton(game, type) {
	this.i = 0;
	this.useable = false;
	Phaser.Sprite.call(this, game, moveloX, moveloY, atlas, movekey);
	this.animations.add('MoveOn', ['s_Move_act'], 60, true, false);
	this.animations.add('MoveOff', ['s_Move_inact'], 60, true, false);
	this.animations.add('Used', [''])
	movesel = true;
	cursors = game.input.keyboard.createCursorKeys();


}
moveButton.prototype = Object.create(Phaser.Sprite.prototype);
moveButton.prototype.constructor = moveButton;
moveButton.prototype.update = function() {
	if(movesel == true){
		if(Math.floor(this.i) == 1){
			if(enemy.controlled == true){
				this.usable = false;
			}else{
				this.usable = true;
			}
		}
		if(this.usable == true){
			this.animations.play('MoveOn');
			if(cursors.up.justPressed()){
				endsel = true;
				movesel = false;
				console.log("up from move");
				this.animations.play('MoveOff');
				this.i = 0;
				this.usable = false;
			}else if(cursors.down.justPressed()){
				barksel = true;
				movesel = false;
				console.log(" down from move");
				this.animations.play('MoveOff');
				this.i = 0;
				this.usable = false;
			}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
				if(BFF.displayed == true){
					BFF.moveable = true;
				}else if(player.displayed == true){
					player.moveable = true;
				}else if
			}
		}
		this.i += 0.1;
	}
}