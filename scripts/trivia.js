$( document ).ready(function() {
    
    function trivia(prompt, askA, askB, askC, askD, answer){
        this.question = prompt;
        this.answers = [
            askA,
            askB,
            askC,
            askD,
        ],
        this.answerIndex = answer - 1;

        this.GetAnswer = function(){
            return this.answers[this.answerIndex];
        };
    }

    var testQuestion = new trivia("What Is the Best Game", "Destiny", "Overwatch", "HotS", "Warframe", 1);
    var testQuestion2 = new trivia("Where Am I?", "Here", "There", "Nowhere", "Everywhere", 2);
    var testQuestion3 = new trivia("Objects are: ", "Confusing", "Awesome", "What?", "Meh", 3);

    var q1 = new trivia("Eddie Valiant is a character in which animated film?", "Peter Pan", "Cinderella", "Who Framed Roger Rabbit", "Cars", 3)
    var q2 = new trivia("Who starred in the title role of Sydney Pollack's 1972 film \"Jeremiah Johnson?\"", "Steve McQueen", "Marlon Brando", "Robert Redford", "Paul Newman", 3)
    var q3 = new trivia("In \"Casino Royale\", who took over the role of James Bond?", "Daniel Craig", "Jeffrey Wright", "Bruce Willis", "Mike Meyers", 1)
    var q4 = new trivia("In 2010's \"Red,\" where do the main characters want to break into?", "CIA Headquarters", "FBI Headquarters", "The Pentagon", "The White House", 1)
    var q5 = new trivia("What was the name of Sam Peckinpah's 1978 trucker with CB-radio movie?", "Hooper", "White Lightening", "Breaker! Breaker!", "Convoy", 4)
    var q6 = new trivia("What was the first movie that co-starred Humphrey Bogart and Lauren Bacall?", "Dark Passage", "Key Largo", "To Have and Have Not", "The Big Sleep", 3)
    var q7 = new trivia("What movie had the tagline: Revenge is a dish best served cold.", "Kill Bill: Vol. 2", "Spider-Man 2", "Crash ", "Shrek 2", 1)
    var q8 = new trivia("What film had this line: \"Do you really think you have a chance against us, Mister Cowboy?\"", "The Princess Bride", "Top Gun", "Batman", "Die Hard", 4)
    var q9 = new trivia("Who played the part of Edward Cullen in the \"Twilight\" movie series?", "Taylor Lautner", "Peter Facinelli", "Michael Sheen", "Robert Pattinson", 4)
    var q10 = new trivia("In \"Anchorman 2: The Legend Continues\", what is the name of Ron's wife?", "Veronica", "Meagan", "Linda", "Chani", 1)
    var q11 = new trivia("Which of the following film directors never won an Academy Award for Best Director?", "Robert Zemeckis", "Steven Spielberg", "Stanley Kubrick", "Francis Ford Coppola", 3)
    var q12 = new trivia("Cheech Marin and Tommy Chong's first film together was what 1978 stoner flick?", "Things Are Tough All Over", "The Boys From Brazil", "Nice Dreams", "Up in Smoke", 4)
    var q13 = new trivia("Who played Tony Stark in \"Iron Man\"?", "Jeff Bridges", "John Goldman", "Robert Downey, Jr.", "Toby McGuire", 3)
    var q14 = new trivia("In \"Paranormal Activity 2,\" who is supposedly trying to steal her nephew Hunter?", "Susie", "Katie", "Shelly", "Stephanie", 2)
    var q15 = new trivia("What Oscar-winning actress starred in 2001's \"Lara Croft: Tomb Raider\"? ", "Angelina Jolie", "Charlize Theron", "Susan Sarandon", "Halle Berry", 1)
    var q16 = new trivia("What was Humphrey Bogart's character named in \"The Maltese Falcon\"?", "Philip Marlowe", "Charlie Allnut", "Sam Spade", "Harry Morgan",3)

    var questionBank = [
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
        q11,
        q12,
        q13,
        q14,
        q15,
        q16
    ];

    // Variables used for initializing and resetting after changes
    var startingQuestions = 10;
    var questionInterval = 20;
    var resultInterval = 5;
    var right = 0;
    var wrong = 0;

    // Variables used for tracking changes
    var remainingQuestions = startingQuestions;
    var count;
    var timer;
    var currentTrivia;

    // API Request Variables
    var key = "793386d43c174b9aac620baf8736bae5";
    var search = "win";
    var search2 = "lose";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=" + key;
    var queryURL2 = "http://api.giphy.com/v1/gifs/search?q="+search2+"&api_key=" + key;
    
    var winURL = [];
    var loseURL = [];

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
            var button = $('<button type="button"  class="btn btn-info btn-block"></button>');
            button.html("<p>" + currentTrivia.answers[i] + "</p>");

            // If the answer's index matches the correct answers index
            if ((currentTrivia.answerIndex) == i){
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

        // Empty question field of previous questions and add the new question
        $('#question').empty().append("<h3>" + currentTrivia.question + "</h3>");

        // Set the new options based on current trivia
        SetOptions(currentTrivia);

        // Start interval with global variable
        $('#timer').html("Time Remaining: " + count + " seconds");
        timer = setInterval(Countdown, 1000);
    }

    function TimeUp() {
        // Tell Player the time is up
        clearInterval(timer);
        ClearOptions();
        console.log("Time's Up!!!");
        $('#timer').html("TIMES UP!");

        // Tell the player the right answer
        var correctAnswer = currentTrivia.GetAnswer();
        $("#question").html("<h2>The Correct Answer Was" + correctAnswer+"</h2>");
        console.log("The Correct Answer Was", correctAnswer);

        // Display next Question after a few seconds if more questions remain
        Continue();
    }

    function CorrectAnswer() {
        right++;
        // Stop Countdown Timer and clear options
        clearInterval(timer);
        ClearOptions();
        $('#timer').html("");

        // Congratulate Player
        $("#question").html("<h2>Congratulations!!! That's Correct!</h2>");
        console.log("Congratulations!!! That's Correct!");
        ShowGif(true);

        // Display next Question after a few seconds if more questions remain
        setTimeout(Continue, resultInterval * 1000);
    }

    function WrongAnswer() {
        wrong++;
        // Stop Countdown Timer and clear options
        clearInterval(timer);
        ClearOptions();
        $('#timer').html("");    

        // Show correct correct answer
        var correctAnswer = currentTrivia.GetAnswer();
        console.log("The Correct Answer Was", correctAnswer);

        // Tell Player They Chose Wrong
        $("#question").html("<h2>That's Wrong. The Correct Answer Was: " + correctAnswer + "</h2>");
        ShowGif(false);

        // Display next Question after a few seconds if more questions remain
        setTimeout(Continue, resultInterval * 1000);
    }

    function ClearOptions(){
        // Clear button answers
        $('#options').empty();
    }

    function Countdown(){
        count--;
        console.log(count);
        $('#timer').html("Time Remaining: " + count + " seconds");
        
        if (count <= 0){
            // Times Up!
            console.log("Times UP!");
            TimeUp();
        }
    }

    function Start(){
        // Reset all starting variables
        remainingQuestions = startingQuestions;
        right = 0;
        wrong = 0;
        AskTrivia();
        $('#results').hide();
    }

    function EndTrivia(){
        console.log("Trivia Over");
        $('#btn-start').show();
        $('#results').show();

        $("#question").html("<h2>That's All Folks</h2>");
        $('#results').empty()
            .append("<h3>Correct Guesses: " + right + "</h3><br>")
            .append("<h3>Incorrect Guesses: " + wrong + "</h3>");

    }

    function Continue(){
        $('#results').hide();
        if(remainingQuestions > 0) {
            AskTrivia();
        }
        else{
            console.log("Ending Trivia");
            EndTrivia();
        }
    }

    function ShowGif(win) {
        var randIndex = Math.floor(Math.random() * loseURL.length);
        if(win == true){
            $('#results')
                .show()
                .empty()
                .append('<iframe src="'+winURL[randIndex]+'" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>via GIPHY</p>');
        }
        else{
            $('#results')
            .show()
            .empty()
            .append('<iframe src="'+loseURL[randIndex]+'" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>via GIPHY</p>');
        }
    }
    // CODE START

    $('#results').hide();
    $('#btn-start').on("click", function() {
        Start();
        $(this).hide();
        console.log("Starting Trivia!!!");
    });

    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            winURL.push(response.data[i].embed_url);
        }
        console.log(winURL);
    });

    $.ajax({
        url: queryURL2,
        method: "GET"
      }).done(function(response) {
        var randomIndex = Math.floor(Math.random() * response.data.length);
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            loseURL.push(response.data[i].embed_url);

        }
    });
});
