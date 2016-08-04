var QA = [
	{
		question:"Who wore #24 and #8 on the Los Angeles Lakers?",
		answers: ['Kareem Abdul-Jabbar', "Shaquille O'Neal", 'Kobe Bryant', 'Luke Walton'],
		correct: 'Kobe Bryant',
		image: 'assets/images/kobe.jpg'
	},
	{
		question:"As of 2016, which franchise has the most championships?",
		answers: ['Los Angeles Lakers', 'Chicago Bulls', 'Boston Celtics', 'Golden State Warriors'],
		correct: 'Boston Celtics',
		image: 'assets/images/celtics.jpg'
	},
	{
		question:"Who was the #1 pick from the 2003 NBA Draft?",
		answers: ['Andrew Wiggins', 'Kyrie Irving', 'Anthony Bennett', 'Lebron James'],
		correct: 'Lebron James',
		image: 'assets/images/lebron.jpg'
	},
	{
		question:"Which number did Michael Jordan use when his jersey was stolen?",
		answers: ['#23', '#12', '#45', '#35'],
		correct: '#12',
		image: 'assets/images/jordan.jpg'
	},
	{
		question:"Who was the tallest NBA player to ever play?",
		answers: ['Manute Bol', 'Yao Ming', 'Mugsy Bogues', 'Hakeem Olajuwan'],
		correct: 'Manute Bol',
		image: 'assets/images/manute.jpg'
	},
	{
		question:"Who is the person on the NBA Logo?",
		answers: ['Jerry West', 'Bill Russell', 'Wilt Chamberlain', 'Magic Johnson'],
		correct: 'Jerry West',
		image: 'assets/images/jerry.jpg'
	},
	{
		question:"What was Kareem Abdul-Jabbar's orignal name?",
		answers: ['Lew Alcindor', 'Ron Artest', 'Cassius Marcellus Clay', 'Eldrick Tont Woods'],
		correct: 'Lew Alcindor',
		image: 'assets/images/lew.jpg'
	},
	{
		question:"Which of the following franchises have never won a championship?",
		answers: ['Cleveland Cavaliers', 'Indiana Pacers', 'Milwaukee Bucks', 'Washington Wizards'],
		correct: 'Indiana Pacers',
		image: 'assets/images/pacers.jpg'
	},
	{
		question:"Who made 286 threes in a season, only 2nd to the Stephen Curry's record of 402 threes?",
		answers: ['Ray Allen', 'Reggie Miller', 'Klay Thompson', 'Stephen Curry'],
		correct: 'Stephen Curry',
		image: 'assets/images/curry.jpg'
	},
	{
		question:"Who founded basketball?",
		answers: ['Walter Camp', 'James Creighton', 'James Naismith', 'Abner Doubleday'],
		correct: 'James Naismith',
		image: 'assets/images/james.jpg'
	},
]

var correct = 0; //number of correct answers
var wrong = 0; //number of wrong answers
var unanswered = 0; //number of question not answered
var counter = 0; //displays the question at QA[counter]
var totalSeconds = 24; //absolute amount of seconds per question that can change on difficulty level
var secondsLeft = totalSeconds;
var answerInterval = 4000; //length of how long to display answer
var interval; //global interval to be cleared
var arr; //global array used for any function

//function that calls interval

function questionInterval(){
	if(counter >= QA.length){
				$('#time').html(':00');
				$('#question').html("Let's see how well you did!");
				$('#answers').html(
						'Correct answers: ' + correct +
						'<br>Wrong answers: ' + wrong +
						'<br>Unanswered: ' + unanswered
						);
				$('#images').empty();
				var restartButton = '<button id="restart">Play again</button>';
				$('#main-container').append(restartButton);
				$('#restart').click(function() {
			    	reset();
				});

	}
	else{
		$('#answers').empty();
		displayQA();
		secondsLeft = totalSeconds;
		$('#time').html(':' + secondsLeft);
		interval = setInterval(timer, 1000);
	}
}

//reset all variables to start game over
function reset(){
	correct = 0;
	wrong = 0;
	unanswered = 0;
	counter = 0;
	questionInterval();
	$('#restart').remove();
}

//function that randomizes array
function randomArray(arr){
	var currentIndex = arr.length, temporaryValue, randomIndex;

	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = arr[currentIndex];
	    arr[currentIndex] = arr[randomIndex];
	    arr[randomIndex] = temporaryValue;
	  }

  return arr;
}

//displays timer for each question
function timer(){
    $('#time').html(':' + --secondsLeft);

    if (secondsLeft <= 0)
    {
    	unanswered++;
    	$('#question').html("Time's up! Correct answer is: ");
        displayAnswer();
        clearInterval(interval);
        window.setTimeout(questionInterval, answerInterval);
    }
};

//displays questions
function displayQA(){
	if(counter < QA.length){
		$('#images').empty();
		$('#question').html(QA[counter].question);
		randomArray(QA[counter].answers);
		for (var i = 0; i < QA[counter].answers.length; i++) {
		$('#answers').append('<div class="choices">' + QA[counter].answers[i] + '</div>');
		}
	}
	
}
	

//displays answer after time runs out
function displayAnswer(){
	$('#answers').html('<div id="correct">' + QA[counter].correct + '</div>');
	$('#images').html('<img src="' + QA[counter].image + '">');
	counter++;
}

$(document).ready(function (){
	var startButton = '<button id="start">Start</button>';
	$('#main-container').append(startButton);
	$(document).on('click', '#start', function(){
		$('#start').remove();
		questionInterval();

		$(document).on('click', '.choices', function(){
				if($(this).text() == QA[counter].correct){
					$('#question').html("You are correct!");
					correct++;
				}
				else{
					$('#question').html("Wrong! The correct answer is: ");
					wrong++;
				}
				displayAnswer();
				clearInterval(interval);
				window.setTimeout(questionInterval, answerInterval);

		});
	});
});


//