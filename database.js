var redis = require("redis");
var client = redis.createClient();

/* Add value given by string parameter 'val' to database value given by key 'key'. */
function updateValueByKey(key, val) {
	client.get(key, function (error, result, callback) {
		if (error) {
			console.log(error);
			throw error;
		}
		var updatedIntValue = parseInt(result) + parseInt(val);
		if(!isNaN(updatedIntValue)) {
			client.set(key, updatedIntValue);
			console.log("Value of the " + key + " key updated.");
		}
		else
			console.log("Value of the " + key + " key NOT updated.");
		if (callback && typeof callback === 'function')
			callback();
	});
}

function getValueByKey(key, callback) {
	client.get(key, function (error, result) {
		if (error) {
			console.log(error);
			throw error;
		}
		callback(result);
	});
}

client.on('connect', function() {
    console.log("Redis client connected");
    client.set('count', '0');
});

client.on('error', function (err) {
    console.log("Something went wrong " + err);
});

exports.updateValueByKey = updateValueByKey;
exports.getValueByKey = getValueByKey;
exports.client = client;