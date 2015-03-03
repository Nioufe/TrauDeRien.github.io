/**
 * Created by Adrien on 20/02/2015.
 *
 * First draft of a level generator
 * Proof that it always works is still to be provided
 * Exact conf is to be adjusted
 */

(function(){

  var selectTotal = function(mainOp, difficulty){
    var rng = new Phaser.RandomDataGenerator([Math.random()]);
    switch (mainOp){
      case globals.ops.add:
        return rng.integerInRange(settings.levelGenerator.add[difficulty], settings.levelGenerator.add[difficulty+1]);
        break;
      case globals.ops.sub:
        return rng.integerInRange(settings.levelGenerator.sub[difficulty], settings.levelGenerator.sub[difficulty+1]);
        break;
    }
  };
// change to total, minValue, nbSolutions, maxPairs
  var generatePairs = function(total, mainOp, difficulty, maxPairs){
    var maxSolutions = 5 - difficulty;
    var pairs = [];
    var numbers = [];
    //get basic pairs
    var values = [];
    for(var i = 1; i < Math.floor(total/2); i++){
      values.push(i);
    }
    values = _.shuffle(values);
    var j = 0;
    // select some of them
    while(pairs.length < maxPairs - maxSolutions && j<values.length){
      var number1 = values[j];
      var number2 = total - number1;
      if(number2 < 100) {
        numbers.push(number1);
        numbers.push(number2);
        pairs.push({
          op: globals.ops.add,
          val: [number1, number2]
        });
      }
      j++;
    }
    //add solutions
    var k = 0;
    while(k < maxSolutions){
      //TODO NOT ONLY COPY
      var solution = pairs[k];
      pairs.push({
        op: solution.op,
        val: [solution.val[0], solution.val[1]]
      });
      k++;
    }
    return pairs;
  };

  window.levelGenerator = {
    generate: function(mainOp, difficulty, maxPairs){
      var total = selectTotal(mainOp, difficulty);
      return generatePairs(total, mainOp, difficulty, maxPairs);
    }
  }
})();