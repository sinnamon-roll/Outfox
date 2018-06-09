var charText = [  'Charisma 01',
                + 'Charisma 02',
                + 'Charisma 03',
                + 'Charisma 04',
                + 'Charisma 05',
                + 'Charisma 06',
                + 'Charisma 07',
                + 'Charisma 08',
                + 'Charisma 09',
                + 'Charisma 10']
var sarText = [   'Sarcasm 01',
               + 'Sarcasm 02',
               + 'Sarcasm 03',
               + 'Sarcasm 04',
               + 'Sarcasm 05',
               + 'Sarcasm 06',
               + 'Sarcasm 07',
               + 'Sarcasm 08',
               + 'Sarcasm 09',
               + 'Sarcasm 10']

isAdjacent = function(characterGroup, subject){
    characterGroup.forEach(function(character) {
        if(subject.x == (character.x + size) || subject.x == (character.x - size) ){
            if (subject.y == character.y) {
                //console.log("ADJACENT R/L");
                character.adj = true;
            }else{
                character.adj = false;
            }
        }else if (subject.y == (character.y + size) || subject.y == (character.y - size) ){
             if (subject.x == character.x) {
                //console.log("ADJACENT UP/DOWN");
                character.adj = true;
             }else{
                character.adj = false;
             }
        }else{
            character.adj = false;
        }
                           //});
        if (character.adj == true) {
            //DISPLAY INFORMATION
            if(subject.controlled == true){
            //Keyboard input only available when adjacent
            if (subject.charb == true && subject.EXH > 0) {
                //Exhaust Player
                subject.EXH -= 1;
                subject.charb = false;
                //Display GameLog
                add2Log(Phaser.ArrayUtils.getRandomItem(charText));
                
                //play audio
                var char = game.add.audio('charSound');
                char.play('',0,1,false)
                
                //Show popup
                var popup = game.add.sprite(subject.x + 19, subject.y - 38, 'atlas', 's_charisma');
                //popup.animations.add('beat', [4, 5], 10,true);
                //popup.play('beat');
                game.time.events.add(Phaser.Timer.SECOND * 2, killPop, this);
                game.time.events.add(Phaser.Timer.SECOND * 3, cBark, this);
                
                //emit sprites
                // collision causes particle explosion
                // add.emitter(x, y, maxParticles)
                var charEmitter = game.add.emitter(character.x + 32, character.y + 32, 20);
                charEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
                charEmitter.minParticleScale = .5;        // set min/max particle size
                charEmitter.maxParticleScale = 1.5;
                charEmitter.setXSpeed(-50,50);            // set min/max horizontal speed
                charEmitter.setYSpeed(-50,50);            // set min/max vertical speed
                
                //useAction()
                game.time.events.add(Phaser.Timer.SECOND * 4, useAction, this);
            }
            if (subject.sarcb == true && subject.EXH > 0) {
                //Exhaust Player
                subject.EXH -= 1;
                subject.sarcb = false;
                //Display GameLog
                add2Log(Phaser.ArrayUtils.getRandomItem(sarText));
                
                //play audio
                var sar = game.add.audio('sarSound');
                sar.play('',0,1,false)
                
                var popup = game.add.sprite(subject.x + 19, subject.y - 38, 'atlas', 's_sarcasm');
                //popup.animations.add('smirk', [12, 13], 10,true);
                //popup.play('smirk');
                game.time.events.add(Phaser.Timer.SECOND * 2, killPop, this);
                game.time.events.add(Phaser.Timer.SECOND * 3, sBark, this);
                
                //emit sprites
                // collision causes particle explosion
                // add.emitter(x, y, maxParticles)
                var sarEmitter = game.add.emitter(character.x + 32, character.y + 32, 20);
                sarEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
                sarEmitter.minParticleScale = .5;        // set min/max particle size
                sarEmitter.maxParticleScale = 1.5;
                sarEmitter.setXSpeed(-50,50);            // set min/max horizontal speed
                sarEmitter.setYSpeed(-50,50);            // set min/max vertical speed
                //useAction()
                game.time.events.add(Phaser.Timer.SECOND * 4, useAction, this);
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
        console.log("sBark", character);
                if (character.TYPE == 'Sarcastic') {
                    character.CTMP += (subject.SAR * 2);
                    add2Log('The bark is Super Effective');
                    sarEmitter.makeParticles('atlas','+_green');        // image used for particles
                } else if (character.TYPE == 'Charismatic') {
                    character.CTMP += Math.floor(subject.SAR / 2);
                    add2Log('Your cries fall on deaf ears.');
                    sarEmitter.makeParticles('atlas','-_red');        // image used for particles
                } else {
                    character.CTMP += subject.SAR;
                    add2Log('The fox regards you calmly.');
                    sarEmitter.makeParticles('atlas','x_red');
                }
            sarEmitter.start(true, 4000, null, 20);    // (explode, lifespan, freq, quantity)
    }
    function cBark() {
        //Determine if weak/resistant
        if (character.TYPE == 'Sarcastic') {
            character.RPCT += Math.floor(subject.CHAR / 2);
            add2Log('Your cries fall on deaf ears.');
            charEmitter.makeParticles('atlas','-_red');        // image used for particles
        } else if (character.TYPE == 'Charismatic') {
            character.RPCT += (subject.CHAR * 2);
            add2Log('Super Effective!');
            charEmitter.makeParticles('atlas','+_green');
        } else {
            character.RPCT += subject.CHAR;
            add2Log('The fox regards you calmly.');
            charEmitter.makeParticles('atlas','x_red');
        }
        charEmitter.start(true, 4000, null, 20);    // (explode, lifespan, freq, quantity)
    }
    function useAction() {
        console.log("using Player's action");
        subject.acted = true;
        facesel = true;
        barksel = false;
        pressed = false;
    }
    }
                           });
}
