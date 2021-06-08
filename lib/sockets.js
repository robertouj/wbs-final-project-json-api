/****************************************************************************
 * Signaling server
 ****************************************************************************/
function signalingServer(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("create or join", (roomId, name) => {
      const clientsInRoom = io.sockets.adapter.rooms.get(roomId)?.size;
      const numClients = clientsInRoom ? clientsInRoom : 0;

      if (numClients === 0) {
        socket.join(roomId);
        socket.emit("room created");
      } else if (numClients === 1) {
        io.sockets.in(roomId).emit("join");
        socket.join(roomId);
        socket.emit("joined");
        const users = Array.from(io.sockets.adapter.rooms.get(roomId));
        io.sockets.in(roomId).emit("ready", users);
      } else {
        socket.emit("full", roomId);
      }
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", ({ signal, to, name }) => {
      io.to(to).emit("callAccepted", signal, to, name);
    });

    /********************** chat **********************/
    socket.on("chat message", (msg) => {
      socket.broadcast.emit("chat message", msg);
    });

    //TODO: Possibly useful functions
    // // convenience function to log server messages on the client
    // function log() {
    //   const array = ["Message from server: "];
    //   array.push.apply(array, arguments);
    //   socket.emit("log", arguments);
    // }

    // socket.on("ipaddr", function () {
    //   var ifaces = os.networkInterfaces();
    //   for (var dev in ifaces) {
    //     ifaces[dev].forEach(function (details) {
    //       if (details.family === "IPv4" && details.address !== "127.0.0.1") {
    //         socket.emit("ipaddr", details.address);
    //       }
    //     });
    //   }
    // });
  });
}

module.exports = signalingServer;