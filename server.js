const net = require("net");
const sockets = [];

const server = net.createServer((socket) => {
  sockets.push(socket);
  console.log("Client connected!");

  socket.on("data", (data) => {
    broadcast(data, socket);
  });

  socket.on("error", (error) => {
    console.log("A client has disconnected!");
  });

  socket.on("close", () => {
    console.log("A client has left the chat!");
  });
});

function broadcast(msg, sent) {
  if (msg.toString() === "leave") {
    const index = sockets.indexOf(sent);
    sockets.splice(index, 1);
  } else {
    sockets.forEach((socket) => {
      socket.write(msg);
    });
  }
}

server.listen(1234, () => {
  console.info("Server started!");
});
