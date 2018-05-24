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
            //character.range.x = character.x - size;
            //character.range.y = character.y - size;
            //character.range.visible = true;
            if(character.controlled == true){
            //Keyboard input only available when adjacent
                if (cKey.justPressed() && character.EXH > 0) {
                    //Exhaust Player
                    character.EXH -= 1;
                    //play audio
                    var char = game.add.audio('charSound');
                    char.play('',0,1,false)
                    //emit sprites
                    // collision causes particle explosion
                    // add.emitter(x, y, maxParticles)
                    var charEmitter = game.add.emitter(subject.x + 32, subject.y + 32, 20);
                    charEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
                    charEmitter.minParticleScale = .5;        // set min/max particle size
                    charEmitter.maxParticleScale = 1.5;
                    charEmitter.setXSpeed(-50,50);            // set min/max horizontal speed
                    charEmitter.setYSpeed(-50,50);            // set min/max vertical speed

                    
                    //Determine if weak/resistant
                    if (subject.TYPE == 'Sarcastic') {
                        subject.RPCT += (character.CHAR / 2);
                        gameLog.setText('Your cries fall on deaf ears.');
                        charEmitter.makeParticles('atlas','-_red');        // image used for particles
                    } else if (subject.TYPE == 'Charismatic') {
                        subject.RPCT += (character.CHAR * 2);
                        gameLog.setText('Super Effective!');
                        charEmitter.makeParticles('atlas','+_green01');
                    } else {
                        subject.RPCT += character.CHAR;
                        gameLog.setText('The fox regards you calmly.');
                        charEmitter.makeParticles('atlas','+_green01');
                    }

                    charEmitter.start(true, 2000, null, 20);    // (explode, lifespan, freq, quantity)
                }
                if (sKey.justPressed() && character.EXH > 0) {
                    //Exhaust Player
                    character.EXH -= 1;
                    //play audio
                    var sar = game.add.audio('sarSound');
                    sar.play('',0,1,false)
                    
                    //emit sprites
                    // collision causes particle explosion
                    // add.emitter(x, y, maxParticles)
                    var sarEmitter = game.add.emitter(subject.x + 32, subject.y + 32, 20);
                    sarEmitter.setAlpha(0.5, 1);                // set particle alpha (min, max)
                    sarEmitter.minParticleScale = .5;        // set min/max particle size
                    sarEmitter.maxParticleScale = 1.5;
                    sarEmitter.setXSpeed(-50,50);            // set min/max horizontal speed
                    sarEmitter.setYSpeed(-50,50);            // set min/max vertical speed

                    //Ro-Sham-Bo
                    if (subject.TYPE == 'Sarcastic') {
                        subject.CTMP += (character.SAR * 2);
                        gameLog.setText('The bark is Super Effective');
                        sarEmitter.makeParticles('atlas','+_green01');        // image used for particles
                    } else if (subject.TYPE == 'Charismatic') {
                        subject.CTMP += (character.SAR / 2);
                        gameLog.setText('Your cries fall on deaf ears.');
                        sarEmitter.makeParticles('atlas','-_red');        // image used for particles
                    } else {
                        subject.CTMP += character.SAR;
                        gameLog.setText('The fox regards you calmly.');
                        sarEmitter.makeParticles('atlas','-_red');
                    }
                    
                    sarEmitter.start(true, 2000, null, 20);    // (explode, lifespan, freq, quantity)
                }
            } 
        }else {
            //character.range.visible = false;

        }
        if(character.EXH == 0) {
            character.tired.x = character.x + size/2;
            character.tired.y = character.y - size/2;
            character.tired.visible = true;
        }else {
            character.tired.visible = false;
        }
    }
