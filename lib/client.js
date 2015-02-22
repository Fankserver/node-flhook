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
	this.response_queue = [];

	this.password = 'test';
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
	this.send_command('pass' + this.password, function(err) {
		if (err) {
			self.emit('error', err);
		}
		else if (!self.ready) {
			self.emit('ready');
		}
	});
};

HookClient.prototype.send_command = function(command, callback) {
	var command_obj = new Command(command, callback);
	this.command_queue.push(command_obj);
	return this.stream.write(command + '\n');
};

/*
 * Public methods
 */
HookClient.prototype.execute = function() {
	return this.send_command(get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.enableEventmode = function(callback) {
	return this.send_command('eventmode', callback);
};

HookClient.prototype.getcash = function() {
	return this.send_command('getcash ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.setcash = function() {
	return this.send_command('setcash ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.setcashsec = function() {
	return this.send_command('setcashsec ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.addcash = function() {
	return this.send_command('addcash ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.addcashsec = function() {
	return this.send_command('addcashsec ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.kick = function() {
	return this.send_command('kick ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.ban = function() {
	return this.send_command('ban ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.unban = function() {
	return this.send_command('unban ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.kickban = function() {
	return this.send_command('kickban ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.msg = function() {
	return this.send_command('msg ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.msgs = function() {
	return this.send_command('msgs ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.msgu = function() {
	return this.send_command('msgu ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.fmsg = function() {
	return this.send_command('fmsg ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.fmsgs = function() {
	return this.send_command('fmsgs ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.fmsgu = function() {
	return this.send_command('fmsgu ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.beam = function() {
	return this.send_command('beam ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.kill = function() {
	return this.send_command('kill ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.resetrep = function() {
	return this.send_command('resetrep ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.setrep = function() {
	return this.send_command('setrep ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.enumcargo = function() {
	return this.send_command('enumcargo ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.addcargo = function() {
	return this.send_command('addcargo ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.removecargo = function() {
	return this.send_command('removecargo ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.rename = function() {
	return this.send_command('rename ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.deletechar = function() {
	return this.send_command('deletechar ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.readcharfile = function() {
	return this.send_command('readcharfile ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.writecharfile = function() {
	return this.send_command('writecharfile ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.setadmin = function() {
	return this.send_command('setadmin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getadmin = function() {
	return this.send_command('getadmin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.deladmin = function() {
	return this.send_command('deladmin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getreservedslot = function() {
	return this.send_command('getreservedslot ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.setreservedslot = function() {
	return this.send_command('setreservedslot ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.rehash = function() {
	return this.send_command('rehash ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.loadplugins = function() {
	return this.send_command('loadplugins ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.loadplugin = function() {
	return this.send_command('loadplugin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.listplugins = function() {
	return this.send_command('listplugins ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.unloadplugin = function() {
	return this.send_command('unloadplugin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.pauseplugin = function() {
	return this.send_command('pauseplugin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.unpauseplugin = function() {
	return this.send_command('unpauseplugin ' + get_args_as_string(arguments), get_args_callback(arguments));
};

HookClient.prototype.getgroupmembers = function() {
	return this.send_command('getgroupmembers ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getbasestatus = function() {
	return this.send_command('getbasestatus ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getclientid = function() {
	return this.send_command('getclientid ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getplayerinfo = function() {
	return this.send_command('getplayerinfo ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.xgetplayerinfo = function() {
	return this.send_command('xgetplayerinfo ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getplayers = function() {
	return this.send_command('getplayers ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.xgetplayers = function() {
	return this.send_command('xgetplayers ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getplayerids = function() {
	return this.send_command('getplayerids ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.getaccountdirname = function() {
	return this.send_command('getaccountdirname ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.savechar = function() {
	return this.send_command('savechar ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.isloggedin = function() {
	return this.send_command('isloggedin ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.isonserver = function() {
	return this.send_command('isonserver ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.serverinfo = function() {
	return this.send_command('serverinfo ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.moneyfixlist = function() {
	return this.send_command('moneyfixlist ' + get_args_as_string(arguments), get_args_callback(arguments));
};
HookClient.prototype.help = function() {
	return this.send_command('help ' + get_args_as_string(arguments), get_args_callback(arguments));
};

/*
 * Event listener
 */
HookClient.prototype.on_data = function(data) {
	this.response_queue.push(data);
	var data_array = get_data_cleaned(this.response_queue.join(''));

	if (data_array[0].match(/Welcome to FLHack, please authenticate/i)) {
		this.response_queue.length = 0;
		this.connected = true;

		this.emit('connect');

		this.do_authentification();
	}
	else if (data_array[data_array.length - 1].match(/^OK|ERR/)) {
		this.response_queue.length = 0;
		var error = data_array[data_array.length - 1].match(/^ERR/) ? data_array[data_array.length - 1].toString() : undefined;
		var command_obj = this.command_queue.shift();

		if (command_obj.command === 'eventmode' && !error) {
			this.eventmode = true;
		}

		if (command_obj.callback) {
			data_array.pop();
			command_obj.callback(error, data_array);
		}
	}
	else if (this.eventmode && data_array.length === 1 && /^(chat from|kill victim|login char|launch char|base(enter|exit) char|jumpin char|switchout char|spawn char|connect id|disconnect char)=/.test(data_array[0])) {
		this.response_queue.length = 0;
		this.emit('event', data_array[0]);
	}
};
HookClient.prototype.on_error = function(msg) {
	this.emit('error', msg);
};
HookClient.prototype.on_close = function() {
	this.connected = false;
	this.ready = false;
};

function Command(command, callback) {
	this.command = command;
	this.callback = (typeof callback === 'function' ? callback : null);
}

function get_args_as_string(args) {
	var newArguments = [];

	for (var i in args) {
		if (typeof args[i] === 'function') {
			break;
		}

		newArguments.push(args[i]);
	}

	return newArguments.join(' ');
}

function get_data_cleaned(data) {
	var data_array = data.toString().split(/(\r\n)/);
	var i = 0;
	while (i < data_array.length) {
		if (/^\r\n$/.test(data_array[i]) || !data_array[i]) {
			data_array.splice(i, 1);
		}
		else {
			i++;
		}
	}

	return data_array;
}

function get_args_callback(args) {
	var callback;

	for (var i in args) {
		if (typeof args[i] === 'function') {
			callback = args[i];
			break;
		}
	}

	return callback;
}
