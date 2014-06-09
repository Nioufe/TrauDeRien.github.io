/**
 * Created by Adrien on 09/06/14.
 */
var messageContainer = $('.messageContainer');
var topTitle = $('.topTitle');
var botTitle = $('.bottomTitle');
var propositionnerDiv = $('.propositionner');
var middleImg = $('.middle img');


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
        topTitle.text(title + ' - ' + artist + ' - ' +  album);
      },
    bot: function botTitle(message){
      botTitle.text(message);
    },
    propose: function(propositionner){
      propositionnerDiv.text(propositionner);
    },
    cover: function(url){
      middleImg.attr('src', 'https://api.deezer.com/album/7079247/image?size=big');
    },
    start: function(song, message, propositionner){
      Song.top(song.title, song.artist, song.album);
      Song.bot(message);
      Song.propose(propositionner);
      Song.cover(song.cover);
    }};