//first we need to make sure that when we add in 
//we need to be able to set the pins to the collect areas, so lets create a api to set the pins accordingly

//so we need the following in the board

var board = {
	screen: null,
	touchButton: null,
	buzzer: null
}

exports.board = board;

exports.pins = {
	touchPin: null,
	buzzerPin: null,
	i2cBusPin: null
};

exports.init = function(pins) {
	board.screen = new require("Screen.js");
	board.touchButton = new require("TouchButton.js");
	board.buzzer = new require("Buzzer.js");
	board.screen.init(pins.i2cBusPin);
	board.buzzer.init(pins.buzzerPin);
	board.touchButton.init(pins.touchPin);
}



