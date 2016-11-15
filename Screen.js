var i2cBus = null;
var colors = { green: [0, 255, 0], white: [255, 255, 255], red : [255,0,0], blue: [0,0,255] };


exports.init = function (pin) {
	screen = new (require("jsupm_i2clcd").Jhd1313m1)(i2cBusPin, 0x3E, 0x62);
}

exports.white = function() { 
	screen.setColor.apply(screen, colors.white); 
}

exports.red = function() {
	screen.setColor.apply(screen, colors.red); 
}

exports.green = function() {
	screen.setColor.apply(screen, colors.green); 
}

exports.blue = function() {
	screen.setColor.apply(screen, colors.blue);
}

exports.changeColor = function(red, green, blue) {
	screen.setColor.apply(screen, [red, green, blue]);
}

exports.topDisplay = function(string) {
	screen.setCursor(0, 0);
	setDisplay(string);
}

exports.bottomDisplay = function(string) {
	screen.setCursor(1, 0);
	setDisplay(string);
}

var setDisplay = function(string) {
	while (string.length < 16) { string += " "; }
	screen.write(string);
}

exports.colors = colors;