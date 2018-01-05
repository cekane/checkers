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

// case 1: 
// 	regular move either equals 
// case 2:
// 	regular jump
// case 3:
//	multiple jump
// case 4: 
//	get kinged
// case 5:
//	king move 


function checkMove(clicked){
	if($('#' + this.clicked.r + this.clicked.c).children().attr("id") == this.game.getPlayersTurn()){
		first_clicked = clicked;
		$('#firstClick').text(first_clicked.c + ' ' + first_clicked.r)
		return;
	}
	var clickedDiv = $('#'+ this.clicked.r + this.clicked.c);
	if(first_clicked != null && clickedDiv.attr('class') != 'tileWhite' && clickedDiv.children().length == 0){
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
			$('#secondClick').text(clicked.c + ' ' + clicked.r)
			moveChecker()
		}
		else{
			$('#secondClick').text("")
			return;
		}
		//Set it to other players turn
		this.game.setPlayerTurn();
		$('#playersTurn').text(game.getPlayersTurn())
	}
}

function checkInBetween(clicked){
	var column;
	var row;
	if(clicked.c > first_clicked.c){
		column = first_clicked.c + 1
	}else{
		column = first_clicked.c - 1
	}

	if(clicked.r > first_clicked.r){
		row = first_clicked.r + 1
	}else{
		row = first_clicked.r - 1
	}

	var checkedDiv = $('#'+ row + column);
	if(checkedDiv.children().length == 1 && checkedDiv.children().attr("id")!= game.getPlayersTurn){
		checkedDiv.empty()
	}
	else{
		return false;
	}
	return true;
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