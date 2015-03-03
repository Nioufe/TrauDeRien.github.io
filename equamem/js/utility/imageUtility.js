/**
 * Created by Adrien on 02/02/2015.
 */
var imageUtility = {
  reset: function (image) {
    image.flipped = false;
    image.selected = false;
    image.scale.x = 1.125;
    if (settings.animalOnFlippable) {
      image.frame = 0;
    }
    else {
      image.frame = 1;
    }

    image.gray = false;
  },
  resetAll: function (group) {
    group.forEach(function (loopGroup) {
      resetImage(loopGroup);
    });
  },
  fadeOut: function (sprite) {
    game.add.tween(sprite).to({alpha: 0}, settings.fadeOutTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  },
  fadeIn: function (sprite) {
    game.add.tween(sprite).to({alpha: 1}, settings.fadeInTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  },
  sign: function(number){
    return number?number<0?-1:1:0;
  }

};