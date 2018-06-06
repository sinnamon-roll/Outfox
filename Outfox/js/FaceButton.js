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
	this.faceb;
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
					pressed = true;
					if(player.displayed == true){
						this.faceb = 'player';
					}else if(BFF.displayed == true){
						this.faceb = 'BFF';
					}
				}
			}
			this.i += 0.1;
		}
	}else if(this.faceb == 'player'){
		changeFace(player);
		this.faceb = 'lolwut';
	}else if(this.faceb == 'BFF'){
		changeFace(BFF);
		this.faceb = 'lolwut';
	}

	function changeFace(character){
		if(cursors.up.justPressed()){
			character.animations.play('up');
			pressed = false;
		}else if(cursors.down.justPressed()){
			character.animations.play('down');
			pressed = false;
		}else if(cursors.left.justPressed()){
			character.animations.play('left');
			pressed = false;
		}else if(cursors.right.justPressed()){
			character.animations.play('right');	
			pressed = false;
		}
	}
}
