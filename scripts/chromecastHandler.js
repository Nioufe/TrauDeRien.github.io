/**
 * Created by Adrien on 09/06/14.
 */
cast.receiver.logger.setLevelValue(0);
window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
console.log('Starting Receiver Manager');

// handler for the 'ready' event
castReceiverManager.onReady = function(event) {
  console.log('Received Ready event: ' + JSON.stringify(event.data));
  window.castReceiverManager.setApplicationState("Application status is ready...");
};

// handler for 'senderconnected' event
castReceiverManager.onSenderConnected = function(event) {
  console.log('Received Sender Connected event: ' + event.data);
  console.log(window.castReceiverManager.getSender(event.data).userAgent);
};

// handler for 'senderdisconnected' event
castReceiverManager.onSenderDisconnected = function(event) {
  console.log('Received Sender Disconnected event: ' + event.data);
  if (window.castReceiverManager.getSenders().length == 0) {
    window.close();
  }
};

// create a CastMessageBus to handle messages for a custom namespace
window.messageBus =
  window.castReceiverManager.getCastMessageBus(
    'urn:x-cast:com.google.cast.jukeit.playlist');

// handler for the CastMessageBus message event
window.messageBus.onMessage = function(event) {
  console.log('Message [' + event.senderId + ']: ' + event.data);
  var message = JSON.parse(event.data);
  if(message.type === 'START_CHROMECAST'){
    //init event
    Event.init(message.content.name);
    if(typeof message.content.messages !== 'undefined' && message.content.messages!==null){
      var messagesList =  message.content.messages;
      for(index in messagesList){
        addMessage(messagesList[index].author, messagesList[index].content);
      }
    }
    Proposition.updateUI();
  } else if(message.type == 'ADD_PROPOSAL'){
    // new proposal
    Proposition.update(message.content);
    Proposition.updateUI();
  } else if(message.type == 'READ_SONG'){
    Song.start(message.song, message.message, message.author);
    Proposition.remove(message.song);
    Proposition.updateUI();
  } else if(message.type =='ADD_MESSAGE'){
    addMessage(message.author, message.content);
  }
}

// initialize the CastReceiverManager with an application status message
window.castReceiverManager.start({statusText: "Application is starting"});
console.log('Receiver Manager started');