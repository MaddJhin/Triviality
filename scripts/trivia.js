function trivia(prompt, askA, askB, askC, askD, answer){
    this.question = prompt;
    this.optionA = askA;
    this.optionB = askB;
    this.optionC = askC;
    this.optionD = askD;
    this.correctAnswer = answer;
}

var testQuestion = new trivia("What Is the Best Game", "Destiny", "Overwatch", "HotS", "Warframe", 1);
var testQuestion2 = new trivia("Where Am I?", "Here", "There", "Nowhere", "Everywhere", 2);
var testQuestion3 = new trivia("Objects are: ", "Confusing", "Awesome", "What?", "Meh", 3);

var triviaArray = [
    testQuestion,
    testQuestion2,
    testQuestion3
]

// Select a random question
function SelectTrivia(questionBank) {
    var randIndex = Math.floor(Math.random() * questionBank.length);
    return questionBank[randIndex];
}

function SetOptions(aTrivia) {
    console.log("Option A", aTrivia.optionA);
    console.log("Option B", aTrivia.optionB);
    console.log("Option C", aTrivia.optionC);
    console.log("Option D", aTrivia.optionD);
}

function AskTrivia(questionBank){
    var currentTrivia = SelectTrivia(questionBank);
    console.log('Current Trivia', currentTrivia);
    console.log("Question", currentTrivia.question);

    SetOptions(currentTrivia);
}

