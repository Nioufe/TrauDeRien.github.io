/**
 * Created by Adrien on 09/09/2014.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
var testState = {
  create: function () {
    console.log('test');
    //activate controlls
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
    this.cursor = game.input.keyboard.createCursorKeys();

    this.createWorld();
    this.player = new Player();

    //debug infos
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
      20, 20, '', { font: '16px Arial', fill: '#ffffff' });

    //fullscreen
    inputF = game.input.keyboard.addKey(Phaser.Keyboard.F);
    inputF.onDown.addOnce(this.fullScreen, this);
  },


  update: function () {
    game.physics.arcade.collide(this.player.collision, this.layer1);
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    this.player.move(this.cursor);
  },


  render: function(){
    game.debug.body(this.player.collision);
    game.debug.body(this.player.sword, '#FF0000');
    game.debug.body(this.player.hitbox, '#0000FF')
  },
  /**
   * Create necessary elements for the level
   */

  createWorld: function () {
    game.add.image(0, 0, 'exemple');
    this.map = game.add.tilemap('map');
// Add the tileset to the map
    this.map.addTilesetImage('world_tiles2');
// Create the layer, by specifying the name of the Tiled layer
    this.layer1 = this.map.createLayer('Calque de Tile 1');
// Set the world size to match the size of the layer
    this.layer1.resizeWorld();
// Enable collisions for the first element of our tileset (the blue wall)
    this.map.setCollision(1);
  },
  //TODO organise for code reuse

  /**
   * Fonction utilitaires
   */
  fullScreen: function () {

    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen();
    }
    else {
      game.scale.startFullScreen(false);
    }

  }
};