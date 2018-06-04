//variables governing "bark"
var barkloX = 0; //settings.barklocX;
var barkloY = 128; //settings.barklocY;
var barksel;
var barkkey = 's_Bark_inact';
//variable governing the atlas
var atlas = 'UI';

function barkButton(game, type) {
	
	this.i = 0;
	Phaser.Sprite.call(this, game, barkloX, barkloY, atlas, barkkey);
	this.animations.add('BarkOn', ['s_Bark_act'], 60, true, false);
	this.animations.add('BarkOff', ['s_Bark_inact'], 60, true, false);
	barkself = false;
	this.usable = false;
	cursors = game.input.keyboard.createCursorKeys();


}
barkButton.prototype = Object.create(Phaser.Sprite.prototype);
barkButton.prototype.constructor = barkButton;
barkButton.prototype.update = function() {
	if(barksel == true){	
		if(Math.floor(this.i) == 1){
			this.usable = true;
		}
		if(this.usable == true){
			this.animations.play('BarkOn');
			if(cursors.up.justPressed()){
				movesel = true;
				barksel = false;
				console.log("up from bark");
				this.animations.play('BarkOff');
				this.i = 0;		
				this.usable = false;
			}else if(cursors.down.justPressed()){
				facesel = true;
				barksel = false;
				console.log("down from bark");
				this.animations.play('BarkOff');
				this.i = 0;
				this.usable = false;
			}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
				if(BFF.displayed == true){
					BFF.controlled = true;
				}else{
					player.controlled = true;
				}
			}
		}
		this.i += 0.1;
	}
}