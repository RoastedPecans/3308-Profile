/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions. 
So please sight sources if you took help from any online resource.
*/


//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9. 
Usaged: This is to store the state to the tictactoe board.
When a move is made 
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/* 
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1 

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that 
turn = 1 is for player_1 and 
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param 
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param 
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

function begin_play(){
	// Get all variables we will need from web page
	var player1Name = document.getElementById('player1_id');
	var player2Name = document.getElementById('player2_id');
	var turnText = document.getElementById('turn_info');

	// Before anything else, make sure the game hasn't already started.
	if (game_started()) {
		window.alert("Already started! Press 'Reset Play' to start again.");
		return;
	}

	// Make sure both player name fields have something in them
	if (!isEmpty(player1Name.value) && !isEmpty(player2Name.value)) {

		// Disable inputs and append the symbol each player has to the field
		player1Name.disabled = true;
		player2Name.disabled = true;
		player1Name.value += ' (X)';
		player2Name.value += ' (O)';

		// Make sure game hasn't started already somehow, and if it hasn't start the game
		if (!game_started()) {
			started = true;
		}

		// Update the turn text to show X starts first
		turnText.innerHTML = 'Turn for: <strong>X</strong>';

	}
	// If both player name fields don't have a value, alert user.
	else {
		window.alert("Must enter a name for both players!");
		return;
	}

}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the strated flag as false

*/
function reset_play() {
	var player1Name = document.getElementById('player1_id');
	var player2Name = document.getElementById('player2_id');
	var turnText = document.getElementById('turn_info');
	var turnInput = document.getElementById('move_text_id');

	// Reset text fields
	player1Name.value = '';
	player2Name.value = '';
	turnText.innerHTML = 'Game has not begun.';
	turnInput.value = '';

	// Ensure X is starting
	if (whose_move() != 1) {
		toggle_move();
	}

	// Re-enable player name fields
	player1Name.disabled = false;
	player2Name.disabled = false;

	// Mark game as not started
	started = false;

	// Reset board state even though I didn't end up using it lol
	board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]

	// Reset each cell in game board to default value
	for (var i = 65; i < 68; i++) {
		// Inner table = 1, 2, 3
		for (var j = 1; j < 4; j++) {
			var cellNumber = String.fromCharCode(i) + j.toString();
			document.getElementById(cellNumber).innerHTML = cellNumber;
		}
	}


}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework) 
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/
function play() {
	// Get the element with the turn in it
	var turnInput = document.getElementById('move_text_id');
	// Sanitize input by making it a String, upper casing it, and trimming whitespace
	var turnInputText = turnInput.value.toString().toUpperCase().trim();
	var allowedValues = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];

	// See if we're making an invalid move
	if (allowedValues.indexOf(turnInputText) == -1) {
		window.alert('Invalid Move!');
		return;
	}
	// If valid move...
	else {
		// Make sure game has started...
		if (!game_started()) {
			window.alert("The game has not started.");
			return;
		}

		// Get cell we are playing
		var cellToUpdate = document.getElementById(turnInputText);

		// Make sure cell hasn't already been played
		if (cellToUpdate.innerHTML == 'X' || cellToUpdate.innerHTML == 'O') {
			window.alert("Cannot overwrite previous move loser!");
			return;
		}

		// Get whose turn it is. 1 = player 1, 0 = player 2
		var currentPlayer = whose_move();

		// Based on whos turn it is, update cell with right value
		if (currentPlayer == 1) {
			cellToUpdate.innerHTML = 'X';
		}
		else {
			cellToUpdate.innerHTML = 'O';
		}

		// Check for any winners!
		// Result will hold X, O, or null
		result = checkForWinner();

		if (result != null) {
			window.alert('Winner is: ' + result);
			reset_play();  // Reset play after winner
			return;
		}


		// After making move with no winner, toggle turn and update text
		var turnTextDiv = document.getElementById('turn_info');
		toggle_move();
		var turnText = 'X';
		var currentPlayer = whose_move();
		if (currentPlayer != 1) {
			turnText = 'O';
		}
		turnTextDiv.innerHTML = 'Turn for: ' + turnText.bold();
	}
}

function checkForWinner() {
	// Use a set because it ignores duplicates so if its size is 1, then we have a winner!
	var results = new Set();

	// Check horizontally
	// Outer loop = A, B, or C (from ascii values)
	for (var i = 65; i < 68; i++) {
		results.clear() // Clear our set on each loop...
		// Inner table = 1, 2, 3
		for (var j = 1; j < 4; j++) {
			// Add all the values in each cell to our set
			results.add(document.getElementById(String.fromCharCode(i) + j.toString()).innerHTML);
		}

		// Size == 1 means we have a winner, check if it's X or O
		if (results.size == 1) {
			if (results.has('X')) {
				return 'X';
			}
			else {
				return 'O';
			}
		}
	}

	// Check vertically
	// Outer loop = A, B, or C (from ascii values)
	for (var i = 1; i < 4; i++) {
		results.clear();
		// Inner table = 1, 2, 3
		for (var j = 65; j < 68; j++) {
			results.add(document.getElementById(String.fromCharCode(j) + i.toString()).innerHTML);
		}

		// Size == 1 means we have a winner, check if it's X or O
		if (results.size == 1) {
			if (results.has('X')) {
				return 'X';
			}
			else {
				return 'O';
			}
		}
	}

	// Check diagonals (only 2, just gonna do this manually)
	results.clear();
	var A1 = document.getElementById('A1');
	var B2 = document.getElementById('B2');
	var C3 = document.getElementById('C3');
	results.add(A1.innerHTML);
	results.add(B2.innerHTML);
	results.add(C3.innerHTML);

	// Size == 1 means we have a winner, check if it's X or O
	if (results.size == 1) {
		if (results.has('X')) {
			return 'X';
		}
		else {
			return 'O';
		}
	}

	results.clear();
	var C1 = document.getElementById('C1');
	var A3 = document.getElementById('A3');
	results.add(C1.innerHTML);
	results.add(B2.innerHTML);
	results.add(A3.innerHTML);

	// Size == 1 means we have a winner, check if it's X or O
	if (results.size == 1) {
		if (results.has('X')) {
			return 'X';
		}
		else {
			return 'O';
		}
	}
	// Otherwise, return null which means there is no winner!
	return null;
}

/*
Do not change this method.
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
