var flhook = require('flhook');
var client = flhook.createClient();

client.on('ready', function() {
	console.log('ready');

	client.enableEventmode(function(err) {
		console.log('Entering eventmode');

		client.on('event', function(message) {
			// 'message' contains the event message
			console.log(message);
		});
	});
});
client.on('error', function(err) {
	console.error(err);
});
