var firebaseConfig = {
    apiKey: "AIzaSyB3UtHiVvXhHhPzjTYssFK5ZaNIRh7w3zk",
    authDomain: "minigolfgame-42068.firebaseapp.com",
    databaseURL: "https://minigolfgame-42068.firebaseio.com",
    projectId: "minigolfgame-42068",
    storageBucket: "minigolfgame-42068.appspot.com",
    messagingSenderId: "996047100763",
    appId: "1:996047100763:web:ec02d4c90c518e7898187e"
  };

var fb = firebase.initializeApp(firebaseConfig);

var database = fb.database();

async function SubmitScore(userName) {
    var entries = database.ref("/entries/");
    var newEntry = entries.push();
    await newEntry.set({
        name: userName,
        score: localStorage.getItem("strokes")
    });

    localStorage.removeItem("strokes");
}

function GetHighScores() {
    var highScores = [];
    database.ref("/entries/").once('value').then(function(snapshot) {
        snapshot.forEach(function(snap) {
            highScores.push(snap.val());
        });
    });
    
    var name = highScores["name"];
    var score = highScores["score"];

    console.log(highScores);
}