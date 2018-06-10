//variables governing "bark"
var barkloX = 0; //settings.barklocX;
var barkloY = 128; //settings.barklocY;
var barksel;
var barkkey = 's_Bark_inact';
//variables governing barksub
var barksubkey = 's_subM01_act';
var barksubloX = 64;
var barksubloY = 128;
var barksubsel;

var subbuttloX = 66;
var subbuttloY = 156;
var subbuttkey = 's_subPaw01_inact';
//variable governing the atlas
var atlas = 'UI';

// submenu text variables
var chaOption;
var sarOption;
var egoOption;

function barkButton(game, type) {
	this.i = 0;
	Phaser.Sprite.call(this, game, barkloX, barkloY, atlas, barkkey);
	this.animations.add('BarkOn', ['s_Bark_act'], 60, true, false);
	this.animations.add('BarkOff', ['s_Bark_inact'], 60, true, false);
	this.animations.add('Used', ['s_Bark_used'], 60, true, false)
	barksel = false;
	this.usable = false;
	this.unusable = false;
	cursors = game.input.keyboard.createCursorKeys();


}
barkButton.prototype = Object.create(Phaser.Sprite.prototype);
barkButton.prototype.constructor = barkButton;
barkButton.prototype.update = function() {
	if(pressed == false){
		if(barksel == true){	
			if(Math.floor(this.i) == 1 /*&& this.unusable == false*/){
				this.usable = true;
			}
			if(this.usable == true){
				this.animations.play('BarkOn');
				if(cursors.up.justPressed()){
					if(movebutt.unusable == true){
							endsel = true;
							barksel = false;
					}else{
							movesel = true;
							barksel = false;
					}
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
					add2Log('Bark Action: [UP] or [DOWN] to hover over a bark type. [SPACE] to perform.');
					if(BFF.displayed == true && BFF.adj == true){
						subMenu(game, BFF);
						this.unusable = true;
						this.animations.play('Used');
						BFF.controlled = true;
						pressed = true;
					}else if(player.displayed == true && (enemy.adj == true || enemy2.adj == true)){
						
						subMenu(game, player);
						this.unusable = true;
						this.animations.play('Used');
						Player.controlled = true;
						pressed = true;
					}
				}
			}
			this.i += 0.1;
		}else if(this.usable == true){
			this.animations.play("EndOff");
		}
		if(this.unusable == true){
			this.animations.play('Used');
		}	
	}
}



//Bark button submenu constructor

