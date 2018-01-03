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
var game;

$( document ).ready(function(){
	$('#board').css('background', 'grey');
	initializeGame();
	initializeBoard();
	drawBoard();
	drawPieces();
})

function initializeGame(){
	game = new game('red', 'blue', 'red')
	$('#playersTurn').text(game.getPlayersTurn())
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
				$('#'+rowCol).append('<img id="'+this.game.getPlayerOne()+'" src="./img/red_checker.png" class="checkerImg">');
			}
			else if(col > 4 && flop == 1){
				board[col][row] = 'blue';
				$('#'+rowCol).append('<img id="'+this.game.getPlayerTwo()+'" src="./img/earth_checker.png" class="checkerImg">');
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
	if($('#' + this.clicked.r + this.clicked.c).children().attr("id") == this.game.getPlayersTurn()){
		first_clicked = clicked;
		$('#firstClick').text(first_clicked.c + ' ' + first_clicked.r)
		return;
	}

	if(first_clicked != null){
		if(Math.abs(clicked.c - first_clicked.c) > 1 || Math.abs(clicked.r - first_clicked.r) > 1){
			//first_clicked = clicked
			$('#secondClick').text("")
		}
		else{
			//Valid move
			console.log("Clicked", clicked)
			this.second_clicked = clicked
			$('#secondClick').text(clicked.c + ' ' + clicked.r)
			moveChecker()

			//Set it to other players turn
			this.game.setPlayerTurn();
			$('#playersTurn').text(game.getPlayersTurn())

		}
	}
}

function moveChecker(){
	if(game.getPlayersTurn() == game.getPlayerOne()){
		$('#' + this.second_clicked.r + ''+ this.second_clicked.c).append('<img id="'+this.game.getPlayerOne()+'" src="./img/red_checker.png" class="checkerImg">')
	}
	else{
		$('#' + this.second_clicked.r + ''+ this.second_clicked.c).append('<img id="'+this.game.getPlayerTwo()+'" src="./img/earth_checker.png" class="checkerImg">')
	}

	$('#' + this.first_clicked.r + '' + this.first_clicked.c).empty();

	this.first_clicked = null;
	this.second_clicked = null;

	$('#firstClick').text("")
	$('#secondClick').text("")
}