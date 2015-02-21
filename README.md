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

	client.enableEventmode(function(err) {
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

## flhook.createClient()

### overloading
* flhook.createClient() = flhook.createClient(1919, 'localhost', {});
* flhook.createClient(options) = flhook.createClient(1919, 'localhost', options);
* flhook.createClient(port, host, options);

The current only supported call is `flhook.createClient(port, host, options)` unless the authentification method is added.
