var credits = function(game){};
credits.prototype = {

preload: function() {
    console.log('credits: preload');
    game.load.path = 'assets/img/';
    this.load.image('CreditsBG', 's_Outfox_credits.png');
},
create: function() {
    console.log('credits: create');
    game.stage.backgroundColor = "#000000";
    var CreditsBG = game.add.sprite(0,0, 'CreditsBG');

    CreditsBG.anchor.setTo(0, 0);
    CreditsBG.alpha = 0;

    game.add.tween(CreditsBG).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
    //this.logoUp = game.add.audio('logoSound');
    //game.time.events.add(1500, logoSound, this);
    //game.time.events.add(3000, fadeOut, this);

    function logoSound() {
        this.logoUp.play('', 0, 0.1, false);
    }
            
    function fadeOut() {
        game.add.tween(CreditsBG).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
    }
    
    var headerStyle = {
                font: 'Fira Sans',
                fontSize: '24px',
                fill: '#270201',
                fontWeight: 'bold',
                wordWrapWidth: '500',
                wordWrap: 'true'
    };

    header = game.add.text(25, 165, 'Design & Programming', headerStyle);
    header = game.add.text(115, 320, 'Art', headerStyle);
    header = game.add.text(350, 15, 'A Special Thank You', headerStyle);
    header = game.add.text(380, 165, 'Music & SFX', headerStyle);
    header = game.add.text(420, 320, 'Fonts', headerStyle);
    
    var creditStyle =  {
    font: 'Fira Sans',
    fontSize: '20px',
    fill: '#270201',
    wordWrapWidth: '500',
    wordWrap: 'true'
    };
    creditText = game.add.text(300,50, 'Thank you text here', creditStyle);

    creditText = game.add.text(58,200, 'Nichole Boothroyd', creditStyle);
    creditText = game.add.text(73,235, 'Courtney Hunt', creditStyle);
    creditText = game.add.text(63,270, 'Gavin Thompson', creditStyle);
    
    creditText = game.add.text(73,355, 'Courtney Hunt', creditStyle);

    creditText = game.add.text(290,235, 'Authentic Fox sounds - Courtney Hunt', creditStyle);
    creditText = game.add.text(297,200, 'Creative Commons 0 - freesound.org', creditStyle);

    creditText = game.add.text(350,355, 'Lobster - Google Fonts', creditStyle);

    creditText = game.add.text(115, 410, 'Press Enter to return to the Main Menu', headerStyle);
    
},
update: function() {
    console.log('credits: update');
    // update
    
    if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ){
        this.state.start('MainMenu');
    }
}


}
