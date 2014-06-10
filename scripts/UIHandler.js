/**
 * Created by Adrien on 09/06/14.
 */
var messageContainer = $('.messageContainer');
var topTitleElement = $('.topTitle');
var botTitleElement = $('.bottomTitle');
var propositionnerDiv = $('.propositionner');
var middleImg = $('.middle img');
var propositionsDivs = $('.futur .col-md-1 img');
var eventTitle= $('.eventTitle');
function addMessage(author, content){
  var divMessage = $(document.createElement('div')).addClass('messageWrapper');
  var authorMessage= $(document.createElement('p')).addClass('titleSmall titleMessage').text(author);
  var contentMessage = $(document.createElement('p')).addClass('directMessage').text(content);
  divMessage.append(authorMessage).append(contentMessage);
  messageContainer.prepend(divMessage);
  divMessage.show();
};

function scrollTitle(){
  $(function() {
    var scroll_text;
    var $elmt = $('.titleContainer');
    scroll_text = setInterval(function() {
      $elmt.each(function(){
        scrollText(this);
      });
    }, 100);
  }, function() {
    clearInterval(scroll_text);
    $(".titleH1", this).css({
      left: 0
    });
  });

  var scrollText = function($elmt) {
    var h1 = $(".titleH1", $elmt),
      width = h1.width(),
      left = h1.position().left - 2,
      titleWidth = $('.titleSpan', $elmt).width();
    if(width<titleWidth){
      left = -left > titleWidth ? width : left;
      h1.css({
        left: left
      });
    }
  };
};
var Song = {
    top: function topTitle(title, artist, album){
        topTitleElement.text(title + ' - ' + artist + ' - ' +  album);
      },
    bot: function botTitle(message){
      botTitleElement.text(message);
    },
    propose: function(propositionner){
      propositionnerDiv.text(propositionner);
    },
    cover: function(url){
      middleImg.attr('src', url + '?size=big');
    },
    start: function(song, message, propositionner){
      Song.top(song.title, song.artist, song.album);
      Song.bot(message);
      Song.propose(propositionner);
      Song.cover(song.cover);
    }};
function shuffle(array) {
  var counter = array.length, temp, index;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
var Proposition = {
  propositions: [
    'https://api.deezer.com/album/302127/image',
    'https://api.deezer.com/album/302127/image',
    'https://api.deezer.com/album/302127/image',
    'https://api.deezer.com/album/302127/image',
    'https://api.deezer.com/album/302127/image',
    'https://api.deezer.com/album/7079247/image',
    'https://api.deezer.com/album/7079247/image',
    'https://api.deezer.com/album/7079247/image'
  ],
  init : function(propositions){
    Proposition.propositions = propositions;
  },
  update : function(proposition){
    Proposition.propositions.push(proposition);
  },
  remove : function(proposition) {
    for(var index in Proposition.propositions){
      if(Proposition.propositions[index] === proposition){
        Proposition.propositions.splice(index, 1);
      }
    }
  },
  updateUI : function(){
    var index;
    if(Proposition.propositions.length <= 12){
      for (index in Proposition.propositions) {
        $(propositionsDivs[index]).attr('src', Proposition.propositions[index]);
      }
      if(Proposition.propositions.length<12){
        index = Proposition.propositions.length -1;
        for(index; index<12; index++){
          $(propositionnerDiv[index]).attr('src', '');
        }
      }
    } else {
      Proposition.propositions = shuffle(Proposition.propositions);
      for(index = 0; index<12; index++){
        $(propositionsDivs[index]).attr('src', Proposition.propositions[index]);
      }
    }
  }
}

var Event = {
  init : function(name){
    $(eventTitle).text(name);
  }
}