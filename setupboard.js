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

var init = function(pins){
	makeSurePins(pins);
	board.screen = new require("./Screen.js");
	board.touchButton = new require("./TouchButton.js");
	board.buzzer = new require("./Buzzer.js");
	board.screen.init(pins.i2cBusPin);
	// board.buzzer.init(pins.buzzerPin);
	// board.touchButton.init(pins.touchPin);
}


exports.init = init;


//Change the color of the screen every half second
exports.changeColors = function(interval) {
	var lengthOfColors = board.screen.colors.length;
	var i = 0;
	interval = interval ? interval : 500;
	setInterval(function() {
		if (i == lengthOfColors) {
			i = 0;
		}
		board.screen.colors[i]();
		i++;
	}, interval);
}


function makeSurePins(pins) {
	console.log(pins);
	if (!pins) {
		return;
	}
	else {
		console.log("ERROR THE PINS are missing from the setup of the board...");
	}
}
