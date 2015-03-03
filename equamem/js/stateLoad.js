/**
 * Created by Adrien on 04/02/2015.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
/**
 * Created by Adrien on 09/09/2014.
 */
var stateLoad = {
  preload: function () {
// Add a 'loading...' label on the screen
    var loadingLabel = game.add.text(game.world.centerX, 250, 'loading...',
      { font: '30px Raleway', fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    var progressBar = game.add.sprite(game.world.centerX - 130, 300, 'progressBarEmpty');
    progressBar.scale.x = 2;
// Display the progress bar
    var progressBar = game.add.sprite(game.world.centerX - 130, 300, 'progressBar');
    progressBar.scale.x = 2;
    progressBar.anchor.setTo(0, 0.5);
    game.load.setPreloadSprite(progressBar);

    /************************/
    /* LOADING GENERIC ASSETS */
    /************************/

    //loading interface
    game.load.spritesheet('background', 'assets/background.png', 640, 1120, 1);
    game.load.spritesheet('helpimages', 'assets/helpimages.png', 400, 125, 5);
    game.load.spritesheet('mask', 'assets/mask.png', 640, 1120, 1);
    game.load.spritesheet('messagebox', 'assets/messagebox.png', 600, 600, 1);

    game.load.spritesheet('help', 'assets/ui/help.png', 160, 160, 1);
    game.load.spritesheet('levelhelp', 'assets/ui/levelhelp.png', 160, 160, 1);
    game.load.spritesheet('home', 'assets/ui/home.png', 160, 160, 1);
    game.load.spritesheet('progressbar', 'assets/ui/progressbar.png', 160, 40, 10);
    game.load.spritesheet('hand', 'assets/ui/hand.png', 128, 128, 1);
    game.load.spritesheet('playstop', 'assets/ui/playstop.png', 160, 160, 2);
    game.load.spritesheet('checkmark', 'assets/ui/checkmark.png', 640, 120, 2);

    // loading animals
    game.load.spritesheet('animal', 'assets/animals/bird.png', 128, 128, 4);
    game.load.image('bird', 'assets/animals/bird.png');
    game.load.image('bull', 'assets/animals/bull.png');
    game.load.image('cat', 'assets/animals/cat.png');
    game.load.image('cow', 'assets/animals/cow.png');
    game.load.image('dog', 'assets/animals/dog.png');
    game.load.image('duck', 'assets/animals/duck.png');
    game.load.image('elephant', 'assets/animals/elephant.png');
    game.load.image('fish', 'assets/animals/fish.png');
    game.load.image('horse', 'assets/animals/horse.png');
    game.load.image('ladybug', 'assets/animals/ladybug.png');
    game.load.image('leopard', 'assets/animals/leopard.png');
    game.load.image('lion', 'assets/animals/lion.png');
    game.load.image('lobster', 'assets/animals/lobster.png');
    game.load.image('rabbit', 'assets/animals/rabbit.png');
    game.load.image('snail', 'assets/animals/snail.png');
    game.load.image('turtle', 'assets/animals/turtle.png');

    game.load.image(globals.ops.add, "assets/cards/add.png");
    game.load.image(globals.ops.mult, "assets/cards/mult.png");
    game.load.image(globals.ops.sub, "assets/cards/sub.png");
    game.load.image(globals.ops.div, "assets/cards/div.png");
    game.load.image('selected', "assets/cards/selected.png");
    game.load.spritesheet('selectable', 'assets/cards/selectable.png', 128, 128, 1);


    // loading datas
    //old levels
    //game.load.script('levels', 'js/level/levelsData.js');
    // sample new levels until generation complete
    game.load.script('levelsExample', 'js/level/levelsExample.js');
    game.load.script('messages', 'js/i18n/languages/' + settings.messageLanguage + '.js');
  },
  create: function () {
    game.state.start('game');
  }
};