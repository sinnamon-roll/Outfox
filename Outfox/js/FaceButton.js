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
	facesel = false;
	this.usable = false;
	cursors = game.input.keyboard.createCursorKeys();


}
faceButton.prototype = Object.create(Phaser.Sprite.prototype);
faceButton.prototype.constructor = faceButton;
faceButton.prototype.update = function() {
	if(facesel == true){
		if(Math.floor(this.i) == 1){
			this.usable = true;
		}
		if(this.usable == true){
			this.animations.play('FaceOn');
			if(cursors.up.justPressed()){
				barksel = true;
				facesel = false;
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
			}
		}
		this.i += 0.1;
	}
}