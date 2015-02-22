# flhook - a node.js/io.js Freelancer Hook client
This is a work in progress Freelancer Hook client library for node.js/io.js.

Install with:
```bash
npm install flhook
```

## Usage
Here a simple how to use example:
```js
var flhook = require('flhook');
var client = flhook.createClient();

client.on('ready', function() {
	console.log('FLHook client is ready to use');

	client.getcash('Fank', function(err, data) {
		if (err) {
			console.error(err);
		}
		else {
			console.log(data[0]);
		}
	});
});
console.on('error', function(err) {
	console.error(err);
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

## client.execute(args...)
`args` is the command which will be executed.

## client.enableEventmode(callback)
This enabled the eventmode, events will be received via event `event`.

## client.getcash(args...)
Predefined call, same as `client.execute('getcash', args...)`.

## client.setcash(args...)
Predefined call, same as `client.execute('setcash', args...)`.

## client.setcashsec(args...)
Predefined call, same as `client.execute('setcashsec', args...)`.

## client.addcash(args...)
Predefined call, same as `client.execute('addcash', args...)`.

## client.addcashsec(args...)
Predefined call, same as `client.execute('addcashsec', args...)`.

## client.kick(args...)
Predefined call, same as `client.execute('kick', args...)`.

## client.ban(args...)
Predefined call, same as `client.execute('ban', args...)`.

## client.unban(args...)
Predefined call, same as `client.execute('unban', args...)`.

## client.kickban(args...)
Predefined call, same as `client.execute('kickban', args...)`.

## client.msg(args...)
Predefined call, same as `client.execute('msg', args...)`.

## client.msgs(args...)
Predefined call, same as `client.execute('msgs', args...)`.

## client.msgu(args...)
Predefined call, same as `client.execute('msgu', args...)`.

## client.fmsg(args...)
Predefined call, same as `client.execute('fmsg', args...)`.

## client.fmsgs(args...)
Predefined call, same as `client.execute('fmsgs', args...)`.

## client.fmsgu(args...)
Predefined call, same as `client.execute('fmsgu', args...)`.

## client.beam(args...)
Predefined call, same as `client.execute('beam', args...)`.

## client.kill(args...)
Predefined call, same as `client.execute('kill', args...)`.

## client.resetrep(args...)
Predefined call, same as `client.execute('resetrep', args...)`.

## client.setrep(args...)
Predefined call, same as `client.execute('setrep', args...)`.

## client.enumcargo(args...)
Predefined call, same as `client.execute('enumcargo', args...)`.

## client.addcargo(args...)
Predefined call, same as `client.execute('addcargo', args...)`.

## client.removecargo(args...)
Predefined call, same as `client.execute('removecargo', args...)`.

## client.rename(args...)
Predefined call, same as `client.execute('rename', args...)`.

## client.deletechar(args...)
Predefined call, same as `client.execute('deletechar', args...)`.

## client.readcharfile(args...)
Predefined call, same as `client.execute('readcharfile', args...)`.

## client.writecharfile(args...)
Predefined call, same as `client.execute('writecharfile', args...)`.

## client.setadmin(args...)
Predefined call, same as `client.execute('setadmin', args...)`.

## client.getadmin(args...)
Predefined call, same as `client.execute('getadmin', args...)`.

## client.deladmin(args...)
Predefined call, same as `client.execute('deladmin', args...)`.

## client.getreservedslot(args...)
Predefined call, same as `client.execute('getreservedslot', args...)`.

## client.setreservedslot(args...)
Predefined call, same as `client.execute('setreservedslot', args...)`.

## client.rehash(args...)
Predefined call, same as `client.execute('rehash', args...)`.

## client.loadplugins(args...)
Predefined call, same as `client.execute('loadplugins', args...)`.

## client.loadplugin(args...)
Predefined call, same as `client.execute('loadplugin', args...)`.

## client.listplugins(args...)
Predefined call, same as `client.execute('listplugins', args...)`.

## client.unloadplugin(args...)
Predefined call, same as `client.execute('unloadplugin', args...)`.

## client.pauseplugin(args...)
Predefined call, same as `client.execute('pauseplugin', args...)`.

## client.unpauseplugin(args...)
Predefined call, same as `client.execute('unpauseplugin', args...)`.

## client.getgroupmembers(args...)
Predefined call, same as `client.execute('getgroupmembers', args...)`.

## client.getbasestatus(args...)
Predefined call, same as `client.execute('getbasestatus', args...)`.

## client.getclientid(args...)
Predefined call, same as `client.execute('getclientid', args...)`.

## client.getplayerinfo(args...)
Predefined call, same as `client.execute('getplayerinfo', args...)`.

## client.xgetplayerinfo(args...)
Predefined call, same as `client.execute('xgetplayerinfo', args...)`.

## client.getplayers(args...)
Predefined call, same as `client.execute('getplayers', args...)`.

## client.xgetplayers(args...)
Predefined call, same as `client.execute('xgetplayers', args...)`.

## client.getplayerids(args...)
Predefined call, same as `client.execute('getplayerids', args...)`.

## client.getaccountdirname(args...)
Predefined call, same as `client.execute('getaccountdirname', args...)`.

## client.savechar(args...)
Predefined call, same as `client.execute('savechar', args...)`.

## client.isloggedin(args...)
Predefined call, same as `client.execute('isloggedin', args...)`.

## client.isonserver(args...)
Predefined call, same as `client.execute('isonserver', args...)`.

## client.serverinfo(args...)
Predefined call, same as `client.execute('serverinfo', args...)`.

## client.moneyfixlist(args...)
Predefined call, same as `client.execute('moneyfixlist', args...)`.

## client.help(args...)
Predefined call, same as `client.execute('help', args...)`.
