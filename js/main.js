// Checkers by: Connor Kane
// [x][ ][x][ ][x][ ][x][ ]
// [ ][x][ ][x][ ][x][ ][x]		RED - Player 1
// [x][ ][x][ ][x][ ][x][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [x][ ][x][ ][x][ ][x][ ]
// [ ][x][ ][x][ ][x][ ][x]		BLUE - Player 2
// [x][ ][x][ ][x][ ][x][ ]

var board;
var first_clicked = null;
var second_clicked = null;
var currentGame;

$( document ).ready(function(){
	$('#board').css('background', 'grey');
	startGame();
})

function startGame(){
	//Creates the game object with players and whos turn it is
	initializeGame();
	initializeBoard();
	drawBoard();
	drawPieces();
}

function initializeGame(){
	currentGame = new game('p1', 'p2', 'p1')
	$('#playersTurn').text(currentGame.getPlayersTurn())
	$('#p1NumPieces').text(currentGame.getP1NumPieces())
	$('#p2NumPieces').text(currentGame.getP2NumPieces())	
}

function initializeBoard(){
	board = new Array(8);
	for(var col = 0; col < board.length; col++){
		board[col] = new Array(8);
	}
}

function drawBoard(){
	var x = 1;
	for(var col = 0; col < board.length; col++){
		for(var row = 0; row < board[col].length; row++){
			if(x == 1){
				$('#board').append('<div id="'+ row + '' + col+ '" onclick="setClicked(' + col + ', ' + row + ')" class="tileBlack"></div>')	
				// $('#board').append('<div id="'+ row + '' + col+ '" style="color: white" onclick="setClicked(' + col + ', ' + row + ')" class="tileBlack">Row:'+ row + ' Column:' + col+ '</div>')	
			}
			else{
				$('#board').append('<div id="'+ row+ '' + col+ '" onclick="setClicked(' + col + ', ' + row + ')" class="tileWhite"></div>')
			}	
			x = x * -1;			
		}
		x = x * -1;
	}
}

function drawPieces(){
	var flop = 1;
	for(var col = 0; col < board.length; col++){
		for(var row = 0; row < board[col].length; row++){
			var rowCol = row + '' + col;
			if(col < 3 && flop == 1){
				board[col][row] = 'red';
				$('#'+rowCol).append('<img id="'+this.currentGame.getPlayerOne()+'" src="./img/red_checker.png" class="checkerImg">');
			}
			else if(col > 4 && flop == 1){
				board[col][row] = 'blue';
				$('#'+rowCol).append('<img id="'+this.currentGame.getPlayerTwo()+'" src="./img/earth_checker.png" class="checkerImg">');
			}
			else{
				board[col][row] = 'empty';
			}
			flop = flop * -1; 
		}
		flop = flop * -1;
	}
}

function setClicked(col, row){
	clicked = { c: col, r: row };
	checkMove(clicked);
}

function checkMove(clicked){
	console.log("Game", this.currentGame)
	var clickedDiv = $('#'+ this.clicked.r + this.clicked.c);
	var playsersTurn = this.currentGame.getPlayersTurn();

	if(clickedDiv.children().attr("id") == playsersTurn || clickedDiv.children().attr("id") == playsersTurn + 'king'){
		this.first_clicked = clicked;
		//FOR DEBUGING
		$('#firstClick').text(first_clicked.c + ' ' + first_clicked.r)
		return;
	}
	
	/*
		- Valid first click for players turn
	 	- Second clicked isn't a white tile 
	 	- There aren't any peices inside the div that was clicked
		- Move is either forward or kinged
	*/
	if( this.first_clicked != null && clickedDiv.attr('class') != 'tileWhite' && clickedDiv.children().length == 0 && checkForward(clicked)){
		//Regular move forward
		if(Math.abs(clicked.c - first_clicked.c) == 1 && Math.abs(clicked.r - first_clicked.r) == 1){	
			this.second_clicked = clicked
			$('#secondClick').text(clicked.c + ' ' + clicked.r)
			moveChecker()
		}
		//Regular jump
		else if(Math.abs(clicked.c - first_clicked.c)==2 && Math.abs(clicked.r - first_clicked.r)==2 ){
			if(!checkInBetween(clicked)){
				return;
			}
			this.second_clicked = clicked
			//FOR DEBUGING
			$('#secondClick').text(clicked.c + ' ' + clicked.r)
			moveChecker()
			currentGame.removePiece(currentGame.getPlayersTurn());
		}
		else{
			$('#secondClick').text("")
			return;
		}
		//Set it to other players turn
		this.currentGame.setPlayerTurn();
		$('#playersTurn').text(currentGame.getPlayersTurn())

		//FOR DEBUGING
		$('#'+ currentGame.getPlayerOne() +'NumPieces').text(currentGame.getP1NumPieces());
		$('#'+ currentGame.getPlayerTwo() +'NumPieces').text(currentGame.getP2NumPieces());
		checkEndofGame()
	}
}

