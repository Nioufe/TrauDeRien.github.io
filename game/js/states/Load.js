/**
 * Created by Adrien on 09/09/2014.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
var loadState = {
  preload: function () {
// Add a 'loading...' label on the screen
    var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...',
      { font: '30px Arial', fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
// Display the progress bar
    var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    /**
     * TEST LEVEL
     */
    game.load.image('world_tiles2', 'assets/test/world_tiles2.png');
    game.load.tilemap('map', 'assets/test/tile_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('exemple', 'assets/test/Visuel2.png');
    game.load.spritesheet('player', 'assets/hero/hero_sprite.png', 100, 160);

  },
  create: function () {
    console.log('load');
// Go to the menu state
    game.state.start('menu');
  }
};