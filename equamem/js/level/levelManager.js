/**
 * Created by Adrien on 02/02/2015.
 * Handle level creation and logic ( finding solutions for example)
 */
(function () {

//PRIVATE FUNCTIONS

  // take as much animals as the number of pairs and assign them to them
  var assignAnimals = function (pairs) {
    var activeAnimals = _.sample(globals.animalTypes, pairs.length);
    for (var key in pairs) {
      pairs[key].animal = activeAnimals[key];
    }
    return pairs;
  };

  //place pairs on a grid of the right size
  var assignPositions = function (pairs) {
    if (pairs.length > settings.maxPairs) {
      throw "Too much pairs in the level. Can't fit in the current grid"
    }
    //createPositions
    var positions = [];
    var totalRows = Math.ceil(pairs.length/2);
    var unEvenRow = pairs.length%2;
    for (var j = 0; j < totalRows; j++) {
      for (var i = 0; i < 4; i++) {
        // make the positions filled symetrical even if we can't fill the last row
        if(unEvenRow && j === totalRows - 1
          && (i === 0 || i === 3)){
          continue;
        }
        positions.push([i, j])
      }
    }
    //shufflePositions
    positions = _.sample(positions, pairs.length * 2);
    //assignPositions
    var level = [];
    for (var k = 0; k < pairs.length; k++) {
      level.push({
        position: positions[k * 2],
        val: pairs[k].val[0],
        animal: pairs[k].animal,
        op: pairs[k].op
      });
      level.push({
        position: positions[k * 2 + 1],
        val: pairs[k].val[1],
        animal: pairs[k].animal,
        op: pairs[k].op
      });
    }
    return level;
  };


//PUBLIC FUNCTIONS

  window.levelManager = {
    // generates the pairs of a level
    generatePairs: function (mainOperation, difficulty, numberOfPairs) {
      //return levelExamples[0];
      return levelGenerator.generate(globals.ops.add, 2, 12);
    },
    //place the pairs on a grid and gives them an animal
    placePairs: function (pairs) {
      pairs = assignAnimals(pairs);
      var level = assignPositions(pairs);

      // nothing is selected at the beginning
      return level;
    },
    //TODO find a better algorithm
    findSolutions: function (level) {

      var solutions = [];
      for (var i = 0; i < level.length; i++) {
        for (var j = i + 1; j < level.length; j++) {
          if(level[i].val === level[j].val && level[i].animal !== level[j].animal){
            solutions.push([level[i],level[j]])
          }
        }
      }
      return solutions;
    },
    getInfo: function(level, col, row){
      return _.find(level, function(info){
        if(info.position[0] === col
          && info.position[1] === row){
          return true
        }
        return false;
      })
    },
    getPaired : function(level, cardInfo){
      return  _.find(level, function(element){
        return element.animal === cardInfo.animal
          && (element.position[0] !== cardInfo.position[0]
          || element.position[1] !== cardInfo.position[1])
      });
    }
  }
})
();

