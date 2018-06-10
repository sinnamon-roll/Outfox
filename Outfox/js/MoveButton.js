//variables governing "move"
var moveloX = 0;//settings.movelocX;
var moveloY = 64;//settings.movelocY;
var movesel;
var movekey = 's_Move_inact';
//variable governing the atlas
var atlas = 'UI';
var pressed = false;

function moveButton(game, type) {
	this.i = 0;
	this.usable = true;
	this.unusable = false;
		Phaser.Sprite.call(this, game, moveloX, moveloY, atlas, movekey);
	this.animations.add('MoveOn', ['s_Move_act'], 60, true, false);
	this.animations.add('MoveOff', ['s_Move_inact'], 60, true, false);
	this.animations.add('Used', ['s_Move_used'], 60, true, false)
	movesel = true;
	cursors = game.input.keyboard.createCursorKeys();


}
moveButton.prototype = Object.create(Phaser.Sprite.prototype);
moveButton.prototype.constructor = moveButton;
moveButton.prototype.update = function() {
		if(pressed == false){
			if(movesel == true){
				if(Math.floor(this.i) == 1 && this.unusable == false){
					this.usable = true;
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
						if(barkbutt.unusable == true){
							facesel = true;
							movesel = false;
						}else{
							barksel = true;
							movesel = false;
						}
						console.log(" down from move");
						this.animations.play('MoveOff');
						this.i = 0;
						this.usable = false;
					}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
						add2Log('Move Action: [UP], [DOWN], [LEFT], or [RIGHT] to move 1 space. Immediately takes effect.');
						if(BFF.displayed == true){
							BFF.moveable = true;
							this.unusable = true;
							pressed = true;
							this.animations.play('Used');
							// pressed = true;
							barksel = true;
							movesel = false;
						}else if(player.displayed == true){
							player.moveable = true;
							this.unusable = true;
							pressed = true;
							this.animations.play('Used');
							// pressed = true;
							barksel = true;
							movesel = false;
						}
					}
				}
				this.i += 0.1;
				
		  	}
		  	if(this.unusable == true){
					this.animations.play('Used');
			}
  		}
}