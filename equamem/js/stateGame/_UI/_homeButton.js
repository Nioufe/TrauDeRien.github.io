/**
 * Created by Adrien on 04/02/2015.
 */
HomeButton = function (game, posX, posY, column, row) {
  Phaser.Sprite.call(this, game, posX, posY, 'home');

  this.anchor.setTo(0.5, 0.5);
  this.bringToTop();

  this.posX = posX;
  this.posY = posY;
  this.column = column;
  this.row = row;

  this.inputEnabled = true;
  this.events.onInputDown.add(function(){startMenu.openStartmenu()}, this);

  if (!settings.startMenuEnabled)
  {
    this.visible = false;
  }

  game.add.existing(this);
}
HomeButton.prototype = Object.create(Phaser.Sprite.prototype);
HomeButton.prototype.constructor = HomeButton;