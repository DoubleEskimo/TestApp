var querystring = require("querystring");
var fs = require("fs");
var database = require("./database");

function start(response, data) {
	console.log("Request handler 'start' was called.");
	body =	'<html>'+
			'<head>'+
				'<meta http-equiv="Content-Type" content="text/html" '+
					'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
				'<form action="/track" method="post" enctype="application/json">'+
					'Item:<br>' +
					'<input type="text" name="item"><br>'+
					'Count:<br>' +
					'<input type="text" name="count"><br>'+
					'<input type="submit" value="Send" />'+
				'</form>'+
			'</body>'+
			'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function track(response, data) {
	console.log("Request handler 'track' was called.");
	var dataObj = querystring.parse(data);
	var jsonData = JSON.stringify(dataObj);
	fs.appendFile('./tmp.txt', jsonData, function(error) {
		if(error) {
			console.log(error);
			throw error;
		}
	});
	if(typeof dataObj.count !== 'undefined')
		database.updateValueByKey('count', dataObj.count);
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(jsonData);
	response.end();
}

function count(response, data) {
	console.log("Request handler 'count' was called.");
	database.getValueByKey('count', function(result) {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Count = " + result);
		response.end();
	});
}

exports.start = start;
exports.track = track;
exports.count = count;