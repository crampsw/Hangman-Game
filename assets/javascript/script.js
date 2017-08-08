var hangmanGame = {
	
	// Set the variables for the game
	
	//Counters
	winCount:0,
	guessCount:12,
	letterCount:0,
	blankCount:0,
	
	//Words go here!
	wordList:["test", "the", "game", "array"],
	
	//working variables
	lettersGuessed:[],
	activeWord:"",
	activeLetter: "",
	activeArray:[],
	victoryState: false,
	guessState: false,
	
	//define element ids within the object
	
	win_count: document.getElementById("win-count"),
	active_word: document.getElementById("word"),
	guess_count: document.getElementById("guess-count"),
	guess_letters: document.getElementById("guess-letters"),
	
	//Functions!
	
	//starts a new game by setting the word from the list and initializing the variables
	setWord: function() {
		
		//gets your word
		this.activeWord = this.wordList[(Math.floor(Math.random() * hangmanGame.wordList.length))].toUpperCase();
		
		//updates variables
		this.guessCount = 12;
		console.log(this.guessCount);
		this.lettersGuessed = [];
		console.log(this.lettersGuessed);
		this.activeArray = [];
		console.log(this.activeArray);
		this.victoryState = false;
		console.log(this.victoryState);
		
		//updates html for everything
		this.win_count.innerHTML = this.winCount;
		this.guess_count.innerHTML =  this.guessCount;
		this.guess_letters.innerHTML = "";
		this.active_word.innerHTML = "";
		
		//loop to generate the html and array for the word, and set the counter for blanks
		for(i = 0; i < this.activeWord.length; i++) {
			this.activeArray.push("-");
			this.active_word.innerHTML = this.active_word.innerHTML + "-";
			this.blankCount++;
		}
		console.log("activeArray is: " + this.activeArray)
		console.log("blankCount is: " + this.blankCount)	
	},
	
	//function to house control flow for the game and handle keypress events
	guess: function(event) {
		//checks the letter (thanks Google!), sets it as a variable, and resets the guess state
		if (event.keyCode > 64 && event.keyCode < 91 && this.victoryState == false){
			this.activeLetter = String.fromCharCode(event.keyCode);
			this.guessState = true;
			//checks if the key pressed is in the array, and if it isn't, pushes it to the guess array
			if(jQuery.inArray(this.activeLetter,this.lettersGuessed) === -1) {
				this.lettersGuessed.push(this.activeLetter);
				this.guess_letters.innerHTML = this.lettersGuessed;
				this.guessState = false;
			}
			//resets the count used for the loop and the HTML for the word display, loops through the word to add the letter to the active word array
			this.active_word.innerHTML = "";
			this.letterCount = 0;
			for(i = 0; i < this.activeWord.length; i++) {
				if(this.activeLetter == this.activeWord[i] && this.guessState == false) {
					this.activeArray[i] = this.activeLetter;
					this.letterCount++;
					this.blankCount--;
				}
				this.active_word.innerHTML = this.active_word.innerHTML + this.activeArray[i];
			}
			//Checks for wrong guesses
			if(this.letterCount == 0 && this.guessCount > 0 && this.guessState == false && this.victoryState == false) {
				this.guessCount--;
				this.guess_count.innerHTML = this.guessCount;
			}
			// Checks for a loss and resets the game
			if (this.guessCount == 0) {
				this.active_word.innerHTML = this.activeWord;
				alert("Hey loser, the word was " + this.activeWord)
				this.setWord();
			}
			// checks for a win and resets the game
			if(this.blankCount == 0 && this.victoryState == false) {
				this.victoryState = true;
				this.winCount++;
				this.win_count.innerHTML = this.winCount;
				this.setWord();
			}
		}
	},
	
}

hangmanGame.setWord();
document.onkeyup = function(event) {
	hangmanGame.guess(event);
}


