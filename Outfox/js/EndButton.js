//variables governing "end"
var endloX = 0; //settings.endlocX;
var endloY = 256; //settings.endlocY;
var endsel;
var endkey = 's_End_inact';
//variable governing the atlas
var atlas = 'UI';

function endButton(game, type) {
	
	this.i = 0;
	Phaser.Sprite.call(this, game, endloX, endloY, atlas, endkey);
	this.animations.add('EndOn', ['s_End_act'], 60, true, false);
	this.animations.add('EndOff', ['s_End_inact'], 60, true, false);
	this.usable = false;
	endsel = false;
	cursors = game.input.keyboard.createCursorKeys();
}

endButton.prototype = Object.create(Phaser.Sprite.prototype);
endButton.prototype.constructor = endButton;
endButton.prototype.update = function() {
	if(endsel == true){
		if(Math.floor(this.i) == 1){
			this.usable = true;
		}
		if(this.usable == true){
			this.animations.play('EndOn');
			if(cursors.up.justPressed()){
				facesel = true;
				endsel = false;
				console.log("up from end");
				this.animations.play('EndOff');
				this.i = 0;
				this.usable = false;
			}else if(cursors.down.justPressed()){
				movesel = true;
				endsel = false;
				console.log("down from end");
				this.animations.play('EndOff');
				this.i = 0;
				this.usable = false;
			}
		}
		this.i += 0.1;
	}
}