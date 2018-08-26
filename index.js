var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {POST:{}, GET:{}};
handle["POST"]["/track"] = requestHandlers.track;
handle["GET"]["/count"] = requestHandlers.count;
handle["GET"]["/"] = requestHandlers.start;

server.start(router.route, handle);
