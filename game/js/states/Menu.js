/**
 * Created by Adrien on 09/09/2014.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
var menuState = {
  create: function () {
    console.log('menu')
// Add a background image
//TODO    game.add.image(0, 0, 'background');
// Display the name of the game
    var nameLabel = game.add.text(game.world.centerX, -50, 'Falling Wings',
      { font: '50px Geo', fill: '#ffffff' });
    nameLabel.anchor.setTo(0.5, 0.5);
// Show the score at the center of the screen
    var tween = game.add.tween(nameLabel).easing(Phaser.Easing.Bounce.Out);
// Change the y position of the label to 80, in 1000 ms
    tween.to({y: 80}, 500);
    tween.start();
// Start the tween
// Explain how to start the game

//TODO    this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
//    if (game.sound.mute) {
//// Change the frame to display the speaker with no sound
//      this.muteButton.frame = 1;
//    }
//// If the mouse is over the button, it becomes a hand cursor
//    this.muteButton.input.useHandCursor = true;

//TODO REPLACE BY MENU Create a new Phaser keyboard variable: the up arrow key
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
// When the 'upKey' is pressed, it will call the 'start' function once
    enterKey.onDown.addOnce(this.start, this);

  },
  toggleSound: function() {
// Switch the Phaser sound variable from true to false, or false to true
// When 'game.sound.mute = true', Phaser will mute the game
    game.sound.mute = ! game.sound.mute;
// Change the frame of the button
    this.muteButton.frame = game.sound.mute ? 1 : 0;
  },
  start: function () {
// Start the actual game
    game.state.start('test');
  }
};