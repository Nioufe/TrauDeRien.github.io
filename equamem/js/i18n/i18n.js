/**
 * Created by Adrien on 02/02/2015.
 */
//TODO Remake messages
function message(text, deselectAllBool, continueNextLevel, flashLevelHelp) {
  if (!settings.messagesEnabled) {
    return;
  }

  UI.messageOverlay.alpha = 0.5;
  UI.messageOverlay.inputEnabled = true;
  UI.messageOverlay.events.onInputDown.addOnce(continueMessage, {
    "deselectAllBool": deselectAllBool,
    "continueNextLevel": continueNextLevel,
    "flashLevelHelp": flashLevelHelp
  });

  UI.messageBox.sprite.y = -200;
  UI.messageBox.sprite.visible = true;

  UI.messageBox.text.setText(text);
  UI.messageBox.text.y = -250;
  UI.messageBox.text.visible = true;

  UI.messageBox.tap.text = messages.base.tap;
  UI.messageBox.tap.y = -250;
  UI.messageBox.tap.visible = true;

  game.add.tween(UI.messageBox.sprite).to({y: game.world.centerY}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  game.add.tween(UI.messageBox.text).to({y: game.world.centerY - 50}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  game.add.tween(UI.messageBox.tap).to({y: game.world.centerY + 200}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
}

function continueMessage() {
  var deselectAllBool = this.deselectAllBool;
  var continueNextLevel = this.continueNextLevel;
  var flashLevelHelp = this.flashLevelHelp;
  UI.messageBox.sprite.visible = false;
  UI.messageBox.text.visible = false;
  UI.messageBox.tap.visible = false;
  UI.messageOverlay.alpha = 0;
  UI.messageOverlay.inputEnabled = false;

  if (deselectAllBool) {
    deselectAll();
  }

  if (continueNextLevel) {
    levelManager.continueToNextLevel();
  }

  if (globals.tutorialActive) {
    tutorialFunction();
  }

  if (flashLevelHelp && settings.flashHelpNewLevel) {
    game.add.tween(UI.levelHelpButton.scale).to({x: 1.5, y: 1.5}, 100, Phaser.Easing.Bounce.None, true, 0, 3, true);
  }
}