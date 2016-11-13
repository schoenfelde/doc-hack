var pin = null, buzzer = null;

expots.init = function(pin) {
	pin = pin;
	buzzer = new (require("jsupm_buzzer").Buzzer)(pin);
}

exports.play = function(hz, len) {
  buzzer.playSound(hz, len);
}


