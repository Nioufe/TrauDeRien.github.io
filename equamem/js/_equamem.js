/* Equamem Alpha 1.60 */

var fadeOutTime = settings.fadeOutTime;

/**********************/
/* TUTORIAL FUNCTIONS */
/**********************/
function tutorialFunction() {
  if (globals.tutorialStep == 1) {
    // After the tutorial start message
    message(messages.tutorialMessages.tap, false, false, false);
    globals.tutorialStep = 2;
  }
}

/******************/
/* CLICK FUNCTION */
/******************/
function click(animal, pointer) {
  // Handle hitbox
  if (!hitboxCheck(animal, pointer)) {
    deselectAll();
    return;
  }
  var firstSelected = animalManager.selected.getAt(0);
  var secondSelected = animalManager.selected.getAt(1);

  fadeOutTime = settings.fadeOutTime;

  // Handle the first click
  if (firstSelected.visible) {
    var otherAnimal = animalManager.findOtherSelectedAnimal(firstSelected);
    var sameAnimalType = (animal.animalType == otherAnimal.animalType);
    var bothFlipped = (animal.flipped && otherAnimal.flipped);
    if (!sameAnimalType && !bothFlipped) {
      var won = animalManager.pairMatch(animal, firstSelected);
    }
  }

  if (!animal.selected && !animal.flipped && !firstSelected.visible) {
    if ((globals.tutorialStep == 2) && globals.tutorialActive) {
      globals.tutorialStep = 3;
      message(messages.tutorialMessages.tapSelected, false, false, false);
    } // Tutorial
    animal.select(firstSelected);
  }

  else if (!animal.selected && !animal.flipped && firstSelected.visible) {
    if ((globals.tutorialStep < 5) && globals.tutorialActive) {
      return;
    } // Tutorial
    if (!sameAnimalType && !bothFlipped) {
      animal.finalSelect(secondSelected);
      if (won) {
        if ((globals.tutorialStep > 4) && globals.tutorialActive) {
          globals.tutorialStep = 7;
          message(messages.tutorialMessages.more, false, false, false);
        } // Tutorial
        levelManager.resetLevel(levelManager.currentLevelIndex + 1, 1, true, messages.base.correct);
      }
      else {
        if ((globals.tutorialStep > 4) && globals.tutorialActive) {
          globals.tutorialStep = 6;
          message(messages.tutorialMessages.wrong, true, false, false);
          return;
        } // Tutorial
        levelManager.resetLevel(levelManager.currentLevelIndex - 1, 2, true, messages.base.wrong);
      }
    }
    else {
      if (settings.messageHelpEnabled) {
        message(messages.base.preventSelectBoth, false, false, false);
      }
    }
  }

  else if (animal.selected && !animal.flipped) {
    animal.unSelectAnimal(firstSelected);

    var otherAnimal = animal.getSecondImage();
    if (otherAnimal.flipped && settings.preventFlipBoth) {
      if (settings.messageHelpEnabled) {
        message(messages.base.preventFlipBoth, false, false, false);
      }
      return;
    }

    if (!otherAnimal.flipped && settings.swapDoubles) {
      var visible = numberVisible(animal.value);
      if (visible) {
        // Swap the recently shown animal tile values
        var temp = animal.value;
        animal.value = otherAnimal.value;
        otherAnimal.value = temp;
      }
    }

    var solutionExists = solutionExistsAll();
    if (!solutionExists) {
      if ((globals.tutorialStep == 3) && globals.tutorialActive) {
        globals.tutorialStep = 4;
        message(messages.tutorialMessages.tap, false, false, false);
      } // Tutorial
      animal.flip(true);
      solutionExists = solutionExistsAll();
      if (solutionExists) {
        if ((globals.tutorialStep == 4) && globals.tutorialActive) {
          globals.tutorialStep = 5;
          message(messages.tutorialMessages.match, false, false, false);
        } // Tutorial
      }
    } else {
      if (globals.tutorialActive) {
        return;
      } // Tutorial
      if (settings.missedSolutionFadeTimeEnabled) {
        fadeOutTime = settings.missedSolutionFadeOutTime;
      }
      levelManager.resetLevel(levelManager.currentLevelIndex - 1, 3, false, messages.base.missed);
    }
  }

  else if (!animal.selected && animal.flipped && !firstSelected.visible) {
    animal.select(firstSelected);
  }

  else if (!animal.selected && animal.flipped && firstSelected.visible) {
    if ((globals.tutorialStep < 5) && globals.tutorialActive) {
      return;
    } // Tutorial
    if (!sameAnimalType && !bothFlipped) {
      animal.finalSelect(secondSelected);
      if (won) {
        levelManager.resetLevel(levelManager.currentLevelIndex + 1, 1, true, messages.base.correct);
      }
      else {
        if ((globals.tutorialStep > 4) && globals.tutorialActive) {
          globals.tutorialStep = 6;
          message(messages.tutorialMessages.wrong, true, false, false);
          return;
        } // Tutorial
        levelManager.resetLevel(levelManager.currentLevelIndex - 1, 2, true, messages.base.wrong);
      }
    }
    else {
      if (sameAnimalType) {
        if (settings.messageHelpEnabled) {
          message(messages.base.preventSelectBoth, false, false, false);
        }
      }
      else {
        if (settings.messageHelpEnabled) {
          message(messages.base.preventSelectFlipped, false, false, false);
        }
      }
    }
  }

  else if (animal.selected && animal.flipped) {
    animal.unSelectAnimal(firstSelected);
  }
}

