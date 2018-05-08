var game = new Phaser.Game(600, 600, Phaser.AUTO);

var isoGroup;

var testState = function(game) {};
testState.prototype = {
preload: function() {
    // preload assets
    //set file path
    game.load.path = 'assets/img/';
    //load image data (key, url)
    game.load.image('dirt', 'dirt.png');
    game.load.image('fox', 's_Fox01_SW.png');
    
    game.time.advancedTiming = true;
    //enable Isometrics
    game.plugins.add(new Phaser.Plugin.Isometric(game));
    
    //Isometric physics
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.5, 0.2);
},
    
create: function() {
    // place your assets
    //Group for the tiles
    isoGroup = game.add.group();
    
    this.stage.backgroundColor = "#facade";
    this.spawnTiles();
    player = this.spawnPlayer();
    
    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();
},
    
update: function() {
    // run game loop
    //Update courtesy of: http://rotates.org/phaser/iso/examples/interaction.htm
    // Update the cursor position.
    // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    game.iso.unproject(game.input.activePointer.position, cursorPos);
    
    // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
    isoGroup.forEach(function (tile) {
                     var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
                     // If it does, do a little animation and tint change.
                     if (!tile.selected && inBounds) {
                     tile.selected = true;
                     tile.tint = 0x86bfda;
                     game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
                     }
                     // If not, revert back to how it was.
                     else if (tile.selected && !inBounds) {
                     tile.selected = false;
                     tile.tint = 0xffffff;
                     game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
                     }
                     });
},
    
    //spawnTiles function courtesy of: http://rotates.org/phaser/iso/examples/interaction.htm
spawnTiles: function () {
    var tile;
    for (var xx = 0; xx < 256; xx += 64) {
        for (var yy = 0; yy < 256; yy += 64) {
            // Create a tile using the new game.add.isoSprite factory method at the specified position.
            // The last parameter is the group you want to add it to (just like game.add.sprite)
            tile = game.add.isoSprite(xx, yy, 0, 'dirt', 0, isoGroup);
            tile.anchor.set(0, 0);
        }
    }
},
spawnPlayer: function () {
    var player = game.add.isoSprite(0,0,0, 'fox',0,isoGroup);
    player.anchor.set(0.5,0.5);
    player.enableBody = true;
}
}
game.state.add('test', testState);
game.state.start('test');
