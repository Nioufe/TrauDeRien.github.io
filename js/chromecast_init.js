/**
 * Created by atrau_000 on 02/05/2014.
 */
//attend que l'api soit prete
var applicationID = '748BE0DE';
var session;

window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
  if (loaded) {
    initializeCastApi();
  } else {
    console.log(errorInfo);
  }
}

initializeCastApi = function() {
  console.log('initCastApi');
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);

  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  document.getElementById('init').addEventListener('click', function(){
    initSession();
  })
};

//verifie que des devices sont disponibles
function receiverListener(e) {
  if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {
  }
}
//gestion des sessions
function sessionListener(e) {
  session = e;
  if (session.media.length != 0) {
    onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
  }
}
function initSession() {
  console.log('initSession');
  chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
}

function onRequestSessionSuccess(e) {
  session = e;
}

function onLaunchError(){
  console.log('erreur initialisation session')
}

function onInitSuccess(){
  console.log('initSuccess');
}
function onError(){
  console.log('init error');
}