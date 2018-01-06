var _p1;
var _p2;
var _whosTurn;
var _p1NumPieces;
var _p2NumPieces;

function game(playerOne, playerTwo, startingPlayer){
	this._p1 = playerOne;
	this._p2 = playerTwo;
	this._whosTurn = startingPlayer;
	this._p1NumPieces = 12;
	this._p2NumPieces = 12;

	this.getPlayerOne = getP1;
	this.getPlayerTwo = getP2;
	this.getPlayersTurn = getPlayerTurn;
	this.setPlayerTurn = setPlayersTurn;
	this.getP1NumPieces = getP1NumPieces;
	this.getP2NumPieces = getP2NumPieces;
	this.removePiece = removePiece;	
}

function getP1(){
	return this._p1;
}

function getP1NumPieces(){
	return this._p1NumPieces;
}

function getP2(){
	return this._p2;
}

function getP2NumPieces(player){
	return this._p2NumPieces;
}

function removePiece(player){
	if(player == this._p2){
		this._p1NumPieces -= 1;
	}
	else{
		this._p2NumPieces -= 1;
	}
}

function getPlayerTurn(){
	return this._whosTurn;
}

function setPlayersTurn(){
	if(this._whosTurn == this._p1){
		this._whosTurn = this._p2;
	}
	else{
		this._whosTurn = this._p1;
	}
}