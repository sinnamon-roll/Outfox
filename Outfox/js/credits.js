var credits = function(game){};
credits.prototype = {

preload: function() {
    console.log('credits: preload');
},
create: function() {
    console.log('credits: create');
    
    var headerSyle = {
                font: 'Fira Sans',
                fontSize: '45px',
                wordWrapWidth: '500',
                wordWrap: 'true'
    };

    header = game.add.text(10, 45, 'Design:', headerSyle);
    header = game.add.text(180, 175, 'Art:', headerSyle);
    header = game.add.text(275, 300, 'Programming:', headerSyle);
    
    var creditSyle =  {
    font: 'Fira Sans',
    fontSize: '30px',
    wordWrapWidth: '500',
    wordWrap: 'true'
    };
    creditText = game.add.text(125,100, 'Boothroyd      Hunt        Thompson', creditSyle);
    
    creditText = game.add.text(250,225, 'Courtney Hunt', creditSyle);
    
    creditText = game.add.text(150,350, 'Gavin Thompson', creditSyle);
    creditText = game.add.text(400,350, 'Nichole Boothroyd', creditSyle);
    
    creditText = game.add.text(10,450, 'Real Fox sounds provided by: \[enter source\]', {fontSize: '17px', font: 'Fira Sans'});
    creditText = game.add.text(373,450, 'Press Enter to return to the Main Menu', {fontSize: '17px', font: 'Fira Sans'});
    
},
update: function() {
    console.log('credits: update');
    // update
    
    if(game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) ){
        this.state.start('MainMenu');
    }
}


}
