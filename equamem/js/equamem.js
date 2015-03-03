/**
 * Created by Adrien on 04/02/2015.
 */
window.onload = function() {
  window.game = new Phaser.Game(640, 1120, Phaser.CANVAS, 'phaser-example');

  game.state.add('game', stateGame);
  game.state.add('boot', stateBoot);
  game.state.add('load', stateLoad);

  game.state.start('boot');
};
