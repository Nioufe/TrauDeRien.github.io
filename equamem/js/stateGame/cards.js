/**
 * Created by Adrien on 05/02/2015.
 */

/**
 * Contains all the graphic functions to draw cards
 */
(function () {
  var cards;
  var numberMargin = function (value, axis) {
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
  };


  var Card = function (cardInfo) {
    var posX = cardInfo.position[0] * 160 + 80;
    var posY = cardInfo.position[1] * 160 + 240;

    Phaser.Sprite.call(this, game, posX, posY, 'animal');

    var animal = game.make.image(0, 0, cardInfo.animal);
    var shaped = game.make.bitmapData(animal.width, animal.height);
    shaped.alphaMask(cardInfo.animal, cardInfo.op);

    this.loadTexture(shaped);
    this.frame = 0;
    this.animalType = cardInfo.animal;
    this.column = cardInfo.position[0];
    this.row = cardInfo.position[1];

    this.anchor.setTo(0.5, 0.5);
    this.bringToTop();
    this.scale.x = 1.125;
    this.scale.y = 1.125;
    this.alpha = 0.3;
    // Click handling
    this.inputEnabled = true;

    var circle = new Selectable();
    this.addChild(circle);
    this.selectableCircle = circle;
    circle.bringToTop();

    var selected = game.add.sprite(0,0, 'selected');
    selected.anchor.setTo(0.5, 0.5);
    selected.scale.x = 1.125;
    selected.scale.y = 1.125;
    selected.visible = false;

    this.addChild(selected);
    this.selected = selected;
    selected.bringToTop();

    this.showQuestionMark();
    game.add.existing(this);
  };
  Card.prototype = Object.create(Phaser.Sprite.prototype);
  Card.prototype.constructor = Card;


  Card.prototype.showNumber = function (number) {
    var numberStyle = {font: "100px Pericles", fill: "#fff", align: "center"};
    var text = number.toString();

    var number = game.add.text(0, 0, text, numberStyle);
    number.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    number.anchor.setTo(0.5, 0.5);
    if (settings.numberStrokes) {
      number.stroke = '#000000';
      number.strokeThickness = 5;
    }
    number.scale.x = -1 / 1.125;
    this.addChild(number);
    this.number = number;
  };
  Card.prototype.turnGray = function () {
    this.frame = 2;
  };
  Card.prototype.reColor = function () {
    this.frame = 0;
  };
  Card.prototype.shrink = function(){
    var sign = imageUtility.sign(this.scale.x);
    this.scale = {x: sign*0.8, y:0.8};
  };
  Card.prototype.normalState = function() {
    var sign = imageUtility.sign(this.scale.x);
    this.scale = {x: sign*1.125, y: 1.125};
    this.selected.visible = false;
  };
  Card.prototype.select = function(){
    this.selected.visible = true;
  };
  Card.prototype.selectable = function(){
    if(this.selectableCircle) {
      this.selectableCircle.visible = true;
    }
  };
  Card.prototype.unSelectable = function(){
    if (this.selectableCircle) {
      this.selectableCircle.visible = false;
    }
  };



  Card.prototype.flip = function (animate) {
    this.alpha = 1;
    this.hideQuestionMark(false, 1);
    if (settings.invertXflipped) {
      if (settings.flipAnimation && animate) {
        game.add.tween(this.scale).to({x: -1*this.scale.x}, settings.flipAnimationTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
      }
      else {
        this.scale.x = -1*this.scale.x;
      }
    }
  };

  Card.prototype.showQuestionMark = function () {
    var style = {font: "100px Pericles", fill: "#fff", align: "center"};
    var text = "?";

    var questionMark = game.add.text(0, 0, text, style);
    questionMark.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    questionMark.anchor.setTo(0.5, 0.5);
    if (settings.numberStrokes) {
      questionMark.stroke = '#000000';
      questionMark.strokeThickness = 5;
    }
    this.addChild(questionMark);
    this.questionMark = questionMark;
  };
  Card.prototype.hideQuestionMark = function (animate, alpha) {
    if (!this.questionMark) {
      return;
    }
    var destroy = function(){
      this.questionMark.destroy();
      this.questionMark = null;
      this.alpha = alpha;
    };

    if(animate) {
      var hideTween = game.add.tween(this);
      hideTween.onComplete.add(destroy, this);
      hideTween.to({alpha: alpha}, settings.flipAnimationTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
      game.add.tween(this.questionMark).to({alpha: 0}, settings.flipAnimationTime, Phaser.Easing.Quintic.None, true, 0, 0, false);
    } else {
      destroy.call(this);
    }
  };


  var Selectable = function () {
    Phaser.Sprite.call(this, game, 0, 0, 'selectable');

    this.anchor.setTo(0.5, 0.5);
    this.bringToTop();
    this.visible = false;
    this.scale.x = 1.125;
    this.scale.y = 1.125;

    game.add.existing(this);
  };
  Selectable.prototype = Object.create(Phaser.Sprite.prototype);
  Selectable.prototype.constructor = Selectable;

  window.cardsManager = {
    createCards: function (state) {
      var level = state.level;
      // create sprites
      cards = game.add.group();

      for (var key in level) {
        cards.add(new Card(level[key]));
      }
      //add callback
    },
    turnGray: function(cardsInfos){
      cards.forEach(function (card) {
        var isIncluded = _.find(cardsInfos, function (cardInfo) {
          return cardInfo.position[0] === card.column
            && cardInfo.position[1] === card.row
        });
        if (isIncluded) {
          card.turnGray();
        }
      });
    },
    reColor: function(cardsInfos){
      cards.forEach(function (card) {
        var isIncluded = _.find(cardsInfos, function (cardInfo) {
          return cardInfo.position[0] === card.column
            && cardInfo.position[1] === card.row
        });
        if (isIncluded) {
          card.reColor();
        }
      });
    },
    block: function(cardsInfos){
      cards.forEach(function (card) {
        var isIncluded = _.find(cardsInfos, function (cardInfo) {
          return cardInfo.position[0] === card.column
            && cardInfo.position[1] === card.row
        });
        if (isIncluded) {
          card.shrink();
        }
      });
    },
    unBlock: function(cardsInfos){
      cards.forEach(function (card) {
        var isIncluded = _.find(cardsInfos, function (cardInfo) {
          return cardInfo.position[0] === card.column
            && cardInfo.position[1] === card.row
        });
        if (isIncluded) {
          card.normalState();
        }
      });
    },
    turnAllGray: function (exclude) {
      cards.forEach(function (card) {
        var isExcluded = _.find(exclude, function (cardInfo) {
          return cardInfo.position[0] === card.column
            && cardInfo.position[1] === card.row
        });
        if (!isExcluded) {
          card.turnGray();
        }
      });
    },
    disableClickAll: function () {
      cards.forEach(function (card) {
        card.inputEnabled = false;
      });
    },
    addClickHandler: function (callback) {
      cards.forEach(function (card) {
        card.events.onInputDown.add(callback, this);
      });
    },
    flipCard: function (card, number) {
      card.showNumber(number);
      card.flip(true);
    },
    flipList: function (cardsInfoList) {
      for (var key in cardsInfoList) {
        var cardInfo = cardsInfoList[key];
        var card = _.find(cards.children, function (card) {
          return card.column === cardInfo.position[0]
            && card.row === cardInfo.position[1];
        });
        if(imageUtility.sign(card.scale.x) === 1){
          this.flipCard(card, cardInfo.val);
        }
      }
    },
    selectCard: function (cardInfo) {
      var card = this.getCard(cardInfo);
      card.select();

    },
    getCard: function(cardInfo){
      return _.find(cards.children, function (card) {
        return card.column === cardInfo.position[0]
          && card.row === cardInfo.position[1];
      });
    },
    showSelectable: function(){
      //Right now he check for attributes default values to detect a card in a normal state
      cards.children.forEach(function(card){
        if(Math.abs(card.scale.x) === 1.125 && card.alpha === 1 && card.selected.visible === false){
          card.selectable();
        }
      });
    },
    unSelectableAll: function(){
      cards.children.forEach(function(card){
        card.unSelectable();
      });
    }
  };
})();