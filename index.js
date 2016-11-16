"use strict";

var fs = require("fs");
var path = require('path');
var https = require('https');
var datastore = require("./datastore");
var mqtt = require("./mqtt");
var mraa = require('mraa');
var m = require('./motor.js');


var main = function() {
	init();
	 setInterval(function(){
	 	checkforcommand();
	 },500)
}

var checkforcommand = function(callback) {
	//http request to outsystems here
	if(hasInformation){
		getInformation();
	}
}

var getInformation = function() {
		https.get('https://circumpunct.outsystemscloud.com/dochack/rest/dochack/getNuanceMessage', (res) => {
		  res.on('data', (d) => {
		    process.stdout.write(d);
		    edisonOperation(d);
		  });

		}).on('error', (e) => {
		  console.error(e);
	});
}

var hasInformation = function() {
	var ret = false;
	https.get('https://circumpunct.outsystemscloud.com/dochack/rest/dochack/hasMessage', (res) => {
		  res.on('data', (d) => {
		  	process.stdout.write(d);
		    ret = d
		    });

		}).on('error', (e) => {
		  console.error(e);
	});	
	return ret;
}

// Initialize the hardware for whichever kit we are using
var init = function() {
	var board = require('./setupboard.js');

	board.pins.touchPin = 6;
	board.pins.buzzerPin = 5;
	board.pins.i2cBusPin = 6;
	// var 	pins = 
	
	board.init(board.pins);

	// console.log(board);
}
	
//Command object: medicine name (DRUG_NAME) , measurement (MEASUREMENT), amount (nuance_DOUBLE)
var edisonOperation = function(command) {
	var drug = command.DRUG_NAME;
	var measurement = command.MEASUREMENT;
	var amount = command.nuance_DOUBLE;

	//screen red
	if (!drug)
		return false;

	//output to the edison
	outputCommand('Drug: ' + drug + ' ' + amount);

	//turn dial for measurement
	administerDrug(amount);

}

var outputCommand = function(msg,color) {
        board.topMessage(msg);
	board.green();
}

var administerDrug = function(measurement) {
       m.motor.goForwardPercentAndReturn(5,measurement);
}

main();
