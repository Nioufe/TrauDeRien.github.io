/**
 * Created by Adrien on 02/02/2015.
 */
function startLevelHelp() {
  var text = messages.newLevelMessages[levelManager.currentMap.messageKey];
  message(text, false, false, true);
}

function startHelp() {
  //var i = -1;
  var i = 0;

  if (!(settings.helpArray.length > 0)) {
    return;
  }

  helpMessage(i);
}

function helpMessage(i) {
  var messageOverlay = UI.messageOverlay;
  messageOverlay.alpha = 0.5;
  messageOverlay.inputEnabled = true;
  messageOverlay.events.onInputDown.addOnce(continueHelpMessage, {"i": i});

  var messageBox = UI.messageBox;
  messageBox.sprite.y = (i == 0 ? -200 : game.world.centerY);
  messageBox.sprite.visible = true;

  var yPadding = 0;
  if (i == -1) {
    var messageString = messages.newLevelMessages[levelManager.currentMap.messageKey];
  }
  else {
    var messageKey = settings.helpArray[i];
    messageString = messages.helpMessages[messageKey].text;
    yPadding = -100;
    messageBox.helpImage.visible = false;
    if (messages.helpMessages[messageKey].imageframe != -1) {
      messageBox.helpImage.frame = messages.helpMessages[messageKey].imageframe;
      messageBox.helpImage.y = (i == 0 ? -250 : game.world.centerY + 50);
      messageBox.helpImage.visible = true;
    }
  }
  messageBox.text.setText(messageString);
  messageBox.text.y = (i == 0 ? -250 + yPadding : game.world.centerY - 50 + yPadding);
  messageBox.text.visible = true;

  messageBox.tap.text = messages.base.tap;
  messageBox.tap.y = (i == 0 ? -250 : game.world.centerY + 200);
  messageBox.tap.visible = true;

  game.add.tween(messageBox.sprite).to({y: game.world.centerY}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  game.add.tween(messageBox.text).to({y: game.world.centerY - 50 + yPadding}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  game.add.tween(messageBox.helpImage).to({y: game.world.centerY + 50}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
  game.add.tween(messageBox.tap).to({y: game.world.centerY + 200}, settings.messageFallTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
}

function continueHelpMessage() {
  var i = this.i;
  UI.messageBox.sprite.visible = false;
  UI.messageBox.text.visible = false;
  UI.messageBox.helpImage.visible = false;
  UI.messageBox.tap.visible = false;
  UI.messageOverlay.alpha = 0;
  UI.messageOverlay.inputEnabled = false;

  if ((i + 1) < settings.helpArray.length) {
    helpMessage(i + 1);
  }
  else {
    game.add.tween(UI.helpButton.scale).to({x: 1.5, y: 1.5}, 100, Phaser.Easing.Bounce.None, true, 0, 3, true);
  }
}