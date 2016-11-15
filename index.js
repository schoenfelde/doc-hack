"use strict";

var fs = require("fs");
var path = require('path');
var https = require('https');
var datastore = require("./datastore");
var mqtt = require("./mqtt");
var mraa = require('mraa');
// var motor = require('motor.js');


var options = {};
var board;


//instantiate webclient
// var outsystemsParms = function(parms) {
// 	host
// }

var main = function() {
	// checkforcommand();
	init();
	// setInterval(function(){
	// 	checkforcommand();
	// },500)
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
	
main();

var initializeBoard = function() {
	if (config.kit) {

		  board = require("./" + config.kit + ".js");

	} else {

		 board = require('./grove.js');

	}

	board.init(config);	
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
	outputCommand('Drug: ' + drug + ' ' + measurement);

	//turn dial for measurement
	administerDrug(measurement);

}

var outputCommand = function(msg,color) {
	if (!color)
		color = "green";

	board.message(msg, color);
}

var administerDrug = function(measurement) {
	motor.goForwardPercentAndReturn(5,measurement);
}

// var datastore = require("./datastore");

// var mqtt = require("./mqtt");
// var express = require('express');
// var logger = require('morgan');
// var open = require('open');
// var WebSocketServer = require('websocket').server;
// var WebSocketClient = require('websocket').client;
// var WebSocketFrame  = require('websocket').frame;
// var WebSocketRouter = require('websocket').router;
// var W3CWebSocket = require('websocket').w3cwebsocket;
// var app = express();


// var config = JSON.parse(
// 	fs.readFileSync(path.join(__dirname, "config.json"))
// );


// Log the requests
// app.use(logger('dev'));

// // Serve static files
// app.use(express.static(path.join(__dirname, ''))); 

// // Route for everything else.
// // app.get('/', function(request, response){
// //     response.sendfile('index.html');
// // });

// // Fire it up!
//app.listen(8080);
// console.log('Listening on port 3000');




// function main() {

//   board.reset();
//   var prev = false;

//   setInterval(function() {

//     var current = board.touchPressed();

//     if (current && !prev) { dingdong(); }

//     if (!current && prev) { board.reset(); }

//     prev = current;

//   }, 5);

// }

// main();
//Websocket Connection

// var WebSocket = require('ws');
// var ws = new WebSocket('wss://ws.dev.nuance.com/?');
 
// ws.on('open', function open() {
//   console.log('sending data');
//   ws.send('something', function(err){
//   	console.log(err);
//   });
// });
 
// ws.on('message', function(data, flags) {
//   // flags.binary will be set if a binary data is received. 
//   // flags.masked will be set if the data was masked. 
//   console.log('data received');
// });

// var client = new WebSocketClient();

// client.on('uncaughtException', function(err){
// 	console.log('Unhandled Exception: ' + err + '');
// });

// client.on('connectFailed', function(error){
// 	console.log('Connect Error: ' + error.toString());
// });



// client.on('connect', function(connection){
// 	console.log('WebSocket Client Connected');
// 	connection.on('error', function(error){
// 		console.log("Connection Error: " + error.toString());
// 	});
// 	connection.on('close', function(){
// 		console.log('echo-protocol Connection Closed');
// 	});
// 	connection.on('message', function(message) {
// 		if(message.type === 'utf8'){
// 			console.log("Received: '" + message.utf8Data + "'");
// 		}
// 		connection.end();
// 	});


// 	function sendNumber() {
// 		if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connection.sendUTF(number.toString());
//             console.log('in send number');
//             setTimeout(sendNumber, 1000);
//         }
//     }
//     sendNumber();
// });

// client.connect('ws://localhost:8080/', 'echo-protocol');

// Credentials

// var URL = 'wss://ws.dev.nuance.com/?';

// var APP_ID = "NMDPTRIAL_swtch1_gmail_com20161112102344";
// var APP_KEY = "eb3763645f937d5d5d040663cda456c110ad54817c0d3ca2f48259566621965158f9b6b78c3315e9371b4c04bfa2c5cf4f1a51cc278d6e1b0fc77275e808c641";
// var USER_ID = "";
// var NLU_TAG = "version_latest";

// // ASR
// // See: https://developer.nuance.com/public/index.php?task=supportedLanguages
// var ASR_LANGUAGE = "eng-USA";

// // TTS
// // See: https://developer.nuance.com/public/index.php?task=supportedLanguages
// var TTS_LANGUAGE = "eng-USA";
// var TTS_VOICE = "";




// var _ws = undefined;
// var _serviceUri;
// var _ttsTransactionId = 0;
// var _asrTransactionId = 1;
// var _nluTransactionId = 2;
// var _asrRequestId = 0;
// var options = {};

// var _url = function _url(options){
//     var serviceUri = options.url;
//     var params = [];
//     params.push('app_id=' + options.appId);
//     params.push('algorithm=key');
//     params.push('app_key=' + options.appKey);
//     serviceUri += params.join('&');
//     return serviceUri;
// };


// var disconnect =  function disconnect(){
//     _sendJSON({
//         'message': 'disconnect'
//     });
//     _ws = undefined;
// };

//  var connect = function connect(options) {
//         options = options || {};
//         _serviceUri = _url(options);

//         if(_ws !== undefined) {
//             return;
//         }

//         _ws = new WebSocket(_serviceUri);

//         _ws.onopen = function(){
//             // var nav = window.navigator;
//             // var deviceId = [
//             //     nav.platform,
//             //     nav.vendor,
//             //     nav.language
//             // ].join('_').replace(/\s/g,'');

//             _sendJSON({
//                 'message': 'connect',
//                 'user_id': options.userId,
//                 'codec': options.codec || 'audio/x-speex;mode=wb',
//                 //hardcoded device_id
//                 'device_id': "Win32_GoogleInc._en-US",
//                 'phone_model': 'nuance_internal_mixjsapp',
//                 'phone_number': options.userId
//             });

//             options.onopen();
//         };
//         _ws.onmessage = function(msg) {
//             var msgType = typeof(msg.data);
//             switch (msgType) {
//                 case 'object':
//                     // _audioSink.enqueue(msg.data);
//                     break;
//                 case 'string':
//                     var msg = JSON.parse(msg.data);
//                     if(msg.message == "volume") {
//                        // options.onvolume(msg.volume);
//                     } else {
//                        // options.onresult(msg);
//                     }
//                     if(msg.message == "audio_begin") {
//                         // _audioSink.start();
//                     }
//                     if(msg.message == "audio_end") {
//                         // _aud/ioSink.play();
//                     }
//                     if(msg.message == "query_end") {
//                         disconnect();
//                     }
//                     break;
//                 default:
//                     options.onresult(msg.data);
//             }
//         };

//         _ws.binaryType = 'arraybuffer';
//         _ws.onclose = options.onclose;
//         _ws.onerror = options.onerror;


//     };


// var _sendJSON = function _sendJSON(json) {
// 	_serviceUri = _url(options);
// 	_ws = new WebSocket(_serviceUri);
//     _ws.send(JSON.stringify(json));
// };


// var startTextNLU = function startTextNLU(options){
//         options = options || {};
//         var _options = Object.assign({}, options);
//         _options.onopen = function() {
//             options.onopen();
//             var _tId = (_nluTransactionId + _asrTransactionId + _ttsTransactionId);
//             _nluTransactionId += 1;

//             var _query_begin = {
//                 'message': 'query_begin',
//                 'transaction_id': _tId,

//                 'command': 'NDSP_APP_CMD',
//                 'language': options.language || 'eng-USA',
//                 'context_tag': options.tag
//             };

//             var _query_parameter = {
//                 'message': 'query_parameter',
//                 'transaction_id': _tId,

//                 'parameter_name': 'REQUEST_INFO',
//                 'parameter_type': 'dictionary',

//                 'dictionary': {
//                     'application_data': {
//                         'text_input': options.text
//                     }
//                 }
//             };

//             var _query_end = {
//                 'message': 'query_end',
//                 'transaction_id': _tId
//             };

//             _sendJSON(_query_begin);
//             _sendJSON(_query_parameter);
//             _sendJSON(_query_end);
//         };
//         connect(_options);
//     };

// //Make sure we have the configuration file
// //Array to hold list of commands, object has a command and the date
// var Commands = [];

// var saveTextCommand = function(cmd){
// 	Commands.push[{
// 		command: cmd,
// 		date: Date.now()
// 	}];
// }
// //Need Error handling// !!
// // (function(){
// // if (!APP_ID){
// // 		 console.log('ERROR THIS WILL NOT WORK YOUR CONFIGURATION IS NOT SET');
// // 		 return false;
// // }
// // else{
// // 	return true;
// // }
// // })()


// var text2json = function(text){
// 	var options = {
// 		appId: APP_ID,
// 		appKey: APP_KEY,
// 		url: "wss://ws.dev.nuance.com/?",
// 		userId: "",
// 		text: text,
// 		tag: NLU_TAG,
// 		language: ASR_LANGUAGE,
// 		 onopen: function() {
//             console.log("Websocket Opened");
//         },
//         onclose: function() {
//             console.log("Websocket Closed");
//         },
//         onresult: function(msg){
//         	console.log(msg);
//         	if(msg.nlu_interpretation_results !== undefined) {
// 	        	var command = msg.nlu_interpretation_results.payload.interpretations[0].concepts;
// 	        	console.log(command);
// 	        	saveTextCommand(command);
//         	}
//         },
//         onerror: function(error){
//         	console.log(error);
//         }
// 	};
// 	console.log(options);
// 	startTextNLU(options);
// };


// var text = 'give him 30 cc of insulin';
// text2json(text);
