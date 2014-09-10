/**
 * Created by Adrien on 09/09/2014.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');
// Define our 'global' variable
game.global = {
  score: 0
};
// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('test', testState);
// Start the 'boot' state
game.state.start('boot');