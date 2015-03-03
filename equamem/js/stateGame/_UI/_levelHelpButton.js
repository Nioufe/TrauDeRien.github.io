/**
 * Created by Adrien on 04/02/2015.
 */
LevelHelpButton = function (game, posX, posY, column, row) {
  Phaser.Sprite.call(this, game, posX, posY, 'levelhelp');

  this.anchor.setTo(0.5, 0.5);
  this.bringToTop();

  this.posX = posX;
  this.posY = posY;
  this.column = column;
  this.row = row;

  this.inputEnabled = true;
  this.events.onInputDown.add(startLevelHelp, this);

  game.add.existing(this);
}
LevelHelpButton.prototype = Object.create(Phaser.Sprite.prototype);
LevelHelpButton.prototype.constructor = LevelHelpButton;