"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastTokenUsage = exports.initSocket = void 0;
var socket_io_1 = require("socket.io");
var io;
var initSocket = function (server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*', // In production, restrict to frontend URL
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', function (socket) {
        console.log("Socket client connected: ".concat(socket.id));
        socket.on('join_instance', function (instanceId) {
            socket.join("instance_".concat(instanceId));
            console.log("Socket ".concat(socket.id, " joined room instance_").concat(instanceId));
        });
        socket.on('disconnect', function () {
            console.log("Socket client disconnected: ".concat(socket.id));
        });
    });
    return io;
};
exports.initSocket = initSocket;
var broadcastTokenUsage = function (instanceId, usageData) {
    if (io) {
        io.to("instance_".concat(instanceId)).emit('token_usage_update', usageData);
    }
};
exports.broadcastTokenUsage = broadcastTokenUsage;
