var pin = null, buzzer = null;

exports.init = function(pin) {
	pin = pin;
	buzzer = new (require("jsupm_buzzer").Buzzer)(pin);
}

exports.play = function(hz, len) {
  buzzer.playSound(hz, len);
}

exports.learn = function() {
	console.log(buzzer);
}
