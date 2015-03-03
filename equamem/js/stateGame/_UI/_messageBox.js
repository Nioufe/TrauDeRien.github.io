/**
 * Created by Adrien on 02/02/2015.
 */
UIManager.messageBox = {
  init: function () {
    var messageBox = {};
    messageBox.sprite = game.add.sprite(game.world.centerX, 500, 'messagebox');
    messageBox.sprite.visible = false;
    messageBox.sprite.anchor.set(0.5);

    var messageString = "";
    messageBox.text = game.add.text(game.world.centerX, -250, messageString, settings.messageStyle);
    messageBox.text.anchor.set(0.5);
    messageBox.text.stroke = '#000000';
    messageBox.text.strokeThickness = 5;
    messageBox.text.visible = false;

    messageBox.helpImage = game.add.sprite(game.world.centerX, -200, 'helpimages');
    messageBox.helpImage.anchor.set(0.5);
    messageBox.helpImage.scale.x = 1.25;
    messageBox.helpImage.scale.y = 1.25;
    messageBox.helpImage.visible = false;

    messageBox.tap = game.add.text(game.world.centerX, 0, messages.base.tap, settings.messageTapStyle);
    messageBox.tap.anchor.set(0.5);
    messageBox.tap.stroke = '#000000';
    messageBox.tap.strokeThickness = 5;
    messageBox.tap.visible = true;

    return messageBox;
  }
};