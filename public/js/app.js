//OAUTH Flow
let fieldset = document.getElementById("inputfield");
let followgate = document.getElementById("followgate");
let followButton = document.getElementById('follow-on-spotify');
let conditions = document.getElementById('conditions');

//for development set to http://localhost:8888
const address = 'https://streamlineplaylists.com';

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// app's client ID, redirect URI and desired scopes
const clientId = 'cefb70f60e364197b8a7e63b7d6836d9';
const redirectUri = address;
const scopes = ['user-follow-modify'];

if(!_token){

// Initialize Firebase(2)
var config = {
    apiKey: "AIzaSyC4cgRYmCvZ2nF13w8ldywDFqt6Bl9bcSc",
    authDomain: "submit-form-a1ddb.firebaseapp.com",
    databaseURL: "https://submit-form-a1ddb.firebaseio.com",
    projectId: "submit-form-a1ddb",
    storageBucket: "submit-form-a1ddb.appspot.com",
    messagingSenderId: "334084228682",
    appId: "1:334084228682:web:cc597e62eafd822f5288b3"
  };
  firebase.initializeApp(config);
  
  //Reference for form collection(3)
  let formMessage = firebase.database().ref('submissions');
  
  //listen for submit event//(1)
  document
    .getElementById('submit')
    .onclick = formSubmit;
  
  //Submit form(1.2)
  function formSubmit(e) {
    e.preventDefault();
    // Get Values from the DOM
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let songtitle = document.querySelector('#songtitle').value;
    let songlink = document.querySelector('#songlink').value;
    let playlist = document.querySelector('#playlist').value;
    let comment = document.querySelector('#comment').value;

    //send message values
    sendMessage(name, email, songtitle, songlink, playlist, comment);

    fieldset.style.display = 'none';
    followgate.style.display = 'block';

    //on button click, redirect to spotify
    followButton.onclick = function(){
      location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }
  }
  
  //Send Message to Firebase(4)
  function sendMessage(name, email, songtitle, songlink, playlist, comment) {
    let newFormMessage = formMessage.child(name);
    newFormMessage.set({
      name: name,
      email: email,
      songtitle: songtitle,
      songlink: songlink,
      playlist: playlist,
      comment: comment
    });
  }
}
else{
  //follow Alkii
  $.ajax('https://api.spotify.com/v1/me/following?ids=5MRJxra716OikPLc6QDasc&type=artist', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });

  //follow Travel Vibes
  $.ajax('https://api.spotify.com/v1/playlists/1jT9tW5vP9ItyDMI87zlYC/followers', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });

  //follow Uptown Funk 
  $.ajax('https://api.spotify.com/v1/playlists/2TOjITv2vhf5CRJWIVRenC/followers', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });

  //follow Sad Suburbians 
  $.ajax('https://api.spotify.com/v1/playlists/6opVwvjJ3xMDa0kttdH6O3/followers', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });

  //follow DAYGER
  $.ajax('https://api.spotify.com/v1/playlists/7dmSQZmK507Oxnx04KNz2b/followers', {
                    headers: {Authorization: 'Bearer ' + _token},
                    method: 'PUT'
  });

  //Show Alert Message(5)
  document.querySelector('.alert').style.display = 'block';
  
  //Hide Alert Message After Seven Seconds(6) & Refresh Page
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
    location.href = address;
  }, 7000);
}