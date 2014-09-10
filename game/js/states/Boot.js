/**
 * Created by Adrien on 09/09/2014.
 */
var bootState = {
  preload: function () {
// Load the image
    game.load.image('progressBar', 'assets/progressBar.png');
  },
  create: function() {
// Set some game settings
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.stage.backgroundColor = '#2a3fbf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.TILE_BIAS = 40;
    game.scale.setScreenSize(true);
// Start the load state
    game.state.start('load');
  }
};