var i2cBus = null;
var colors = { green: [0, 255, 0], white: [255, 255, 255], red : [255,0,0], blue: [0,0,255] };


exports.init = function (pin) {
	screen = new (require("jsupm_i2clcd").Jhd1313m1)(i2cBusPin, 0x3E, 0x62);
}

exports.whiteMessage = function(string) { 
	message(string);
	screen.setColor.apply(screen, color.white); 
}

exports.redMessage = function(string) {
	message(string);
	screen.setColor.apply(screen, color.red); 
}

exports.greenMessage = function(string) {
	message(string);
	screen.setColor.apply(screen, color.green); 
}

var message = function(string) {
	while (string.length < 16) { string += " "; }
	screen.setCursor(0, 0);
	screen.write(string);
}
