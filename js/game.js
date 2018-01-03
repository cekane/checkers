var p1;
var p2;
var whosTurn;

function game(playerOne, playerTwo, startingPlayer){
	this.p1 = playerOne;
	this.p2 = playerTwo;
	this.whosTurn = startingPlayer;

	this.getPlayerOne = getP1;
	this.getPlayerTwo = getP2;
	this.getPlayersTurn = getPlayerTurn;
	this.setPlayerTurn = setPlayersTurn;	
}

function getP1(){
	return this.p1;
}

function getP2(){
	return this.p2;
}

function getPlayerTurn(){
	return this.whosTurn;
}

function setPlayersTurn(){
	if(this.whosTurn == this.p1){
		this.whosTurn = this.p2;
	}
	else{
		this.whosTurn = this.p1;
	}
}