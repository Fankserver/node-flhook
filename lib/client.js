/*
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');

/*
 * Client constructor
 */
function HookClient(stream, options) {
	this.stream = stream;

	this.connected = false;
	this.ready = false;
	this.eventmode = false;

	this.command_queue = [];

	this.password = null;
	if (options.password !== undefined) {
		this.password = options.password;
	}

	this.install_stream_listeners();

	EventEmitter.call(this);
}

util.inherits(HookClient, EventEmitter);
module.exports = HookClient;

HookClient.prototype.install_stream_listeners = function() {
	var self = this;

	this.stream.on('data', function(buffer_from_socket) {
		self.on_data(buffer_from_socket);
	});
	this.stream.on('error', function(msg) {
		self.on_error(msg);
	});
	this.stream.on('close', function() {
		self.on_close();
	});
	this.stream.on('end', function() {
		self.on_close();
	});
};

HookClient.prototype.do_authentification = function() {
	var self = this;
	this.send_command('pass', this.password, function() {
		self.emit('ready');
	});
};

function Command(command, args, callback) {
	this.command = command;
	this.args = args;
	this.callback = (typeof callback === 'function' ? callback : null);
}

HookClient.prototype.send_command = function(command, args, callback) {
	var command_obj = new Command(command, args, callback);
	this.command_queue.push(command_obj);
	return this.stream.write(command + (args ? ' ' + args : '') + '\n');
};

/*
 * Public methods
 */
HookClient.prototype.enableEventmode = function(callback) {
	return this.send_command('eventmode', null, callback);
};

/*
 * Event listener
 */
HookClient.prototype.on_data = function(data) {
	data_without_newline = data.toString().replace(/(\r\n|\n|\r)$/, '');
	if (data_without_newline.match(/Welcome to FLHack, please authenticate/i)) {
		this.connected = true;

		if (this.password) {
			this.do_authentification();
		}
		else {
			this.emit('connect');
		}
	}
	else if (data_without_newline.match(/^OK|ERR/)) {
		var error = data_without_newline.match(/^ERR/) ? data.toString() : undefined;
		var command_obj = this.command_queue.pop();

		if (command_obj.command === 'eventmode' && !error) {
			this.eventmode = true;
		}

		if (command_obj.callback) {
			command_obj.callback(error);
		}
	}
	else if (this.eventmode) {
		this.emit('event', data_without_newline);
	}
};
HookClient.prototype.on_error = function(msg) {
	this.emit('error', msg);
};
HookClient.prototype.on_close = function() {
	this.connected = false;
};
