isAdjacent = function(character, subject){
    //ADJ!!!
        if(subject.x == (character.x + size) || subject.x == (character.x - size) ){
            if (subject.y == character.y) {
                //console.log("ADJACENT R/L");
                character.adj = true;
            }else
                character.adj = false;
        }else if (subject.y == (character.y + size) || subject.y == (character.y - size) ){
             if (subject.x == character.x) {
                //console.log("ADJACENT UP/DOWN");
                character.adj = true;
             }else {
                character.adj = false;
             }
        }else {
            character.adj = false;
        }
        if (character.adj == true) {
            //DISPLAY INFORMATION
            if(character.controlled == true){
            //Keyboard input only available when adjacent
            if (cKey.justPressed() && character.EXH > 0) {
                //Exhaust Player
                character.EXH -= 1;
                
                //Display GameLog
                gameLog.setText('"What\'s a fox like you doing in a place like this"');
                
                //play audio
                var char = game.add.audio('charSound');
                char.play('',0,1,false)
                
                //Show popup
                var popup = game.add.sprite(character.x, character.y, 'atlas', 's_charisma');
                popup.anchor.setTo(.5,.5);
                //popup.animations.add('beat', [4, 5], 10,true);
                //popup.play('beat');
                game.time.events.add(Phaser.Timer.SECOND * 3, killPop, this);
                game.time.events.add(Phaser.Timer.SECOND * 3, cBark, this);
                
                //emit sprites
                // collision causes particle explosion
                // add.emitter(x, y, maxParticles)
                var charEmitter = game.add.emitter(subject.x + 32, subject.y + 32, 20);
                charEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
                charEmitter.minParticleScale = .5;        // set min/max particle size
                charEmitter.maxParticleScale = 1.5;
                charEmitter.setXSpeed(-50,50);            // set min/max horizontal speed
                charEmitter.setYSpeed(-50,50);            // set min/max vertical speed
                
            }
            if (sKey.justPressed() && character.EXH > 0) {
                //Exhaust Player
                character.EXH -= 1;
                
                //Display GameLog
                gameLog.setText('"Don\'t you just love eating dog food every day?"');
                
                //play audio
                var sar = game.add.audio('sarSound');
                sar.play('',0,1,false)
                
                var popup = game.add.sprite(character.x, character.y, 'atlas', 's_sarcasm');
                popup.anchor.setTo(.5,.5);
                //popup.animations.add('smirk', [12, 13], 10,true);
                //popup.play('smirk');
                game.time.events.add(Phaser.Timer.SECOND * 3, killPop, this);
                game.time.events.add(Phaser.Timer.SECOND * 3, sBark, this);
                
                //emit sprites
                // collision causes particle explosion
                // add.emitter(x, y, maxParticles)
                var sarEmitter = game.add.emitter(subject.x + 32, subject.y + 32, 20);
                sarEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
                sarEmitter.minParticleScale = .5;        // set min/max particle size
                sarEmitter.maxParticleScale = 1.5;
                sarEmitter.setXSpeed(-50,50);            // set min/max horizontal speed
                sarEmitter.setYSpeed(-50,50);            // set min/max vertical speed
            }
        }else {
            //character.range.visible = false;
                enemyTarget.loadTexture('UI', 's_noTarget');
        }
    
    function killPop() {
        console.log("killPop");
        game.add.tween(popup).to( { alpha: 0 }, 420, Phaser.Easing.Linear.None, true);
    }
    function sBark() {
                //Ro-Sham-Bo
                if (subject.TYPE == 'Sarcastic') {
                    subject.CTMP += (character.SAR * 2);
                    gameLog.setText('The bark is Super Effective');
                    sarEmitter.makeParticles('atlas','+_green');        // image used for particles
                } else if (subject.TYPE == 'Charismatic') {
                    subject.CTMP += Math.floor(character.SAR / 2);
                    gameLog.setText('Your cries fall on deaf ears.');
                    sarEmitter.makeParticles('atlas','-_red');        // image used for particles
                } else {
                    subject.CTMP += character.SAR;
                    gameLog.setText('The fox regards you calmly.');
                    sarEmitter.makeParticles('atlas','x_red');
                }
                sarEmitter.start(true, 2000, null, 20);    // (explode, lifespan, freq, quantity)
    }
    function cBark() {
        //Determine if weak/resistant
        if (subject.TYPE == 'Sarcastic') {
            subject.RPCT += Math.floor(character.CHAR / 2);
            gameLog.setText('Your cries fall on deaf ears.');
            charEmitter.makeParticles('atlas','-_red');        // image used for particles
        } else if (subject.TYPE == 'Charismatic') {
            subject.RPCT += (character.CHAR * 2);
            gameLog.setText('Super Effective!');
            charEmitter.makeParticles('atlas','+_green');
        } else {
            subject.RPCT += character.CHAR;
            gameLog.setText('The fox regards you calmly.');
            charEmitter.makeParticles('atlas','x_red');
        }
        charEmitter.start(true, 2000, null, 20);    // (explode, lifespan, freq, quantity)
    }
    }
}