function barksubMenu(game, character) {
	Phaser.Sprite.call(this, game, barksubloX, barksubloY, atlas, barksubkey);
	this.downsel = false;
	this.midsel = false;
	this.upsel = true;
	this.act = character;
	cursors = game.input.keyboard.createCursorKeys();
}
barksubMenu.prototype = Object.create(Phaser.Sprite.prototype);
barksubMenu.prototype.constructor = barksubMenu;
barksubMenu.prototype.update = function() {
	if(pressed == true && barksel == true){
		if(this.upsel == true){
			charbutt.animations.play('CharOn');
			if(cursors.up.justPressed()){
				this.downsel = true;
				this.upsel = false;
				enerbutt.animations.play('EnerOn');
				charbutt.animations.play('CharOff');
			}else if(cursors.down.justPressed()){
				this.midsel = true;
				this.upsel = false
				sarcbutt.animations.play('SarcOn');
				charbutt.animations.play('CharOff');
			}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
				this.act.charb = true;
				this.pendingDestroy = true;
				barksel = false;
				sarcbutt.pendingDestroy = true;
				charbutt.pendingDestroy = true;
				enerbutt.pendingDestroy = true;
				chaOption.pendingDestroy = true;
				sarOption.pendingDestroy = true;
				egoOption.pendingDestroy = true;

			}
		}else if(this.downsel == true){
			enerbutt.animations.play('EnerOn');
			if(cursors.up.justPressed()){
				this.midsel = true;
				this.downsel = false;
				sarcbutt.animations.play('SarcOn');
				enerbutt.animations.play('EnerOff');
			}else if(cursors.down.justPressed()){
				this.upsel = true;
				this.downsel = false;
				charbutt.animations.play('CharOn');
				enerbutt.animations.play('EnerOff');
			}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
				this.act.enerb = true;
				this.pendingDestroy = true;
				barksel = false;
				sarcbutt.pendingDestroy = true;
				charbutt.pendingDestroy = true;
				enerbutt.pendingDestroy = true;
				chaOption.pendingDestroy = true;
				sarOption.pendingDestroy = true;
				egoOption.pendingDestroy = true;
			}
		}else if(this.midsel == true){
			sarcbutt.animations.play('SarcOn');
			if(cursors.up.justPressed()){
				this.upsel = true;
				this.midsel = false;
				charbutt.animations.play('CharOn');
				sarcbutt.animations.play('SarcOff');
			}else if(cursors.down.justPressed()){
				this.downsel = true;
				this.midsel = false;
				sarcbutt.animations.play('EnerOn');
				sarcbutt.animations.play('SarcOff');
			}else if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
				this.act.sarcb = true;
				this.pendingDestroy = true;
				sarcbutt.pendingDestroy = true;
				charbutt.pendingDestroy = true;
				enerbutt.pendingDestroy = true;
				chaOption.pendingDestroy = true;
				sarOption.pendingDestroy = true;
				egoOption.pendingDestroy = true;
			}
		}
	}
}


function charsubButton(game) {
	Phaser.Sprite.call(this, game, subbuttloX, subbuttloY, atlas, subbuttkey);
	this.animations.add('CharOn', ['s_subPaw01_act'], 60, true, false);
	this.animations.add('CharOff', ['s_subPaw01_inact'], 60, true, false);
}	
charsubButton.prototype = Object.create(Phaser.Sprite.prototype);
charsubButton.prototype.constructor = charsubButton;
charsubButton.prototype.update = function() {
}


function sarcsubButton(game) {
	Phaser.Sprite.call(this, game, subbuttloX, subbuttloY + 23, atlas, subbuttkey);
	this.animations.add('SarcOn', ['s_subPaw01_act'], 60, true, false);
	this.animations.add('SarcOff', ['s_subPaw01_inact'], 60, true, false);
}
sarcsubButton.prototype = Object.create(Phaser.Sprite.prototype);
sarcsubButton.prototype.constructor = sarcsubButton;
sarcsubButton.prototype.update = function() {
}

function enersubButton(game){
	Phaser.Sprite.call(this, game, subbuttloX, subbuttloY + 46, atlas, subbuttkey);
	this.animations.add('EnerOn', ['s_subPaw01_act'], 60, true, false);
	this.animations.add('EnerOff', ['s_subPaw01_inact'], 60, true, false);
}
enersubButton.prototype = Object.create(Phaser.Sprite.prototype);
enersubButton.prototype.constructor = enersubButton;
enersubButton.prototype.update = function(){

}

//sub menu creator
function subMenu(game, character){
	barksub = new barksubMenu(game, character);
    this.game.add.existing(barksub);

    charbutt = new charsubButton(game);
    this.game.add.existing(charbutt);
    this.chaOption = game.add.text(98, 157, 'Charismatic', { font: 'Fira Sans', fontSize: '16px', fill: '#260100', fontWeight: 'bold' });

    sarcbutt = new sarcsubButton(game);
    this.game.add.existing(sarcbutt);
	this.sarOption = game.add.text(98, 181, 'Sarcastic', { font: 'Fira Sans', fontSize: '16px', fill: '#260100', fontWeight: 'bold'  });

    enerbutt = new enersubButton(game);
    this.game.add.existing(enerbutt);
    this.egoOption = game.add.text(98, 203, 'Egotistic', { font: 'Fira Sans', fontSize: '16px', fill: '#260100', fontWeight: 'bold'  });
}