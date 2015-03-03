/**
 * Created by Adrien on 04/02/2015.
 */
HelpButton = function (game, posX, posY, column, row) {
  Phaser.Sprite.call(this, game, posX, posY, 'help');

  this.anchor.setTo(0.5, 0.5);
  this.bringToTop();

  this.posX = posX;
  this.posY = posY;
  this.column = column;
  this.row = row;

  this.inputEnabled = true;
  this.events.onInputDown.add(startHelp, this);

  game.add.existing(this);
}
HelpButton.prototype = Object.create(Phaser.Sprite.prototype);
HelpButton.prototype.constructor = HelpButton;