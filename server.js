var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var data = "";
		var method = request.method;
		var pathname = url.parse(request.url).pathname;
		console.log(method + " request for " + pathname + " received.");
		request.setEncoding("utf8");
		request.addListener("data", function(dataChunk) {
			data += dataChunk;
			console.log("Received data chunk '" + dataChunk + "'.");

		});
		request.addListener("end", function() {
			route(handle, method, pathname, response, data);
		});
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
