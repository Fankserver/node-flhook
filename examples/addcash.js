var flhook = require('flhook');
var client = flhook.createClient();

client.on('ready', function() {
	console.log('ready');

	client.addcash('Fank', 10, function(err, data) {
		if (err) {
			console.error(err);
		}
		else {
			console.log('Fank new cash: ', data[0]);
		}
	});
});
client.on('error', function(err) {
	console.error(err);
});
