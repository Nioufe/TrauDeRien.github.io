/**
 * Created by Adrien on 04/02/2015.
 */
var stateBoot = {
  preload: function () {
// Load the image
    game.load.image('progressBar', 'assets/load/progressBar.png');
    game.load.image('progressBarEmpty', 'assets/load/progressBarEmpty.png');

  },
  create: function() {
// Set some game settings
    game.scale.maxWidth = 640;
    game.scale.maxHeight = 1120;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setScreenSize();
    game.scale.refresh();

// Start the load state
    game.state.start('load');
  }
};