/**
 * Created by Adrien on 02/02/2015.
 * Contains game logic
 */
(function () {
  //checks for solutions and swap numbers
  var turnedList;
  var selectedList;
  var solutionsAvailable;

  /**
   * Local functions to handle the events and rules of the game
   * @param state
   */

  //check for other rules

  var loadLevel = function (state) {
    // creates the new level
    state.pairs = levelManager.generatePairs(state.mainOperation, state.difficulty);
    state.level = levelManager.placePairs(state.pairs);
    state.total = getLevelTotal(state.pairs);
    UI.init(state.total);
  };

  var clickHandler = function (state, card) {
    var cardInfo = levelManager.getInfo(state.level, card.column, card.row);
    // turn the card if no number was selected
    // we always identify an action on a card by putting [column, row] in the related pair
    var turnedAnimal = _.find(turnedList, function(element){
      return element.animal === cardInfo.animal;
    });
    var selectedAnimal = _.find(selectedList, function(element){
      return element.animal === cardInfo.animal;
    });
    var selectedCard =  _.find(selectedList, function(element){
      return element === cardInfo
    });
    var isTurned = _.contains(turnedList,cardInfo);
    if (!turnedAnimal) {
      //if you try to turn and miss a solution, you lose
      if(solutionsAvailable.length > 0){
        handleLossMiss();
        return;
      }
      //get the number to show to prevent showing twice the same
      var number = doSwap(state.level, cardInfo);
      turnedList.push(cardInfo);
      solutionsAvailable = isNewSolution(state.level, turnedList, cardInfo);

      //turn the card
      if(state.turnedSelected){
        card.shrink();
      }
      cardsManager.flipCard(card, number);

        var pairedCardInfo = levelManager.getPaired(state.level, cardInfo);
      cardsManager.getCard(pairedCardInfo).hideQuestionMark(true, 1);
    }

    //if the selection is valid we draw the circle and save the selection
    else if (!selectedAnimal && !selectedCard) {
      //check for the no 2 turned card selected rule
      var turnedSelected = _.find(selectedList, function(element){
        return _.contains(turnedList,element);
      });
      if(isTurned && turnedSelected){
        return;
      }

      // draw the state change
      card.select();
      var pairedInfo = levelManager.getPaired(state.level, cardInfo);

      // reduce the size onf unselectable cards
      cardsManager.getCard(pairedInfo).shrink();
      if(isTurned){
        cardsManager.block(_.without(turnedList, cardInfo));
        state.turnedSelected = true;
      }

      //show wich cards you can select as a second card
      cardsManager.showSelectable();

      //save the state change
      selectedList.push(cardInfo);
      if(selectedList.length === 2){
        var won = checkWin(selectedList, solutionsAvailable);
        if(won){
          handleWin()
        } else {
          handleLoss();
        }
      }
    }
    //if the card was already selected we unselect it
    else if (selectedCard) {
      cardsManager.unSelectableAll();
      card.normalState();
      var pairedInfo = levelManager.getPaired(state.level, cardInfo);
      cardsManager.getCard(pairedInfo).normalState();
      selectedList = _.without(selectedList,cardInfo);
      if(isTurned){
        cardsManager.unBlock(turnedList);
        state.turnedSelected = false;
      }
    }

  };

  var handleWin = function(){
    game.state.start('game');
  };
  var handleLoss = function(){
    cardsManager.unSelectableAll();
    cardsManager.disableClickAll();
    cardsManager.flipList(selectedList);
    cardsManager.turnAllGray(selectedList);
    game.input.onDown.addOnce(function(){    game.state.start('game');});
  };
  var handleLossMiss = function(){
    cardsManager.unSelectableAll();
    cardsManager.disableClickAll();
    var cardsSolution = [];
    for(var key in solutionsAvailable){
      cardsSolution.push(solutionsAvailable[key][0]);
      cardsSolution.push(solutionsAvailable[key][1]);
    }
    var exclude = _.union(cardsSolution, selectedList)
    cardsManager.turnAllGray(exclude);
    cardsManager.selectCard(solutionsAvailable[0][0]);
    cardsManager.selectCard(solutionsAvailable[0][1]);
    game.input.onDown.addOnce(function(){    game.state.start('game');});

  };
  var checkWin = function(selectedList, solutionsAvailable){
    for(var i = 0; i<solutionsAvailable.length; i++){
      var solution = solutionsAvailable[i];
      if(_.contains(solution, selectedList[0]) && _.contains(solution, selectedList[1])){
        return true;
      }
    }
    return false;
  };

  var doSwap = function(level, cardInfo){
    if(settings.swapDoubles){
      var toSwap = _.find(turnedList, function(element){
        return element.val === cardInfo.val;
      });
      //if the number is already on the screen, swap the values
      if(toSwap){
        var swap = levelManager.getPaired(level, cardInfo);
        var temp = swap.val;
        swap.val = cardInfo.val;
        cardInfo.val = temp;
      }
    }
    return cardInfo.val;
  };

  //since the level is only described by a table, need this function to get the total
  // TODO make level manager save total somewhere
  var getLevelTotal = function(pairs){
    switch (pairs[0].op) {
      case globals.ops.add:
        return pairs[0].val[0] + pairs[0].val[1];
      case globals.ops.mult:
        return pairs[0].val[0] * pairs[0].val[1];
      case globals.ops.div:
        return _.max(pairs[0].val) / _.min(pairs[0].val);
      case globals.ops.sub:
        return _.max(pairs[0].val) - _.min(pairs[0].val);

    }
  };

  var isNewSolution = function(level, turnedList, cardInfo){
    var animals = _.map(turnedList, function(element){ return element.animal});
    animals = _.uniq(animals);
    var cards = _.filter(level, function(element){
      return _.contains(animals, element.animal);
    });
    return levelManager.findSolutions(cards);
  };

  /**
   * Public functions for phaser
   * @type {{create: Function, init: Function, preload: Function, update: Function, render: Function, reset: Function}}
   */
  window.stateGame = {

    create: function () {
      game.stage.backgroundColor = settings.game.bgColor;
      // default values
      if (!this.mainOperation) {
        this.mainOperation = globals.ops.add;
      }
      if (!this.difficulty) {
        this.difficulty = globals.difficulty.easy;
      }
      //init rules and solution checking variables
      selectedList = [];
      turnedList = [];
      solutionsAvailable = [];
      this.turnedSelected = false;

      loadLevel(this);
      cardsManager.createCards(this);
      cardsManager.addClickHandler((function (state) {
          return function (card, pointer) {
            clickHandler(state, card, pointer);
          }
        })(this)
      );
    },

    init: function (initBoolArrayValues) {
      if (initBoolArrayValues) {
        globals.initBoolArrayValuesSaved = initBoolArrayValues;
      }
    },
    preload: function preload() {
      //Phaser.Canvas.setSmoothingEnabled(game.context, false) // For scaling;
    }
    ,
    update: function () {
    },
    render: function () {
    },


    reset: function () {
      imageUtility.resetAll(animalManager.animals);
      animalManager.updateAll(this.levelManager);
      UI.sum.eqUpdate(levelManager);
      UI.numbers.removeAll(true);
    }
  };
})();