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

