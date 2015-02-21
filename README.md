# node-flhook - a node.js/io.js Freelancer Hook client
This is a work in progress Freelancer Hook client library for node.js/io.js.

Install with:
```bash
npm install node-flhook
```

## Usage
Here a current how to use example:
```js
var flhook = require('node-flhook');
var client = flhook.createClient(1919, 'localhost', {
	password: 'test'
});

client.on('ready', function() {
	console.log('FLHook client is ready to use');

	client.enable_eventmode(function(err) {
		if (err) {
			console.error(err);
		}

		client.on('event', function(message) {
			// message is the event message (found under NOTIFICATIONS in the flhook readme)
		});
	});
});
```

# API

## Connection Events

### "connect"
`client` will emit `connect` a connection is established to the Freelancer Hook server. But the server is not ready to receive commands.

### "ready"
`client` will emit `ready` the welcome message is received and commands can be received.

### "error"
`client` will emit `error` when encountering an connection error or unhandled exception.

### "event"
`client` will emit `event` when a server event is received. Only works if eventmode is enabled via `client.enable_eventmode()`.

## flhook.createClient()

### overloading
* flhook.createClient() = flhook.createClient(1919, 'localhost', {});
* flhook.createClient(options) = flhook.createClient(1919, 'localhost', options);
* flhook.createClient(port, host, options);

The current only supported call is `flhook.createClient(port, host, options)` unless the authentification method is added.

## client.send_command(command, args, callback)
`command` is the command which will be executed as string. `args` are the arguments as string, multiple args are splited by space. E.g. `client.send_command('setcash', 'Player1 100000', function() {})`.

## client.enable_eventmode(callback)
This enabled the eventmode, events will be received via event `event`.

## client.getcash(args...)
Predefined call, same as `client.send_command('getcash', args...)`.

## client.setcash(args...)
Predefined call, same as `client.send_command('setcash', args...)`.

## client.setcashsec(args...)
Predefined call, same as `client.send_command('setcashsec', args...)`.

## client.addcash(args...)
Predefined call, same as `client.send_command('addcash', args...)`.

## client.addcashsec(args...)
Predefined call, same as `client.send_command('addcashsec', args...)`.

## client.kick(args...)
Predefined call, same as `client.send_command('kick', args...)`.

## client.ban(args...)
Predefined call, same as `client.send_command('ban', args...)`.

## client.unban(args...)
Predefined call, same as `client.send_command('unban', args...)`.

## client.kickban(args...)
Predefined call, same as `client.send_command('kickban', args...)`.

## client.msg(args...)
Predefined call, same as `client.send_command('msg', args...)`.

## client.msgs(args...)
Predefined call, same as `client.send_command('msgs', args...)`.

## client.msgu(args...)
Predefined call, same as `client.send_command('msgu', args...)`.

## client.fmsg(args...)
Predefined call, same as `client.send_command('fmsg', args...)`.

## client.fmsgs(args...)
Predefined call, same as `client.send_command('fmsgs', args...)`.

## client.fmsgu(args...)
Predefined call, same as `client.send_command('fmsgu', args...)`.

## client.beam(args...)
Predefined call, same as `client.send_command('beam', args...)`.

## client.kill(args...)
Predefined call, same as `client.send_command('kill', args...)`.

## client.resetrep(args...)
Predefined call, same as `client.send_command('resetrep', args...)`.

## client.setrep(args...)
Predefined call, same as `client.send_command('setrep', args...)`.

## client.enumcargo(args...)
Predefined call, same as `client.send_command('enumcargo', args...)`.

## client.addcargo(args...)
Predefined call, same as `client.send_command('addcargo', args...)`.

## client.removecargo(args...)
Predefined call, same as `client.send_command('removecargo', args...)`.

## client.rename(args...)
Predefined call, same as `client.send_command('rename', args...)`.

## client.deletechar(args...)
Predefined call, same as `client.send_command('deletechar', args...)`.

## client.readcharfile(args...)
Predefined call, same as `client.send_command('readcharfile', args...)`.

## client.writecharfile(args...)
Predefined call, same as `client.send_command('writecharfile', args...)`.

## client.setadmin(args...)
Predefined call, same as `client.send_command('setadmin', args...)`.

## client.getadmin(args...)
Predefined call, same as `client.send_command('getadmin', args...)`.

## client.deladmin(args...)
Predefined call, same as `client.send_command('deladmin', args...)`.

## client.getreservedslot(args...)
Predefined call, same as `client.send_command('getreservedslot', args...)`.

## client.setreservedslot(args...)
Predefined call, same as `client.send_command('setreservedslot', args...)`.

## client.rehash(args...)
Predefined call, same as `client.send_command('rehash', args...)`.

## client.loadplugins(args...)
Predefined call, same as `client.send_command('loadplugins', args...)`.

## client.loadplugin(args...)
Predefined call, same as `client.send_command('loadplugin', args...)`.

## client.listplugins(args...)
Predefined call, same as `client.send_command('listplugins', args...)`.

## client.unloadplugin(args...)
Predefined call, same as `client.send_command('unloadplugin', args...)`.

## client.pauseplugin(args...)
Predefined call, same as `client.send_command('pauseplugin', args...)`.

## client.unpauseplugin(args...)
Predefined call, same as `client.send_command('unpauseplugin', args...)`.

## client.getgroupmembers(args...)
Predefined call, same as `client.send_command('getgroupmembers', args...)`.

## client.getbasestatus(args...)
Predefined call, same as `client.send_command('getbasestatus', args...)`.

## client.getclientid(args...)
Predefined call, same as `client.send_command('getclientid', args...)`.

## client.getplayerinfo(args...)
Predefined call, same as `client.send_command('getplayerinfo', args...)`.

## client.xgetplayerinfo(args...)
Predefined call, same as `client.send_command('xgetplayerinfo', args...)`.

## client.getplayers(args...)
Predefined call, same as `client.send_command('getplayers', args...)`.

## client.xgetplayers(args...)
Predefined call, same as `client.send_command('xgetplayers', args...)`.

## client.getplayerids(args...)
Predefined call, same as `client.send_command('getplayerids', args...)`.

## client.getaccountdirname(args...)
Predefined call, same as `client.send_command('getaccountdirname', args...)`.

## client.savechar(args...)
Predefined call, same as `client.send_command('savechar', args...)`.

## client.isloggedin(args...)
Predefined call, same as `client.send_command('isloggedin', args...)`.

## client.isonserver(args...)
Predefined call, same as `client.send_command('isonserver', args...)`.

## client.serverinfo(args...)
Predefined call, same as `client.send_command('serverinfo', args...)`.

## client.moneyfixlist(args...)
Predefined call, same as `client.send_command('moneyfixlist', args...)`.

## client.help(args...)
Predefined call, same as `client.send_command('help', args...)`.
