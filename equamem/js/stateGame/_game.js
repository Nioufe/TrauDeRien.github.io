/**
 * Created by Adrien on 02/02/2015.
 */
function winGameCheck() {
  game.time.events.add(1000, happyAnimals, this);

  //home.alpha = 0;
  //home.inputEnabled = false;

  UI.levelHelpButton.alpha = 0;
  UI.levelHelpButton.inputEnabled = false;

  UI.helpButton.alpha = 0;
  UI.helpButton.inputEnabled = false;

  UI.level.alpha = 0;
  UI.description.alpha = 0;
  UI.progressbar.alpha = 0;
}

function happyAnimals() {
  if (globals.endingAnimationPlaying) {
    return;
  }

  var animal;
  var scale = 1.1;
  var speed;

  animalManager. animals.forEach(function (loopAnimal) {
    if (scale == 1.1) {
      scale = 1.2;
    } else {
      scale = 1.1;
    }

    animal = game.add.sprite(loopAnimal.x, loopAnimal.y, loopAnimal.animalType);
    animal.anchor.setTo(0.5, 0.5);
    animal.alpha = 0;
    animal.scale.setTo(scale, scale);

    if (scale == 1.1) {
      scale = 1.2;
    } else {
      scale = 1.1;
    }

    speed = game.rnd.integerInRange(500, 1000);
    game.add.tween(animal).to({alpha: 1}, speed, Phaser.Easing.Quintic.None, true, 0, 0, false);
    game.add.tween(animal.scale).to({x: scale, y: scale}, speed, Phaser.Easing.Bounce.None, true, 0, 1000, true);
  });

  globals.endingAnimationPlaying = true;

  UI.messageBox.init();
  message(messages.base.won, false, false, false);

  startMenu.init();
}