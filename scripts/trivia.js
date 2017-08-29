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

var triviaArray = [
    testQuestion,
    testQuestion2,
    testQuestion3
]

var remainingQuestions = 3;
var timer;

// Select a random question
function SelectTrivia(questionBank) {
    var randIndex = Math.floor(Math.random() * questionBank.length);
    return questionBank[randIndex];
}

function SetOptions(aTrivia) {
    console.log("Option A", aTrivia.answers[0]);
    console.log("Option B", aTrivia.answers[1]);
    console.log("Option C", aTrivia.answers[2]);
    console.log("Option D", aTrivia.answers[3]);
}

function AskTrivia(questionBank){
    // Reduce Remaining Questions
    remainingQuestions--;
    console.log('Questions Remaining', remainingQuestions);

    var currentTrivia = SelectTrivia(questionBank);
    console.log("Question", currentTrivia.question);

    SetOptions(currentTrivia);
    timer = setTimeout(function() {TimeUp(currentTrivia);}, 3 * 1000);
}

function TimeUp(currentQuestion) {
    // Tell Player the time is up
    console.log("Time's Up!!!");

    // Tell the player the right answer
    var correctAnswer = currentQuestion.GetAnswer();
    console.log("The Correct Answer Was", correctAnswer);

    // Display next Question after a few seconds if more questions remain
    if(remainingQuestions > 0) {
        setTimeout(AskTrivia(triviaArray), 3 * 1000);
    }
}

function CorrectAnswer() {
    // Congratulate Player
    console.log("Congratulations!!! That's Correct!");

    // Display next Question after a few seconds if more questions remain
    if(remainingQuestions > 0) {
        setTimeout(AskTrivia(triviaArray), 3 * 1000);
    }
}

function WrongAnswer(currentQuestion) {
    // Tell Player They Chose Wrong
    console.log("Boooo!!! That's Wrong");

    // Show correct answer
    var correctAnswer = currentQuestion.GetAnswer();
    console.log("The Correct Answer Was", correctAnswer);

    // Display next Question after a few seconds if more questions remain
    if(remainingQuestions > 0) {
        setTimeout(AskTrivia(triviaArray), 3 * 1000);
    }
}


