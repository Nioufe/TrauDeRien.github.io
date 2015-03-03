/**
 * Created by Adrien on 02/02/2015.
 */
var startMenu = {};
startMenu.init = function () {


  this.boolArrayValues = [];


  this.overlay = game.add.sprite(0, 0, 'mask');
  this.overlay.inputEnabled = false;
  this.overlay.visible = false;

  var startmenuTextstyle = {font: "96px Pericles", fill: "#fff", align: "center"};
  var startMenuToggleTextstyle = {font: "54px Pericles", fill: "#fff", align: "center"};
  var text;

  var toggleDifficultyButtons = game.add.group();
  var toggleMathtypeButtons = game.add.group();
  var toggleTexts = game.add.group();
  // Difficulty Buttons
  toggleDifficultyButtons.add(new ToggleButton(game, 50, 80, globals.easyBool));
  toggleDifficultyButtons.add(new ToggleButton(game, 50, 160, globals.normalBool));
  toggleDifficultyButtons.add(new ToggleButton(game, 50, 240, globals.hardBool));
  //Mathtype Buttons
  toggleMathtypeButtons.add(new ToggleButton(game, 50, 480, globals.additionBool));
  toggleMathtypeButtons.add(new ToggleButton(game, 50, 560, globals.multiplicationBool));

  this.toggleDifficultyButtons = toggleDifficultyButtons;
  this.toggleMathtypeButtons = toggleMathtypeButtons;

  this.initBoolArrayValues();

  // Difficulty Texts
  text = game.add.text(140, 80, messages.startMenu.easy, startMenuToggleTextstyle);
  text.visible = false;
  toggleTexts.add(text);
  text = game.add.text(140, 160, messages.startMenu.normal, startMenuToggleTextstyle);
  text.visible = false;
  toggleTexts.add(text);
  text = game.add.text(140, 240, messages.startMenu.hard, startMenuToggleTextstyle);
  text.visible = false;
  toggleTexts.add(text);
  text = game.add.text(140, 480, messages.startMenu.addition, startMenuToggleTextstyle);
  text.visible = false;
  toggleTexts.add(text);
  text = game.add.text(140, 560, messages.startMenu.multiplication, startMenuToggleTextstyle);
  text.visible = false;
  toggleTexts.add(text);
  this.toggleTexts = toggleTexts;

  this.toggleVisible(false);

  // Play button
  var startMenuPlay = game.add.text(140, 800, messages.startMenu.play, startmenuTextstyle);
  startMenuPlay.inputEnabled = true;
  startMenuPlay.events.onInputDown.add(this.startNewGame, this);
  startMenuPlay.visible = false;
  this.startMenuPlay = startMenuPlay;

  var startMenuPlaySprite = game.add.sprite(25, 810, 'playstop');
  startMenuPlaySprite.scale.x = 0.8;
  startMenuPlaySprite.scale.y = 0.8;
  startMenuPlaySprite.frame = 0;
  startMenuPlaySprite.inputEnabled = true;
  startMenuPlaySprite.events.onInputDown.add(this.startNewGame, this);
  startMenuPlaySprite.visible = false;
  this.startMenuPlaySprite = startMenuPlaySprite;

  // Close button
  var startmenuClose = game.add.text(140, 900, messages.startMenu.back, startmenuTextstyle);
  startmenuClose.inputEnabled = true;
  startmenuClose.events.onInputDown.add(this.closeStartmenu, this);
  startmenuClose.visible = false;
  this.startmenuClose = startmenuClose;

  var startmenuCloseSprite = game.add.sprite(25, 910, 'playstop');
  startmenuCloseSprite.scale.x = 0.8;
  startmenuCloseSprite.scale.y = 0.8;
  startmenuCloseSprite.frame = 1;
  startmenuCloseSprite.inputEnabled = true;
  startmenuCloseSprite.events.onInputDown.add(this.closeStartmenu, this);
  startmenuCloseSprite.visible = false;
  this.startmenuCloseSprite = startmenuCloseSprite;
};

