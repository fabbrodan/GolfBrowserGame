$("document").ready(function() {

    // Bind submit event
    $("#scoreForm").submit(function(event) {
        event.preventDefault();
        let inputs = $("#scoreForm").find(":input");
        let name = inputs[0].value;
        SubmitScore(name).then(() => {
            sessionStorage.removeItem("level");
            location = "index.html";
            }
        );
    });

});

// Setup firebase
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

function loadSubmitForm() {
    $(".modal").css("display", "block");
}

async function SubmitScore(userName) {
    // get base point in firebase
    var entries = database.ref("/entries/");

    // set up a new entry
    var newEntry = entries.push();
    
    // Assign values to new entry
    await newEntry.set({
        name: userName,
        score: Number(sessionStorage.getItem("strokes"))
    });

    localStorage.removeItem("strokes");
}

function GetHighScores() {

    // retrive all the top 5 scores
    database.ref("/entries/").orderByChild('score').limitToFirst(5).once('value').then(function(snapshot) {
        // loop through all entries
        snapshot.forEach(function(snap) {
            // setup new paragraphs and assign it's text from the database
            var entry = $("<p></p>").text(snap.val().name + " - " + snap.val().score);
            // append p tag to the div
            $("#scoreDiv").append(entry);
        });
    });
}