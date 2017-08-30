function trivia(prompt, askA, askB, askC, askD, answer){
    this.question = prompt;
    this.answers = [
        askA,
        askB,
        askC,
        askD,
    ],
    this.answerIndex = answer;

    this.GetAnswer = function(){
        return this.answers[this.answerIndex];
    };
}

var testQuestion = new trivia("What Is the Best Game", "Destiny", "Overwatch", "HotS", "Warframe", 1);
var testQuestion2 = new trivia("Where Am I?", "Here", "There", "Nowhere", "Everywhere", 2);
var testQuestion3 = new trivia("Objects are: ", "Confusing", "Awesome", "What?", "Meh", 3);

var questionBank = [
    testQuestion,
    testQuestion2,
    testQuestion3
]

// Variables used for initializing and resetting after changes
var remainingQuestions = 3;
var questionInterval = 15;
var resultInterval = 5;

// Variables used for tracking changes
var count = questionInterval;
var timer;
var currentTrivia;

// Select a random question
function SelectTrivia() {
    var randIndex = Math.floor(Math.random() * questionBank.length);
    return questionBank[randIndex];
}

function SetOptions() {
    // Set each possible answer to a button
    for(var i = 0; i < currentTrivia.answers.length; i++){
        console.log("Adding Option", currentTrivia.answers[i]);

        // Make a new button with text for the answer at the current index
        var button = $('<button></button>');
        button.html("<p>" + currentTrivia.answers[i] + "</p>");

        // If the answer's index matches the correct answers index
        if (currentTrivia.answerIndex == i){
            // On Click trigger correct answer
            button.on("click", function () {
                console.log("Right Button Clicked!");
                CorrectAnswer();
            });
        }
        else{
            // On Click trigger wrong answer
            button.on("click", function () {
                console.log("Wrong Button Clicked!");
                WrongAnswer();
            });
        }

        // Attach button to options id div
        $('#options').append(button);
    }
}

function AskTrivia(){
    // Reduce Remaining Questions
    remainingQuestions--;
    count = questionInterval;
    console.log('Questions Remaining', remainingQuestions);

    currentTrivia = SelectTrivia();
    console.log("Current Question", currentTrivia.question);

    // Empty question field of previous quesions and add the new question
    $('#question').empty().append(currentTrivia.question);

    // Set the new options based on current trivia
    SetOptions(currentTrivia);

    // Start interval with global variable
    timer = setInterval(Countdown, 1000);
}

function TimeUp() {
    // Tell Player the time is up
    clearInterval(timer);
    ClearOptions();
    console.log("Time's Up!!!");

    // Tell the player the right answer
    var correctAnswer = currentTrivia.GetAnswer();
    $("#question").html("The Correct Answer Was" + correctAnswer);
    console.log("The Correct Answer Was", correctAnswer);

    // Display next Question after a few seconds if more questions remain
    if(remainingQuestions > 0) {
        setTimeout(AskTrivia, resultInterval * 1000);
        console.log("New question in ", resultInterval);
    }
}

function CorrectAnswer() {
    // Stop Countdown Timer and clear options
    clearInterval(timer);
    ClearOptions();

    // Congratulate Player
    $("#question").html("Congratulations!!! That's Correct!");
    console.log("Congratulations!!! That's Correct!");


    // Display next Question after a few seconds if more questions remain
    if(remainingQuestions > 0) {
        setTimeout(AskTrivia, resultInterval * 1000);
    }
}

function WrongAnswer() {
    // Stop Countdown Timer and clear options
    clearInterval(timer);
    ClearOptions();
    
    // Tell Player They Chose Wrong
    $("#question").html("Boooo!!! That's Wrong");
    console.log("Boooo!!! That's Wrong");

    // Show correct correct answer
    var correctAnswer = currentTrivia.GetAnswer();
    console.log("The Correct Answer Was", correctAnswer);

    // Display next Question after a few seconds if more questions remain
    if(remainingQuestions > 0) {
        setTimeout(AskTrivia, resultInterval * 1000);
    }
}

function ClearOptions(){
    // Clear button answers
    $('#options').empty();
}

function Countdown(){
    count--;
    if (count <= 0){
        // Times Up!
        console.log("Times UP!");
        TimeUp();
    }

    // TO DO: 
    // Display current time 
    console.log(count);
}