// check if the number is already on the screen
function numberVisible(number) {
  var animal;
  var value;

  for (var i = 0; i < animalManager.flippedAnimals.length; i++) {
    animal = animalManager.animals.getAt(animalManager.flippedAnimals[i]);
    value = animal.value;
    if (value == number) {
      return true;
    }
  }

  return false;
}

/********************/
/* HITBOX FUNCTIONS */
/********************/
function hitboxCheck(animal, pointer) {
  var horizonalCheckLeft = ((animal.x - 50) < pointer.x);
  var horizonalCheckRight = (pointer.x < (animal.x + 50));
  var verticalCheckTop = ((animal.y - 50) < pointer.y);
  var verticalCheckBot = (pointer.y < (animal.y + 50));

  return (horizonalCheckLeft && horizonalCheckRight && verticalCheckTop && verticalCheckBot);
}



/**********************/
/* SELECTED FUNCTIONS */
/**********************/


function deselectAll() {
  // Handle resetGame
  if (globals.gameGray) {
    levelManager.newLevel();
    return;
  }

  resetSelected();

  animalManager.animals.forEach(function (loopAnimal) {
    loopAnimal.selected = false;
  });
}

/**********************/
/* FLIPPING FUNCTIONS */
/**********************/


function numberMargin(value, axis) {
  var result = 0;

  if (!settings.addNumberMargins) {
    return result;
  }

  if (value == 2) {
    result = (axis == 'x' ? 5 : -5);
  }
  if (value == 3) {
    result = (axis == 'x' ? 5 : -5);
  }
  if (value == 4) {
    result = (axis == 'x' ? -5 : -5);
  }

  return result;
}

/**************************/
/* COMPARE PAIR FUNCTIONS */
/**************************/

function fadeOutImages() {
  animalManager.animals.forEach(function (loopAnimal) {
    imageUtility.fadeOut(loopAnimal);
  });
}

function fadeInImages() {
  animalManager.animals.forEach(function (loopAnimal) {
    imageUtility.fadeIn(loopAnimal);
  });
}

function resetSelected() {
  UI.handSprite.visible = false;
  animalManager.selected.forEach(function (loopSelected) {
    loopSelected.visible = false;
  });
}


function fadeOutSelected() {
  imageUtility.fadeOut(UI.handSprite);
  animalManager.selected.forEach(function (loopSelected) {
    imageUtility.fadeOut(loopSelected);
  });
}

function fadeInSelected() {
  imageUtility.fadeIn(UI.handSprite);
  animalManager.selected.forEach(function (loopSelected) {
    imageUtility.fadeIn(loopSelected);
  });
}

function fadeOutNumbers() {
  UI.numbers.forEach(function (loopNumber) {
    imageUtility.fadeOut(loopNumber);
  });
}

function resetImage(image) {
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
}


function resetMenu() {
  UI.sum.eqUpdate();
  globals.gameGray = false;
}



function resetImages() {
  animalManager.animals.forEach(function (loopAnimal) {
    resetImage(loopAnimal);
  });

  animalManager.updateAll();
  UI.numbers.removeAll(true);
}

function disableClickAllImages() {
  animalManager.animals.forEach(function (loopAnimal) {
    loopAnimal.inputEnabled = false;
  });
}

function enableClickAllImages() {
  animalManager.animals.forEach(function (loopAnimal) {
    loopAnimal.inputEnabled = true;
  });

  levelManager.disableNewLevel = false;
}



/**********************/
/* WIN GAME FUNCTIONS */
/**********************/





