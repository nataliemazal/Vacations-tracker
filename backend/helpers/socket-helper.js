const io = require("socket.io");



let socketsManager;

function send(msg) {
    socket.on("msg-from-client", (msg) => {
        console.log("vacations-changed: ", msg);
        socketsManager.sockets.emit("msg-from-server", msg);
    });
}

function start(listener) {
    // Connect once to socket.io library:
    socketsManager = io(listener, { cors: { origin: "*" } });

    // Listen to any client connection:
    socketsManager.sockets.on("connection", (socket) => {
        console.log("connection.");
        socket.on("disconnect", () => {
            console.log("One client disconnect.");
        });

        socket.on("msg-from-client", (msg) => {
            console.log("vacations-changed: ", msg);
            socketsManager.sockets.emit("msg-from-server", msg);
        });
    });
}

module.exports = {
    start, send

}