$("document").ready(function() {    

    // set the text using the amount of strokes
    $("#congratsHeader").text("Congratulations! You completed all the levels in " + sessionStorage.getItem("strokes") + " strokes!")

    // bind on click event to close X of submit modal
    $("#modalClose").click(function() {
        $("#myModal").css("display", "none");
    });

    // bind on click event to yes/no buttons
    $("#submitYes").click(loadSubmitForm);
    $("#submitNo").click(returnHome);

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

// load the submit form
function loadSubmitForm() {
    $(".modal").css("display", "block");
}

// return to start page without submitting score and clearing session storage
function returnHome() {
    sessionStorage.removeItem("strokes");
    sessionStorage.removeItem("level");
    location = "index.html";
}

// function for submitting the score
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

    sessionStorage.removeItem("strokes");
}

// function to retrieve and display top 5 high scores
function GetHighScores() {

    // retrive all the top 5 scores
    database.ref("/entries/").orderByChild('score').limitToFirst(5).once('value').then(function(snapshot) {
        // loop through all entries
        snapshot.forEach(function(snap) {
            // setup new paragraphs and assign it's text from the database
            var entry = $("<tr></tr>");
            var nameCell = $("<td></td>").text(snap.val().name);
            var scoreCell = $("<td></td>").text(snap.val().score);
            entry.append(nameCell);
            entry.append(scoreCell);
            // append p tag to the div
            $("tbody").append(entry);
        });
    });
}