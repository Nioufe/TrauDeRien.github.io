/**
 * Created by Adrien on 02/02/2015.
 */
var UIManager = {
  init: function () {
    var UI = {};



    // level text initialisation
    var currentLevelStyle = {font: "24px Pericles", fill: "#fff", align: "center"};
    var currentLevelText = game.add.text(200, 60, "", currentLevelStyle);
    currentLevelText.anchor.set(0.5);
    currentLevelText.visible = false;
    currentLevelText.eqUpdate = function () {
      if (settings.showLevelDescription) {
        var levelCurrentInt = levelManager.currentLevelIndex +1;
        var levelTotalInt = levelManager.getTotalMaps();
        var levelCurrentString = levelCurrentInt.toString();
        var levelTotalString = levelTotalInt.toString();
        var levelText = messages.startMenu.level;
        this.text = levelText + ' ' + levelCurrentString + '/' + levelTotalString;
        this.visible = true;
      }
    };
    UI.level = currentLevelText;

    //description text initialisation and add to UI
    var descriptionStyle = {font: "24px Pericles", fill: "#fff", align: "center"};
    var description = game.add.text(240, 80, "", descriptionStyle);
    description.anchor.set(0.5);
    description.stroke = '#000000';
    description.strokeThickness = 5;
    description.visible = false;
    description.eqUpdate = function () {
      if (settings.showDescription) {
        this.text = messages.descriptionMessages[levelManager.currentMap.messageKey];
        this.visible = true;
      }
    };
    UI.description = description;

    UI.levelCompleteOverlay = game.add.sprite(0, 0, 'mask');
    UI.levelCompleteOverlay.alpha = 0;

    UI.messageOverlay = game.add.sprite(0, 0, 'mask');
    UI.messageOverlay.alpha = 0;

    UI.handSprite = game.add.sprite(0, 0, 'hand');
    UI.handSprite.anchor.set(0.5);
    UI.handSprite.scale.x = 0.7;
    UI.handSprite.scale.y = 0.7;
    UI.handSprite.visible = false;


    UI.progressbar = new Progressbar(game, 200, 100, 0.66, 0.66, settings.showLevelDescription);
    UI.homeButton = new HomeButton(game, 320, 80, 0, 4, 0);
    UI.levelHelpButton = new LevelHelpButton(game, 440, 80, 0, 4, 0);
    UI.helpButton = new HelpButton(game, 560, 80, 0, 4, 0);

    UI.numbers = game.add.group();
    UI.messageBox = UIManager.messageBox.init();

    return UI;
  }
};