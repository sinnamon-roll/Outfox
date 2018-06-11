//variables governing "face"
var faceloX = 0;//settings.facelocX;
var faceloY = 192; //settings.facelocY;
var facesel = false;
var facekey = 's_Face_inact';
//variable governing the atlas
var atlas = 'UI';

function faceButton(game, type) {

	this.i = 0;
	Phaser.Sprite.call(this, game, faceloX, faceloY, atlas, facekey);
	this.animations.add('FaceOn', ['s_Face_act'], 60, true, false);
	this.animations.add('FaceOff', ['s_Face_inact'], 60, true, false);
	this.animations.add('Used', ['s_Face_used'], 60, true, false)
	facesel = false;
	this.usable = false;
	this.faceb = 'lolwut';
	cursors = game.input.keyboard.createCursorKeys();


}
faceButton.prototype = Object.create(Phaser.Sprite.prototype);
faceButton.prototype.constructor = faceButton;
faceButton.prototype.update = function() {
	if(pressed == false){
		if(facesel == true){
			if(Math.floor(this.i) == 1){
				this.usable = true;
			}
			if(this.usable == true){
				this.animations.play('FaceOn');
				if(cursors.up.justPressed()){
					if(barkbutt.unusable == false){
						barksel = true;
						facesel = false;
					}else if(barkbutt.unusable == true && movebutt.unusable == false){
						movesel = true;
						facesel = false;
					}else{
						endsel = true;
						facesel = false;
					}
					console.log("up from face");
					this.animations.play('FaceOff');
					this.i = 0;
					this.usable = false;
				}else if(cursors.down.justPressed()){
					endsel = true;
					facesel = false;
					console.log("down from face");
					this.animations.play('FaceOff');
					this.i = 0;
					this.usable = false;
				}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
					add2Log('Face Action: [UP], [DOWN], [LEFT], or [RIGHT] to choose a direction to face. [SPACE] to set. May be used multiple times.', 3);
					if(player.displayed == true){
						console.log("facing a way kinda")
						this.faceb = 'player';
						pressed = true;
					}else if(BFF.displayed == true){
						this.faceb = 'BFF';
						pressed = true;

					}
				}
			}
			this.i += 0.1;
		}
	}else if(this.faceb == 'player'){
		if(this.faceb != 'lolwut'){
			console.log("not lolwut?");
			if(cursors.up.justPressed()){
				player.animations.play('up');
				pressed = false;
				this.faceb = 'lolwut';
			}else if(cursors.down.justPressed()){
				player.animations.play('down');
				pressed = false;
				this.faceb = 'lolwut';
			}else if(cursors.left.justPressed()){
				player.animations.play('left');
				pressed = false;
				this.faceb = 'lolwut';
			}else if(cursors.right.justPressed()){
				player.animations.play('right');	
				pressed = false;
				this.faceb = 'lolwut';
			}
		}
	}else if(this.faceb == 'BFF'){
		if(this.faceb != 'lolwut'){
			console.log("not lolwut?");
			if(cursors.up.justPressed()){
				BFF.animations.play('up');
				pressed = false;
				this.faceb = 'lolwut';
			}else if(cursors.down.justPressed()){
				BFF.animations.play('down');
				pressed = false;
				this.faceb = 'lolwut';
			}else if(cursors.left.justPressed()){
				BFF.animations.play('left');
				pressed = false;
				this.faceb = 'lolwut';
			}else if(cursors.right.justPressed()){
				BFF.animations.play('right');	
				pressed = false;
				this.faceb = 'lolwut';
			}
		}
	}
}
