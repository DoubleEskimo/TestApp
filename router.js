function route(handle, method, pathname, response, data) {
	console.log("About to route a " + method + " request for " + pathname + ".");
	if(typeof handle[method][pathname] === 'function') {
		handle[method][pathname](response, data);
	}
	else {
		console.log("No " + method + " request handler found for " + pathname + ".");
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;
