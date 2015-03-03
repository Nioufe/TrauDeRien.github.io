/**
 * Created by Adrien on 06/02/2015.
 */
(function(){
  var totalText;
  window.UI = {
    init: function(total){
      var sumStyle = {font: "112px Pericles", fill: "#fff", align: "center"};
      totalText = game.add.text(80, 80, "", sumStyle);
      totalText.anchor.set(0.5);
      totalText.stroke = '#000000';
      totalText.strokeThickness = 5;
      totalText.text = total;
    }
  }
})();