startMenu.initBoolArrayValues = function () {
  if (globals.initBoolArrayValuesSaved) {
    var counter = 0;
    this.toggleDifficultyButtons.forEach(function (loopToggleButton) {
      loopToggleButton.bool.val = globals.initBoolArrayValuesSaved[counter];
      counter++;
    });

    this.toggleMathtypeButtons.forEach(function (loopToggleButton) {
      loopToggleButton.bool.val = globals.initBoolArrayValuesSaved[counter];
      counter++;
    });
  }
};

startMenu.openStartmenu = function () {
  if (!settings.startMenuEnabled) {
    return;
  }

  this.resetToggleButtonFrames();

  this.overlay.inputEnabled = true;
  this.overlay.visible = true;

  this.toggleVisible(true);

  this.startMenuPlay.visible = true;
  this.startMenuPlaySprite.visible = true;
  this.startmenuClose.visible = true;
  this.startmenuCloseSprite.visible = true;
};

startMenu.closeStartmenu = function () {
  this.overlay.inputEnabled = false;
  this.overlay.visible = false;

  this.toggleVisible(false);

  this.startMenuPlay.visible = false;
  this.startMenuPlaySprite.visible = false;
  this.startmenuClose.visible = false;
  this.startmenuCloseSprite.visible = false;
};

startMenu.startNewGame = function () {
  this.resetToggleButtonFrames();
  if (globals.endingAnimationPlaying) {
    globals.endingAnimationPlaying = false;
    this.updateBoolArrayValues();
    game.state.restart(true, false, this.boolArrayValues);
  }
  this.resetToggleButtonFrames();

  levelManager.init();

  globals.gameGray = false;
  globals.gameWon = false;
  var text = messages.newLevelMessages[levelManager.currentMap.messageKey];
  levelManager.resetLevel(levelManager.currentLevelIndex, 2, false, text);
  UI.level.eqUpdate();
  UI.sum.eqUpdate();
  UI.progressbar.eqUpdate();
  this.closeStartmenu();


};

startMenu.resetToggleButtonFrames = function() {
  this.toggleDifficultyButtons.forEach(function (loopToggleButton) {
    loopToggleButton.frame = (loopToggleButton.bool.val ? 0 : 1);
  });
  this.toggleMathtypeButtons.forEach(function (loopToggleButton) {
    loopToggleButton.frame = (loopToggleButton.bool.val ? 0 : 1);
  });
};

startMenu.toggleBool = function(clicked) {
  clicked.bool.val = !clicked.bool.val;
  clicked.frame ^= 1;

  if (this.allOfTypeFalse(clicked)) {
    clicked.bool.val = true;
    clicked.frame = 0;
  }
};

startMenu.allOfTypeFalse = function(clicked) {
  var result = true;
  clicked.parent.forEach(function (loopToggleButton) {
    if (loopToggleButton.bool.val) {
      result = false;
    }
  });
  return result;
};

startMenu.updateBoolArrayValues = function() {
  var self = this;
  this.boolArrayValues = [];
  toggleDifficultyButtons.forEach(function (loopToggleButton) {
    self.boolArrayValues.push(loopToggleButton.bool.val);
  });

  toggleMathtypeButtons.forEach(function (loopToggleButton) {
    self.boolArrayValues.push(loopToggleButton.bool.val);
  });
  /*
   difficultyBoolArrayValues = [];
   toggleDifficultyButtons.forEach(function(loopToggleButton) {
   difficultyBoolArrayValues.push(loopToggleButton.bool.val);
   });

   mathtypeBoolArrayValues = [];
   toggleMathtypeButtons.forEach(function(loopToggleButton) {
   mathtypeBoolArrayValues.push(loopToggleButton.bool.val);
   });
   */
};
startMenu.toggleVisible = function (visibleBool) {
  this.toggleDifficultyButtons.forEach(function (loopToggleButton) {
    loopToggleButton.visible = visibleBool;
  });
  this.toggleMathtypeButtons.forEach(function (loopToggleButton) {
    loopToggleButton.visible = visibleBool;
  });
  this.toggleTexts.forEach(function (loopToggleText) {
    loopToggleText.visible = visibleBool;
  });
};
