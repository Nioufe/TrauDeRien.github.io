/**
 * Created by Adrien on 02/02/2015.
 */
Progressbar = function (game, posX, posY, scaleX, scaleY, showLevelDescription) {
  Phaser.Sprite.call(this, game, posX, posY, 'progressbar');

  this.anchor.setTo(0.5, 0.5);
  this.bringToTop();

  this.scale.x = scaleX;
  this.scale.y = scaleY;
  this.frame = 0;

  if (!showLevelDescription)
  {
    this.visible = false;
  }

  game.add.existing(this);
};
Progressbar.prototype = Object.create(Phaser.Sprite.prototype);
Progressbar.prototype.constructor = Progressbar;

Progressbar.prototype.eqUpdate = function() {
  var totalLevels = levelManager.currentMap.levels.length;
  this.frame = Math.floor(10 * (levelManager.currentLevelIndex / totalLevels));
};