function checkForward(clicked, clickedDiv){
	var playersTurn = currentGame.getPlayersTurn()
	if($('#'+ this.first_clicked.r + this.first_clicked.c).children().attr("id") == playersTurn + 'king'){
		return true;
	}
	else if(playersTurn == 'p1' && clicked.c > this.first_clicked.c || playersTurn == 'p2' && clicked.c < this.first_clicked.c){
		return true;
	}
	else{
		return false;
	}
}

function checkInBetween(clicked){
	var column, row;
	if(clicked.c > first_clicked.c){ column = first_clicked.c + 1 }
	else{ column = first_clicked.c - 1	}

	if(clicked.r > first_clicked.r){ row = first_clicked.r + 1 }
	else{ row = first_clicked.r - 1 }

	var checkedDiv = $('#'+ row + column);
	if(checkedDiv.children().length == 1 && checkedDiv.children().attr("id")!= currentGame.getPlayersTurn){
		checkedDiv.empty()
	}
	else{
		return false;
	}
	return true;
}

function moveChecker(){
	if(currentGame.getPlayersTurn() == currentGame.getPlayerOne()){
		if($('#' + this.first_clicked.r + '' + this.first_clicked.c).children().attr('id') == currentGame.getPlayerOne()){
			$('#' + this.second_clicked.r + ''+ this.second_clicked.c).append('<img id="'+this.currentGame.getPlayerOne()+'" src="./img/red_checker.png" class="checkerImg">')
		}else{
			$('#' + this.second_clicked.r + '' + this.second_clicked.c).append('<img id="'+this.currentGame.getPlayerOne()+'king" src="./img/red_checker_king.png" class="checkerImg">');
		}
	}
	else{
		if($('#' + this.first_clicked.r + '' + this.first_clicked.c).children().attr('id') == currentGame.getPlayerTwo()){
			$('#' + this.second_clicked.r + ''+ this.second_clicked.c).append('<img id="'+this.currentGame.getPlayerTwo()+'" src="./img/earth_checker.png" class="checkerImg">')
		}else{
			$('#' + this.second_clicked.r + '' + this.second_clicked.c).append('<img id="'+this.currentGame.getPlayerTwo()+'king" src="./img/earth_checker_king.png" class="checkerImg">');
		}
	}

	$('#' + this.first_clicked.r + '' + this.first_clicked.c).empty();
	checkKinged()
	this.first_clicked = null;
	this.second_clicked = null;

	$('#firstClick').text("")
	$('#secondClick').text("")
}

function checkKinged(){
	var player = currentGame.getPlayersTurn() 
	if(player == currentGame.getPlayerOne() && this.second_clicked.c == 7){
		kinged(player);
	}else if(player == currentGame.getPlayerTwo() && this.second_clicked.c == 0){
		kinged(player);
	}
}

function kinged(player){
	$('#' + this.second_clicked.r + '' + this.second_clicked.c).empty();
	if(player == currentGame.getPlayerOne()){
		$('#' + this.second_clicked.r + '' + this.second_clicked.c).append('<img id="'+this.currentGame.getPlayerOne()+'king" src="./img/red_checker_king.png" class="checkerImg">');
	}else{
		$('#' + this.second_clicked.r + '' + this.second_clicked.c).append('<img id="'+this.currentGame.getPlayerTwo()+'king" src="./img/earth_checker_king.png" class="checkerImg">');
	}
}

function checkEndofGame(){
	if(currentGame.getP1NumPieces() == 0){
		gameOver(currentGame.getPlayerTwo())
	}else if(currentGame.getP2NumPieces() == 0){
		gameOver(currentGame.getPlayerOne())
	}
}

function gameOver(player){
	$('#myModal').show()
	$('#winner').text(player)	
}

function closePopup(){
	$('#myModal').hide()
}

function clearBoard(){
	for(var col = 0; col < board.length; col++){
		for(var row = 0; row < board[col].length; row++){	
			$('#'+ row + '' + col).empty();
		}
	}
}

function resetGame(){
	clearBoard();
	initializeGame();
	drawPieces();
	closePopup();
}