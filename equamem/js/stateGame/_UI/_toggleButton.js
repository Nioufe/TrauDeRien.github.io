/**
 * Created by Adrien on 04/02/2015.
 */
ToggleButton = function (game, posX, posY, boolObject) {
  Phaser.Sprite.call(this, game, posX, posY, 'checkmark');

  this.scale.x = 0.6;
  this.scale.y = 0.6;
  this.bringToTop();
  this.visible = false;

  this.bool = boolObject;

  this.inputEnabled = true;
  this.events.onInputDown.add(function(clicked){startMenu.toggleBool(clicked) }, this);

  game.add.existing(this);
}
ToggleButton.prototype = Object.create(Phaser.Sprite.prototype);
ToggleButton.prototype.constructor = ToggleButton;