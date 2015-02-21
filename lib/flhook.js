/*
 * Module dependencies.
 */
var net = require('net');
var client = require('./client');

var default_host = 'localhost';
var default_port = 1919;

module.exports.HookClient = client;
module.exports.createClient = function(arg0, arg1, arg2) {
	var cnxOptions = {
		'port': default_port,
		'host': default_host,
		'family': 4
	};
	var options = {};

	if (typeof arg0 === 'number' || typeof arg0 === 'string' && arg0.match(/^\d+$/)) {
		// createClient (1919, 'localhost', options)
		// createClient ('1919', 'localhost', options)
		cnxOptions.port = arg0;
		cnxOptions.host = arg1;
		options = arg2;
	}
	else if (arg0 !== null && typeof arg0 === 'object') {
		// createClient (options)
		options = arg0;
	}

	var net_client = net.createConnection(cnxOptions);
	var hook_client = new client(net_client, options ||{});

	hook_client.connectionOption = cnxOptions;

	return hook_client;
};
